/**
 * Congreso Barrial de Recoleta — lector institucional v1.
 * DESPLIEGUE OBLIGATORIO: ejecutar COMO USUARIO QUE ACCEDE + acceso SOLO DOMINIO.
 * Cada usuario debe disponer de permisos propios de lectura en la matriz.
 * No desplegar "execute as me", "anyone" ni "anonymous". No usar como API pública.
 */
const CB_SEC = Object.freeze({
  spreadsheetId: "1KecTjqU4Kx5tJLNPl4Z5D1sxlgC05PxWHh5xwuI0jpQ",
  domain: "recoleta.cl",
  dataSheet: "DATOS",
  taxonomySheet: "CAT_SUBTEMAS",
  maxRows: 100,
  maxTextLength: 180,
  types: ["Problema", "Oportunidad", "Actor", "Lugar importante"]
});
function safeString_(v, max) {
  const s = String(v == null ? "" : v).trim();
  return s.slice(0, max || CB_SEC.maxTextLength);
}
function ensureAccess_() {
  const email = String(Session.getActiveUser().getEmail() || "").trim().toLowerCase();
  if (!email || !email.endsWith("@" + CB_SEC.domain)) {
    throw new Error("Acceso no autorizado: se requiere identidad institucional verificable.");
  }
  // Al ejecutarse COMO USUARIO QUE ACCEDE, openById valida los permisos reales en Drive.
  let book;
  try { book = SpreadsheetApp.openById(CB_SEC.spreadsheetId); }
  catch (_err) { throw new Error("La cuenta no tiene acceso de lectura a la matriz institucional."); }
  if (!book.getSheetByName(CB_SEC.dataSheet) || !book.getSheetByName(CB_SEC.taxonomySheet)) {
    throw new Error("No están disponibles las hojas institucionales requeridas.");
  }
  return { email: email, book: book };
}
function readSheet_(sheet) {
  const values = sheet.getDataRange().getDisplayValues();
  const headers = (values.shift() || []).map(x => String(x).trim());
  if (new Set(headers).size !== headers.length || !headers.length) throw new Error("Encabezados duplicados o vacíos.");
  return values.map((r, idx) => ({ r, rowNumber: idx + 2 })).filter(x => String(x.r[0] || "").trim()).map(({ r, rowNumber }) => {
    const o = {};
    headers.forEach((h, i) => { o[h] = String(r[i] == null ? "" : r[i]).trim(); });
    o._sheet_row = rowNumber;
    return o;
  });
}
function readData_(ctx) {
  const rows = readSheet_(ctx.book.getSheetByName(CB_SEC.dataSheet));
  const seen = new Set();
  for (const r of rows) {
    if (!r.id_punto || seen.has(r.id_punto)) throw new Error("DATOS contiene ID vacío o duplicado: detener lectura.");
    seen.add(r.id_punto);
  }
  return rows;
}
function readTaxonomy_(ctx) {
  return readSheet_(ctx.book.getSheetByName(CB_SEC.taxonomySheet));
}
function roleOf_(tax, direction) {
  if (!direction) return "";
  if (tax.direccion_lider === direction) return "referencia";
  const supports = String(tax.apoyo_habitual || "").split(/\s*[·;,]\s*/).map(s => s.trim());
  return supports.includes(direction) ? "apoyo" : "";
}
function allowedFilter_(v) { return safeString_(v, 120); }
function parseQuery_(q) {
  q = q && typeof q === "object" ? q : {};
  const out = {
    uv: allowedFilter_(q.uv),
    grupo: allowedFilter_(q.grupo),
    tipo: allowedFilter_(q.tipo),
    tema: allowedFilter_(q.tema),
    subtema: allowedFilter_(q.subtema),
    direccion: allowedFilter_(q.direccion),
    rol: allowedFilter_(q.rol),
    texto: allowedFilter_(q.texto),
    offset: Math.max(0, Math.min(10000, parseInt(q.offset, 10) || 0)),
    limit: Math.max(1, Math.min(CB_SEC.maxRows, parseInt(q.limit, 10) || 30)),
    incluirMarcados: q.incluirMarcados === true
  };
  if (out.tipo && !CB_SEC.types.includes(out.tipo)) throw new Error("Tipo inválido.");
  if (out.rol && !["referencia", "apoyo", "ambos"].includes(out.rol)) throw new Error("Rol inválido.");
  return out;
}
function isFlagged_(r) {
  return /^(si|sí|yes|true|1)$/i.test(String(r.revisar_privacidad || "").trim());
}
function applyFilters_(rows, tax, q) {
  const classification = new Map(tax.map(t => [t.subtema, t]));
  return rows.filter(r => {
    if (q.uv && r.uv !== q.uv) return false;
    if (q.grupo && r.grupo !== q.grupo) return false;
    if (q.tipo && r.tipo !== q.tipo) return false;
    if (q.tema && r.tema_principal !== q.tema) return false;
    if (q.subtema && r.subtema !== q.subtema) return false;
    if (q.direccion) {
      const role = roleOf_(classification.get(r.subtema) || {}, q.direccion);
      if (!role || (q.rol && q.rol !== "ambos" && role !== q.rol)) return false;
    }
    if (isFlagged_(r) && !q.incluirMarcados) return false;
    if (q.texto) {
      // No buscar por descripciones de registros restringidos sin paso explícito de inclusión.
      const corpus = [r.id_punto, r.uv, r.grupo, r.tipo, r.tema_principal, r.subtema];
      if (!isFlagged_(r)) corpus.push(r.descripcion || "");
      if (!corpus.some(x => String(x).toLocaleLowerCase("es").includes(q.texto.toLocaleLowerCase("es")))) return false;
    }
    return true;
  });
}
function minimalRow_(r) {
  return {
    id: r.id_punto, uv: r.uv, grupo: r.grupo, tipo: r.tipo,
    tema: r.tema_principal, subtema: r.subtema,
    auditoria: r.aud_estado || "No indicado", privacidad: isFlagged_(r)
  };
}
function doGet() {
  // Fail closed antes de entregar una vista institucional.
  ensureAccess_();
  return HtmlService.createHtmlOutputFromFile("Index")
    .setTitle("Congreso Barrial · Consulta institucional");
}
function boot() {
  const ctx = ensureAccess_();
  const rows = readData_(ctx), tax = readTaxonomy_(ctx);
  const counts = {total: rows.length, tipos: {}, uvs: {}, grupos: {}};
  for (const r of rows) {
    counts.tipos[r.tipo] = (counts.tipos[r.tipo] || 0) + 1;
    counts.uvs[r.uv] = (counts.uvs[r.uv] || 0) + 1;
    const k = r.uv + "\u00a7" + r.grupo;
    counts.grupos[k] = (counts.grupos[k] || 0) + 1;
  }
  const dirSet = new Set();
  for (const t of tax) {
    // Solo direcciones líderes catalogadas; apoyos pueden ser organizaciones no municipales.
    if (t.direccion_lider) dirSet.add(t.direccion_lider);
  }
  return {
    identity: ctx.email, updated: new Date().toISOString(),
    source: "Matriz_Congreso_Barrial_fusionada / DATOS",
    totals: counts,
    taxonomy: tax.map(t => ({tema:t.tema_principal,subtema:t.subtema,lider:t.direccion_lider,apoyo:t.apoyo_habitual})),
    directions: [...dirSet].sort(),
    note: "Dato digitalizado. Cartografía y transcripción literal sujetas a cotejo; no asigna responsabilidades."
  };
}
function queryPoints(rawQuery) {
  const ctx = ensureAccess_();
  const q = parseQuery_(rawQuery);
  const rows = applyFilters_(readData_(ctx), readTaxonomy_(ctx), q);
  // Nunca retornar descripción en listados; lectura puntual con controles en getPoint.
  return {
    count: rows.length, offset: q.offset, limit: q.limit,
    results: rows.slice(q.offset, q.offset + q.limit).map(minimalRow_)
  };
}
function getPoint(rawId, options) {
  const ctx = ensureAccess_();
  const id = safeString_(rawId, 120);
  if (!id) throw new Error("Identificador requerido.");
  const rows = readData_(ctx);
  const r = rows.find(x => x.id_punto === id);
  if (!r) throw new Error("No existe el registro en DATOS.");
  const restricted = isFlagged_(r);
  const acknowledge = !!options && options.reviewPrivacy === true;
  if (restricted && !acknowledge) {
    return { ...minimalRow_(r), restricted: true, descripcion: null,
      message: "Texto marcado para revisión de privacidad. Requiere revisión expresa antes de mostrarlo." };
  }
  if (restricted) {
    // La bitácora de ejecución de Apps Script tiene acceso restringido a gestores del proyecto.
    // No registrar texto, dirección ni coordenadas.
    console.info(JSON.stringify({ action: "LECTURA_RESTRINGIDA", email: ctx.email,
      recordId: id, when: new Date().toISOString() }));
  }
  return {
    ...minimalRow_(r), restricted: restricted,
    descripcion: r.descripcion || "", origen: r.origen_dato || "",
    fechaAsamblea: r.fecha_asamblea || "", referenciaFoto: r.foto_ref || "",
    documento: "DATOS", filaFuente: r._sheet_row,
    cartografia: "PENDIENTE_COTEJO",
    fuenteUrl: "https://docs.google.com/spreadsheets/d/" + CB_SEC.spreadsheetId +
      "/edit#gid=1996552213&range=A" + r._sheet_row + ":AF" + r._sheet_row
  };
}

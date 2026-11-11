"use strict";
const $=id=>document.getElementById(id);
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const fmt=n=>Number(n||0).toLocaleString("es-CL");
const kit=new Set(["15","21","22","26A","26B","25","29","28","27","30","31","32","33","34","35"]);
const types=["Problema","Oportunidad","Actor","Lugar importante"];
const sheetBase="https://docs.google.com/spreadsheets/d/1KecTjqU4Kx5tJLNPl4Z5D1sxlgC05PxWHh5xwuI0jpQ/edit#gid=1996552213&range=";
const state={scope:"kit",uv:"15",grupo:"",tipo:"",tema:"",subtema:"",id:""};
const urlParams=new URLSearchParams(location.search);
let data=null,rows=[],visible=30,loaded=false,selectedId="";
function sortText(a,b){return String(a).localeCompare(String(b),"es",{numeric:true})}
function groupKey(uv,group){return String(uv||"").trim()+"\u00a7"+String(group||"").trim()}
function flagged(r){return/^(si|sí|true|1|yes)$/i.test(String(r.revisar_privacidad||"").trim())}
function parseCSV(text){
const t=String(text??"").replace(/^\uFEFF/,""),first=t.split(/\r?\n/,1)[0],delimiter=[",",";","\t"].sort((a,b)=>first.split(b).length-first.split(a).length)[0];
let inside=false,cell="",out=[],raw=[];for(let i=0;i<t.length;i++){const c=t[i];if(c==='"'){if(inside&&t[i+1]==='"'){cell+='"';i++}else inside=!inside}
else if(c===delimiter&&!inside){out.push(cell);cell=""}
else if((c==="\n"||c==="\r")&&!inside){if(c==="\r"&&t[i+1]==="\n")i++;out.push(cell);if(out.some(x=>String(x).trim()))raw.push(out);out=[];cell=""}
else cell+=c}
if(inside)throw Error("CSV con comillas sin cerrar");out.push(cell);if(out.some(x=>String(x).trim()))raw.push(out);
if(raw.length<2)throw Error("CSV sin registros");const headers=raw.shift().map(h=>h.trim());
if(new Set(headers).size!==headers.length)throw Error("Encabezados duplicados");
const required=["id_punto","uv","tipo","tema_principal","subtema","descripcion","grupo"];
const missing=required.filter(x=>!headers.includes(x));if(missing.length)throw Error("Faltan columnas: "+missing.join(", "));
const set=new Set();return raw.map((row,i)=>{const x=Object.fromEntries(headers.map((h,j)=>[h,String(row[j]??"").trim()]));x._row=i+2;
if(!x.id_punto)throw Error("Falta ID de punto en fila "+(i+2));
if(set.has(x.id_punto))throw Error("ID duplicado en CSV: "+x.id_punto);
set.add(x.id_punto);return x});
}
function currentUV(){return data?.uvs.find(x=>x.uv===state.uv)||null}
function currentGroups(){return currentUV()?.grupos||[]}
function filterOptions(id,values,blank,keep){const el=$(id);el.innerHTML='<option value="">'+esc(blank)+'</option>'+values.map(v=>'<option value="'+esc(v)+'">'+esc(v)+'</option>').join("");el.value=values.includes(keep)?keep:"";return el.value}
function syncControls(){
const uvs=data.uvs.filter(x=>state.scope==="all"||kit.has(x.uv)).sort((a,b)=>sortText(a.uv,b.uv));
if(!uvs.some(x=>x.uv===state.uv)){state.uv=uvs[0]?.uv||"";state.grupo="";state.id=""}
$("scope").value=state.scope;
$("uv").innerHTML=uvs.map(x=>'<option value="'+esc(x.uv)+'">UV '+esc(x.uv)+'</option>').join("");$("uv").value=state.uv;
$("kind").value=types.includes(state.tipo)?state.tipo:"";
const themes=[...new Set((currentUV()?.temas||[]).map(x=>x.etiqueta))].sort(sortText);
state.tema=filterOptions("theme",themes,"Todas las temáticas",state.tema);
if(state.grupo&&!currentGroups().some(g=>g.etiqueta===state.grupo))state.grupo="";
if(loaded){const subs=[...new Set(rows.filter(r=>r.uv===state.uv).filter(r=>!state.tema||r.tema_principal===state.tema).map(r=>r.subtema).filter(Boolean))].sort(sortText);
state.subtema=filterOptions("sub",subs,"Todos los subtemas",state.subtema)}
else{state.subtema=state.subtema||"";$("sub").innerHTML='<option value="">'+(state.subtema?"Filtro de subtema pendiente de cargar DATOS":"Todos los subtemas")+'</option>';if(state.subtema)$("sub").innerHTML+='<option value="'+esc(state.subtema)+'">'+esc(state.subtema)+'</option>';$("sub").value=state.subtema}
}
function buildQuery(){const p=new URLSearchParams();p.set("corte",state.scope==="kit"?"entrega01":"todo");p.set("uv",state.uv);
for(const key of ["grupo","tipo","tema","subtema","id"])if(state[key])p.set(key,state[key]);return p}
function updateLinks(){
const p=buildQuery();history.replaceState(null,"",location.pathname+"?"+p);
const parent=new URLSearchParams();parent.set("corte",state.scope==="kit"?"entrega01":"todo");parent.set("uv",state.uv);
$("returnUV").href="index.html?"+parent;
$("toEvidence").href="trazabilidad.html?"+p;
}
function renderStats(){
const u=currentUV();if(!u)return;
const cards=[["Registros de UV",u.total],["Problemas",u.tipo.Problema||0],["Oportunidades",u.tipo.Oportunidad||0],["Grupos en DATOS",u.grupos.length]];
$("stats").innerHTML=cards.map(([k,v])=>'<div class="stat"><strong>'+fmt(v)+'</strong><span>'+esc(k)+'</span></div>').join("");
$("themes").textContent="Temáticas de esta UV: "+u.temas.map(x=>x.etiqueta+" ("+fmt(x.n)+")").join(" · ")+". Actores y lugares siguen disponibles en la ficha general.";
$("status").textContent="UV "+state.uv+": "+fmt(u.total)+" registros distribuidos en "+u.grupos.length+" grupos. "+(state.grupo?"Grupo seleccionado: "+state.grupo+".":"Selecciona un grupo para revisar sus registros.");
}
function renderGroups(){
const groups=currentGroups(),max=Math.max(1,...groups.map(g=>g.n));
$("groups").innerHTML=groups.map(g=>'<button type="button" class="group" aria-pressed="'+(g.etiqueta===state.grupo)+'" data-group="'+esc(g.etiqueta)+'"><b>'+esc(g.etiqueta)+'</b><strong>'+fmt(g.n)+'</strong><span>registros en DATOS</span><div class="meter" style="width:100%"><div style="width:'+(g.n*100/max).toFixed(2)+'%"></div></div><span>'+ (g.etiqueta===state.grupo?"Seleccionado · pulsa para ver toda la UV":"Ver post-it del grupo")+'</span></button>').join("");
$("groups").querySelectorAll("[data-group]").forEach(b=>b.onclick=()=>setFilters({grupo:state.grupo===b.dataset.group?"":b.dataset.group,id:""}));
const note=state.uv==="15"?'**Precaución UV15:** DATOS registra G2 con 16 puntos; MAPAS_UV contiene G3 con 16 y una propuesta de asociación no confirmada. No se presume que sean el mismo grupo. Los grupos GRUPO 1 y GRUPO 3 aparecen con igual nombre en ambas fuentes, aunque falta cotejo del mapa original.':"El total de cada grupo corresponde a DATOS. El mapa físico y su correspondencia aún requieren cotejo de las fuentes originales.";
$("mapCaution").textContent=note.replace(/^\*\*|\*\*/g,"");
$("groupStatus").textContent=state.grupo?"Se eligió "+state.grupo+" de UV "+state.uv+"; "+fmt(groups.find(g=>g.etiqueta===state.grupo)?.n)+" registros en el agregado.":"Sin grupo elegido: al cargar DATOS puedes explorar la UV completa o pinchar cualquiera de sus grupos.";
}
function selectedRows(){
if(!loaded)return [];
return rows.filter(r=>{
if(r.uv!==state.uv)return false;if(state.grupo&&r.grupo!==state.grupo)return false;
if(state.tipo&&r.tipo!==state.tipo)return false;if(state.tema&&r.tema_principal!==state.tema)return false;
if(state.subtema&&r.subtema!==state.subtema)return false;if(flagged(r)&&!$("includeFlagged").checked)return false;
const query=$("search").value.trim().toLocaleLowerCase("es");
if(!query)return true;
const values=[r.id_punto,r.tipo,r.tema_principal,r.subtema,r.grupo];if(!flagged(r)||$("revealFlagged").checked)values.push(r.descripcion||"");
return values.some(v=>String(v).toLocaleLowerCase("es").includes(query))
});
}
function renderRows(){
if(!loaded){$("recordStatus").textContent="Carga un CSV autorizado para leer los post-it. Los grupos y totales ya se pueden explorar."; $("postits").innerHTML="";$("more").hidden=true;$("recordDetail").classList.add("hidden");return}
const filtered=selectedRows();
const nflags=rows.filter(r=>r.uv===state.uv&&flagged(r)).length;
const shown=filtered.slice(0,visible);
$("recordStatus").textContent="Mostrando "+fmt(shown.length)+" de "+fmt(filtered.length)+" registros disponibles en tu CSV con estos filtros. "+fmt(nflags)+" registros de esta UV están marcados para revisión de privacidad y no se muestran sin seleccionar la opción correspondiente. "+(state.grupo?"Grupo: "+state.grupo+".":"Todos los grupos.");
$("postits").innerHTML=shown.map(r=>'<article class="postit"><button data-id="'+esc(r.id_punto)+'" type="button" aria-label="Abrir ficha del registro '+esc(r.id_punto)+'">'+esc(r.id_punto)+'</button><span class="tag">'+esc(r.tipo)+'</span><span class="tag">'+esc(r.grupo)+'</span>'+(flagged(r)?'<span class="tag warn">Privacidad por revisar</span>':'')+(r.aud_estado==="REQUIERE RELECTURA"?'<span class="tag warn">Requiere relectura</span>':'')+'<p class="small muted">'+esc(r.subtema)+'</p></article>').join("")||'<p class="empty">Ningún registro disponible para estos filtros. Comprueba que DATOS corresponda a la misma versión que los agregados.</p>';
$("postits").querySelectorAll("[data-id]").forEach(b=>b.onclick=()=>{state.id=b.dataset.id;selectedId=b.dataset.id;updateLinks();renderDetail();});
$("more").hidden=visible>=filtered.length;
if(state.id&&filtered.some(r=>r.id_punto===state.id))renderDetail();else{$("recordDetail").classList.add("hidden");selectedId="";}
}
function renderDetail(){
const r=selectedRows().find(x=>x.id_punto===state.id);if(!r){$("recordDetail").classList.add("hidden");return}
const restricted=flagged(r)&&!$("revealFlagged").checked;
const mapNote=state.uv==="15"&&r.grupo==="G2"?"Advertencia UV15: no igualar G2 de DATOS y G3 de MAPAS_UV automáticamente.": "El vínculo con la cartografía original aún no ha sido cotejado por persona responsable.";
const keys=[["ID del punto",r.id_punto],["Unidad Vecinal","UV "+r.uv],["Grupo",r.grupo],["Tipo",r.tipo],["Temática",r.tema_principal],["Subtema",r.subtema],["Auditoría",r.aud_estado||"Por verificar"],["Privacidad",flagged(r)?"Marcada para revisión":"Sin marca; no implica difusión autorizada"],["Origen indicado",r.origen_dato||"Por verificar"]];
$("recordDetail").innerHTML='<h3>Ficha del registro '+esc(r.id_punto)+'</h3><p class="small muted">Fuente primaria digitalizada · matriz DATOS. No se acredita literalidad de post-it ni su ubicación física por mostrar este texto.</p><dl>'+keys.map(([k,v])=>'<div><dt>'+esc(k)+'</dt><dd>'+esc(v)+'</dd></div>').join("")+'</dl><strong>Descripción registrada en DATOS</strong><blockquote>'+ (restricted?"Texto restringido: el registro está marcado para revisar privacidad. El contenido solo se muestra si se habilita su revelación con autorización específica.":esc(r.descripcion||"Sin descripción"))+'</blockquote><p class="small muted">'+esc(mapNote)+'</p><div class="actions"><a href="'+sheetBase+"A"+r._row+":AF"+r._row+'" target="_blank" rel="noopener noreferrer">Abrir fila de DATOS con permisos</a><a href="trazabilidad.html?'+buildQuery()+'">Abrir visor detallado con estos filtros</a></div><p class="small muted">El número de fila se obtuvo del CSV importado y puede variar por edición/ordenamiento; confirma siempre el ID estable.</p>';
$("recordDetail").classList.remove("hidden");
}
function render(){
if(!data)return;
syncControls();renderStats();renderGroups();renderRows();updateLinks();
}
function setFilters(patch){
Object.assign(state,patch);visible=30;if(patch.uv!==undefined||patch.scope!==undefined){state.grupo=patch.grupo||"";state.id="";state.subtema=patch.subtema??"";}
render();
}
function closeLocal(){
rows=[];loaded=false;state.id="";selectedId="";visible=30;
$("datosFile").value="";$("authorized").checked=false;$("datosFile").disabled=true;$("close").disabled=true;
$("includeFlagged").checked=false;$("revealFlagged").checked=false;$("search").value="";
$("loaded").textContent="Archivo local descartado de esta sesión. No queda visible ningún texto de DATOS.";
$("recordDetail").innerHTML="";render();
}
for(const id of ["scope","uv","kind","theme","sub"])$(id).addEventListener("change",()=>{const p={};p[id==="kind"?"tipo":id==="theme"?"tema":id==="sub"?"subtema":id]=$(id).value;if(id==="uv"||id==="scope"){p.grupo="";p.id="";p.subtema=""}if(id==="theme")p.subtema="";setFilters(p)});
$("reset").onclick=()=>{state.grupo="";state.tipo="";state.tema="";state.subtema="";state.id="";$("search").value="";render()};
$("authorized").onchange=()=>{if(!$("authorized").checked){closeLocal();return}$("datosFile").disabled=false;$("loaded").textContent="Autorización confirmada: selecciona el CSV de DATOS. Todavía no hay datos de post-it cargados."};
$("close").onclick=closeLocal;
$("datosFile").addEventListener("change",async e=>{
const file=e.target.files?.[0];if(!file||!$("authorized").checked)return;
try{if(file.size>15*1024*1024)throw Error("El CSV supera 15 MB; verifica la exportación");
const parsed=parseCSV(await file.text());rows=parsed;loaded=true;$("close").disabled=false;visible=30;
const u=currentUV(),expected=u?.total||0,seen=parsed.filter(r=>r.uv===state.uv).length;
$("loaded").textContent=fmt(parsed.length)+" registros con ID único cargados localmente. UV "+state.uv+": "+fmt(seen)+" en CSV, "+fmt(expected)+" en agregado "+(seen===expected?"(conteos reconciliados).":"(diferencia: revisar versión/filtro de exportación).");
render();
}catch(err){closeLocal();$("loaded").textContent="No se pudo cargar DATOS: "+err.message}
});
$("includeFlagged").onchange=()=>{if(!$("includeFlagged").checked)$("revealFlagged").checked=false;visible=30;renderRows()};
$("revealFlagged").onchange=()=>{if($("revealFlagged").checked&&!$("includeFlagged").checked){$("revealFlagged").checked=false;return}renderRows()};
$("search").addEventListener("input",()=>{visible=30;renderRows()});
$("more").onclick=()=>{visible+=30;renderRows()};
fetch("datos-agregados.json",{cache:"no-store"}).then(r=>{if(!r.ok)throw Error("Agregados HTTP "+r.status);return r.json()}).then(v=>{
if(v.uvs?.length!==25||v.totales?.filas_matriz!==1570)throw Error("Fuente agregada incompatible");
let sum=0;for(const u of v.uvs){const groups=u.grupos.reduce((a,g)=>a+g.n,0);if(groups!==u.total)throw Error("Conteo de grupos incongruente en UV "+u.uv);sum+=u.total}if(sum!==1570)throw Error("Conteo comunal incongruente");
data=v;state.scope=urlParams.get("corte")==="todo"?"all":"kit";
state.uv=urlParams.get("uv")||"15";state.grupo=urlParams.get("grupo")||"";state.tipo=urlParams.get("tipo")||"";state.tema=urlParams.get("tema")||"";
state.subtema=urlParams.get("subtema")||"";state.id=urlParams.get("id")||"";render();
}).catch(e=>{$("status").textContent="No se pudo leer el panorama UV: "+e.message});

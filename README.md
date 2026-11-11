# Congreso Barrial Recoleta — portal territorial público

**Sitio web:** https://germaquintana.github.io/congresobarrial_publico/

## Fuente principal y corte
Desde el 9 de noviembre de 2026, el origen principal de los registros de resultados es la hoja **DATOS** de la matriz `Matriz_Congreso_Barrial_fusionada` (spreadsheet ID `1KecTjqU4Kx5tJLNPl4Z5D1sxlgC05PxWHh5xwuI0jpQ`). Rango leído: `DATOS!A1:AF1571`.

- 1.570 registros con ID y sin duplicados observados.
- 788 problemas, 299 oportunidades, 278 lugares importantes y 205 actores.
- 25 etiquetas UV en la matriz, pero el inventario de fuentes tiene 24 carpetas UV. **UV20 tiene tres registros por conciliar**.
- Auditoría fuente: 1.215 CONSISTENTE, 45 REQUIERE RELECTURA y 310 Sin auditar.
- 78 registros marcados para revisión de privacidad; los 1.492 restantes no implican permiso de difusión.

Los CSV históricos con 872 filas **no son el origen numérico principal** y no se suman a la matriz.

## Dashboard

- `index.html` — dashboard general y fichas por UV; admite enlaces `?uv=25`.
- `datos-agregados.json` — totales por tipo, tema, UV y subtema derivados de DATOS.
- `resultados-territoriales.json` — diez dimensiones B01–B10 por UV y categorías de la hoja madre; material cualitativo complementario del proyecto permanece identificado como preliminar.


## Panel DIMAO — vista sectorial y piloto territorial (11-11-2026)

- [Panel DIMAO](dimao.html): botón destacado desde la portada y acceso desde las páginas de carteras, temáticas y cruces. Diferencia asuntos en que DIMAO figura como dirección líder referencial y como apoyo habitual, sin atribuir competencias automáticamente.
- [Lógica del panel](dimao.js): cinco subtemas de CAT_SUBTEMAS (dos de referencia y tres de apoyo), filtros por corte/rol/tipo/UV/subtema, barras apiladas, mapa de calor UV×subtema, tarjetas de gestión y matriz exportable.
- [Protocolo del panel](docs/PROTOCOLO_PANEL_DIMAO_V1.md): interpretación, roles, privacidad, conteos de control y etapas de cotejo humano.
- [Piloto UV15](dimao.html?corte=entrega01&rol=lead&uv=15): 3 problemas + 3 oportunidades de aseo/residuos y 4 oportunidades de áreas verdes/arbolado. Desde el panel se llega al visor local de registros (requiere CSV autorizado), pero todavía no se acredita post-it ni cartografía original.
- La clasificación DIMAO abarca, en las 15 UV de Entrega 01, **176 problemas y 100 oportunidades** (101/39 con rol líder referencial; 75/61 como apoyo); en matriz completa, **307 problemas y 172 oportunidades**.
- Esta página es una **exploración agregada pública**, no un catálogo de denuncias verificadas ni un sistema oficial de órdenes de trabajo.

## Carteras de problemas y oportunidades y guías de lectura (11-11-2026)

- [Inicio del dashboard](index.html): cuatro accesos visibles a temáticas, cruces multidimensionales, carteras por dirección y visor de evidencia.
- [Carteras por dirección](carteras.html) y su lógica [carteras.js](carteras.js): filtros por corte, dirección referencial, temática, UV, subtema y enfoque de lectura; KPIs de problemas/oportunidades separados de actores/lugares; comparativas por dirección/temática/UV; tarjetas por subtema e instrumento referencial; matriz UV×subtema para evaluación con exportación CSV.
- [Protocolo de carteras](docs/PROTOCOLO_CARTERAS_ACCION_V1.md): definiciones de indicadores, denominadores, restricciones de privacidad, CSV y fases necesarias de aprobación humana.
- Ayudas integradas con elementos desplegables de explicación en secciones del dashboard general, resultados por temática, explorador multidimensional, carteras y visor de evidencia.
- Se conserva la trazabilidad de parámetros entre pantallas y la separación entre agregados públicos y consultas locales de microdatos autorizados.
- **Ninguna clasificación de dirección y ninguno de los campos del CSV equivalen a tarea asignada, acción aprobada o mandato administrativo.** Los campos de decisión humana siguen vacíos.

## Explorador multidimensional — cruces temáticos y de gestión (11-11-2026)

- [Explorador multidimensional](cruces.html): matrices de calor \`temática × dimensión\` y \`UV × temática\`, diagrama de flujos, perfil de 15 subtemas, orientación institucional indicativa por dirección y tabla de cruces con filtros conectados.
- [Resultados por temática](tematicas.html): se incorporó una matriz visible de 7 × 4 que vincula directamente con el nuevo explorador; [dashboard general](index.html) ofrece acceso directo.
- [Taxonomía verificada](taxonomia-subtemas.json): 15 pares \`temática/subtema\` provenientes de CAT_SUBTEMAS, con 7 áreas de referencia y apoyo/instrumento orientativo. **No asigna trabajo ni aprueba competencias**.
- [Metodología de cruces](docs/METODOLOGIA_CRUCES_MULTIDIMENSIONALES_V1.md): equivalencia válida B03/B05/B06/B07 con el campo \`tipo\`, fórmulas y denominadores de porcentajes, cautelas de privacidad e interpretación.
- [Explorador local de registros](trazabilidad.html) acepta filtros URL \`tema\`, \`uv\`, \`tipo\`, \`subtema\` y \`corte\` al cargar un CSV autorizado. No añade microdatos al sitio público.
- Validaciones: correspondencia completa de los 15 subtemas, cruces reconciliados con 1.570 registros (25 etiquetas UV) y 872 registros en Entrega 01 (15 UV); las categorías tienen carácter preliminar.

## Exploración temática — interfaz 11-11-2026

- [Dashboard general](index.html): gráfico de torta de las siete temáticas y comparación UV mediante barras apiladas por temas.
- [Detalle por temática](tematicas.html): navegación entre los siete temas, comparación UV y desglose por tipo (Problema, Oportunidad, Lugar importante, Actor), preservando los filtros Entrega 01 / matriz completa.
- La página `tematicas.html` reutiliza `datos-agregados.json`; no agrega microdatos, nombres, testimonios ni distribuciones inferidas de subtemas. Las categorías y cifras siguen siendo preliminares. Para filtrar directamente una categoría, usar `tematicas.html?corte=entrega01&tema=Infraestructura%20y%20espacio%20p%C3%BAblico`.

## Observatorio de trazabilidad — piloto de lectura local

- [Explorador y mapa de evidencia territorial](trazabilidad.html): lectura local de CSV autorizados, filtros por tema/UV/tipo/grupo/subtema/ubicación escrita, mapa interactivo de coordenadas de DATOS, mapa de calles OpenStreetMap solo por consentimiento, ficha individual y exportación de plan de acción.
- [Arquitectura y gobierno del dato](docs/ARQUITECTURA_TRAZABILIDAD_V1.md): separación de superficie pública y aplicación institucional, trazabilidad, privacidad, roles y fases siguientes.
- **Importante:** el código es público, pero los textos individuales no están alojados aquí. Requiere cargar archivos CSV autorizados desde el dispositivo del usuario; no utiliza `fetch`, almacenamiento web ni APIs externas para acceder a microdatos. Un checkbox no es autenticación corporativa.
- Las relaciones UV-grupo/cartografía de MAPAS_UV **no están acreditadas como vínculos definitivos**, ni las descripciones de DATOS como texto literal verificado del post-it. No usar la exportación como decisión de competencia o plan oficialmente aprobado.

- [Protocolo de cartografía y localización](docs/PROTOCOLO_CARTOGRAFIA_LOCAL_V1.md): manejo de esquinas, calles y direcciones, diferenciando reporte, coordenada referencial y localización validada; controles de privacidad y límites del mapa de calles.

## Limitaciones
Los registros son aportes documentales, no personas, votos, mediciones representativas ni acuerdos aprobados. Se excluyeron descripciones individuales de filas, RUT, firmas, fotografías, teléfonos, correos, ubicaciones precisas y coordenadas. La revisión institucional de contenido y privacidad sigue pendiente. La etiqueta CONSISTENTE pertenece al proceso de auditoría de la hoja, **no certifica que un resultado sea publicable ni exacto en terreno**.

La hoja original es de solo lectura para la sincronización. No se activa la publicación automática de las filas sin revisión.

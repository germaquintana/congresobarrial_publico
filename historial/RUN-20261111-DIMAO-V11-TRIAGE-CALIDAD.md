# RUN — Panel DIMAO V1.1 · validación preliminar, patrones territoriales y control de calidad

**Fecha y hora Chile:** 2026-11-11 17:49:15 (America/Santiago).  
**Repositorio de producto:** `germaquintana/congresobarrial_publico`, rama `main`.  
**Alcance de la ejecución:** solo archivos del portal público. Sin cambios a repositorio privado, Drive fuente, Trello ni actuaciones municipales.

## Antecedente de decisión
El usuario ratificó **preliminarmente** que el alcance de competencias DIMAO adoptado por la visualización está bien entendido. Se conserva la distinción entre los dos subtemas donde DIMAO aparece como dirección líder *referencial* y los tres donde figura como apoyo habitual. Esta confirmación no autoriza derivaciones, presupuestos, órdenes, aprobaciones, difusión de microdatos o cambios institucionales de estado.

## Fuentes verificadas
- `datos-agregados.json` / DATOS matriz madre, corte del 09-11-2026, 1.570 filas; primer corte 15 UV y 872 registros.
- `taxonomia-subtemas.json` / CAT_SUBTEMAS A:F, cinco subtemas DIMAO.
- Lectura agregada de DATOS columnas C:F y Q:S, 1.570 filas, para estados de `aud_estado` de tipos Problema y Oportunidad vinculados con DIMAO; se omitieron ID/textos/ubicaciones.
- `MAPAS_UV` en lectura previa para el piloto UV15, sin confirmaciones humanas de correspondencia.
- Código vigente `dimao.html`, `dimao.js`, `index.html` y documentación del panel.

## Cambios
1. `dimao.html`: declaración visible de confirmación preliminar del criterio de competencias, selección por perfil de grupo UV-subtema, módulo de auditoría con cautelas, dispersión problemas-vs-oportunidades por UV, tres perfiles de coexistencia, e instrucción para descargar ficha individual de evaluación.
2. `dimao.js`: lógica de filtros y URL compartible, QA por corte/rol, diagrama SVG navegable por teclado/clic, conteos de intersecciones, exportación de una fila UV-subtema con estado no asignado y 29 campos CSV.
3. `dimao-calidad-agregada.json`: solo agregados de estados de auditoría por corte y rol DIMAO; ninguno de los ID, direcciones, textos o coordenadas originales.
4. `docs/PILOTO_UV15_DIMAO_CONTROL_V1.md`: guía humana de cotejo de 10 registros, 5 relecturas, 7 asociaciones cartográficas candidatas, 3 sin asociación propuesta y 0 confirmaciones humanas de cartografía.
5. `docs/PROTOCOLO_PANEL_DIMAO_V1.md` y `README.md`: criterios, explicación de porcentajes/denominadores, perfiles, cautelas y continuidad.

## Pruebas de aceptación
- DIMAO Entrega 01 (15 UV): 176 problemas y 100 oportunidades. Aud_estado para esas 276 menciones: 182 CONSISTENTE, 7 REQUIERE RELECTURA, 87 SIN AUDITAR.
- Por rol dentro de Entrega 01: dirección líder 140 registros P+O (92 consistentes, 5 relectura, 43 sin auditar); apoyo 136 registros P+O (90 consistentes, 2 relectura, 44 sin auditar). La suma por roles coincide con ambos roles.
- Matriz completa de 25 etiquetas UV: 307 problemas y 172 oportunidades; 479 total P+O, con 380 consistentes, 12 relectura y 87 sin auditar.
- Intersecciones de Entrega 01: 34 UV-subtema con problemas y oportunidades, 24 solo con problemas registrados y 9 solo con oportunidades (67 cruces). Estos perfiles son copresencia clasificatoria, no causalidad ni existencia de una respuesta institucional.
- Piloto UV15 líder DIMAO: 3 problemas y 7 oportunidades, dos subtemas. Calidad agregada de UV15: 5 CONSISTENTE y 5 REQUIERE RELECTURA. La sección QA por corte/rol advierte que no se puede extrapolar a un filtro UV o subtema individual.
- Prueba de motor JavaScript: sintaxis OK. Simulación DOM de renderización con fuente real agregada: 15 círculos UV por defecto, tres tarjetas de perfiles, 40 botones de ficha iniciales y cuatro indicadores de QA; filtros por perfil y rol contrastados con totales.
- Exportación CSV de una ficha UV15: 29 encabezados y 29 valores verificados; nombre automático sin caracteres peligrosos, y campos de decisión humana vacíos. No se almacenó información sensible.
- Archivos creados/modificados fueron leídos nuevamente desde GitHub y comparados con el texto escrito.

## Publicación y bloqueo
Los cambios están confirmados en GitHub `main`. Se observaron diversas ejecuciones de GitHub Pages con conclusión `startup_failure` y otras en cola; esto **no** permite certificar la publicación externa de la última versión. No se modificó configuración de Pages ni se asumió que el sitio visible contenga el código actualizado. La revisión visual real queda pendiente.

## Próximo paso y decisiones humanas
1. Revisar cinco registros UV15 que requieren relectura, en el entorno autorizado; cotejar post-it, cartografía y privacidad de todos los diez, resolviendo las tres asociaciones cartográficas faltantes sin inventarlas.
2. Validar formalmente competencia, apoyos y posibilidades de respuesta para cada propuesta según la normativa municipal y responsables institucionales.
3. Preparar fichas UV-subtema desde el panel, incorporar análisis técnico y priorización fundamentada únicamente tras revisión humana.
4. Verificar recuperación del despliegue de GitHub Pages y experiencia real desde navegador. Si las fallas persisten, revisar Actions/Pages manualmente con permisos administrativos; no confundir guardado en `main` con sitio actualizado.

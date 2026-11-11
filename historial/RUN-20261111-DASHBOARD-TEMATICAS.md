# RUN — mejoras dashboard público Congreso Barrial

- Fecha y hora Chile: 2026-11-11 12:33:04 (America/Santiago).
- Repositorio destino: `germaquintana/congresobarrial_publico`, rama `main`.
- Origen numérico: `datos-agregados.json`, blob `9ed3ca11073372cbfdbad5c0f2ad0f1130ea8cde` (corte 2026-11-09), derivado de DATOS de matriz fusionada.
- Fuente y límites: AGENTS.md del repositorio privado `germaquintana/congresobarrial`, política de privacidad; no se alteran ni fuentes ni sus indicadores.
- Cambios: torta por temática (7 grupos) con porcentajes y leyenda; barras UV apiladas por las 7 temáticas; nueva página `tematicas.html` con navegación de 7 temas y desgloses UV × tipo; README actualizado.
- Comprobaciones estáticas previas: {"validDataset":true,"indexPie":true,"indexStacks":true,"thematicFull":true,"noExternalScripts":true,"stableOldFilters":true,"noUserDetailRecords":true,"uniqueTargets":true}.
- Reconciliación aritmética: 25 etiquetas UV, 1.570 registros; suma 7 temáticas = 1.570; suma 25 UV = 1.570; totales por tipo/UV verificados. No se mezclaron 872 filas de CSV históricos.
- Seguridad: solo reutilización de cifras ya presentes en agregados públicos; sin textos individuales, listas ni fuentes privadas; los subtemas por temática se omiten por carecer de matriz cruzada verificable.
- Validación pendiente: prueba manual responsive y comprobación de despliegue GitHub Pages/HTTPS tras propagación. La lectura de GitHub es la validación de escritura.
- Estado: cambio de interfaz implementado; revisión editorial/institucional de resultados continúa pendiente.
- Próxima acción: revisión humana en navegador de torta, barras, siete temas y enlaces por UV.

## Comprobaciones posteriores a las escrituras

- Se recuperaron nuevamente desde `main` los dos HTML y su fuente agregada; los scripts embebidos de `index.html` y `tematicas.html` superaron compilación sintáctica con el motor JavaScript (`new Function`), sin ejecutarse en un navegador.
- Cotejo independiente del filtro Entrega 01: 15 UV y 872 registros, con totales temáticos 284 + 165 + 170 + 123 + 56 + 51 + 23 = 872.
- Cotejo de matriz completa: 25 etiquetas UV y 1.570 registros.
- No se pudo comprobar el despliegue HTTPS mediante el lector web externo, que devolvió error de acceso; publicación visual y funcionamiento en navegador quedan `POR_VERIFICAR`.

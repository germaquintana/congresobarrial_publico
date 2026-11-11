# RUN — Explorador multidimensional Congreso Barrial

**Fecha/hora:** 2026-11-11 13:50:25 (America/Santiago).  
**Repositorio:** germaquintana/congresobarrial_publico, rama main.  
**Alcance:** solo archivos estáticos y documentación del portal público; ninguna modificación de DATOS, de Drive, del repositorio privado, cartografías ni RUN automáticos.

## Solicitud
Sustituir la navegación meramente temática por análisis exploratorio de grupos y relaciones entre dimensiones, temáticas, subtemas, UV y rutas de derivación para preparación de planes de acción.

## Fuentes
- Matriz_Congreso_Barrial_fusionada, pestaña CAT_SUBTEMAS, columnas A:F, 15 pares tema/subtema con responsable y apoyos orientativos.
- Matriz DATOS como origen canónico de datos consolidados, corte 2026-11-09; en el portal se usa exclusivamente su versión agregada datos-agregados.json.
- Repositorio especializado público ya existente: index.html, tematicas.html, trazabilidad.html, datos-agregados.json.
- Metadatos y políticas del repo privado leídos en trabajo previo; no se escribió en él y no se interfirió con su run_lock de otra gestión.

## Cambios verificados
1. Nuevo cruces.html: filtros combinables universo (15/25), temática (7), tipo/dimensión (4), UV, subtema (15) y escala conteo/porcentaje.
2. Gráficos: matriz de calor 7×4, matriz de calor UV×tema, flujos ponderados tema→tipo, jerarquía/ranking de subtemas y distribución referencial por dirección.
3. Tabla de intersecciones UV×tema×tipo, vinculada a trazabilidad.html con parámetros de filtro para consulta mediante CSV local autorizado.
4. tematicas.html presenta ahora una matriz visible 7×4, la vincula con cruces.html y actualiza la metodología. index.html ofrece nuevo acceso; trazabilidad.html acepta UV, tipo, subtema y corte vía URL.
5. taxonomia-subtemas.json: 15 correspondencias verificadas de CAT_SUBTEMAS, 7 direcciones referenciales, modalidades/apoyos/instrumentos orientativos; no actos administrativos.
6. docs/METODOLOGIA_CRUCES_MULTIDIMENSIONALES_V1.md y README actualizados.

## Validación técnica
- Total 25 etiquetas UV: 1.570 registros; subconjunto 15 UV: 872.
- 7 temáticas, 15 subtemas, 4 tipos; 0 diferencias entre suma de subtemas por tema/tipo/UV y agregados de tema; 0 cruces de temática incompatibles; algunos tipos faltantes se tratan como ausencia sin registros, no como error.
- JavaScript compilado sintácticamente en cruces.html, tematicas.html, index.html, trazabilidad.html.
- Prueba de renderizado de cruces con DOM simulado: 28 celdas en matriz de dimensiones; 105 celdas UV×temática para Entrega 01; 175 para matriz completa; 26 flujos no nulos; 15 barras de subtemas; 7 direcciones de referencia; tabla con 45 filas visibles; filtro UV15/Aseo/Problema devuelve 3 registros y 1 intersección. Reconcilia 872/1.570.
- Vista previa incrustada en tematicas.html: 28 enlaces de celdas en 7 filas con destino a cruces.html y corte.
- Datos individuales, post-it originales, direcciones y coordenadas no están presentes en los archivos nuevos; no se añadió descarga de microdatos a la página pública. La lectura privada requiere CSV cargado por usuario autorizado.
- Despliegue por GitHub Pages sujeto a verificación del último RUN de Actions tras escrituras; navegador visual real no inspeccionado.

## Salvaguardas
- B03=Problemas, B05=Oportunidades, B06=Actores, B07=Lugares son las dimensiones cuantificables por tipo. B01/B02/B04/B08–B10 describen otras estructuras, no conteos sumables.
- Dirección líder y apoyo de CAT_SUBTEMAS representan solo rutas orientativas; no asignar o aprobar competencia ni plan.
- La presencia en una UV no acredita causalidad ni representatividad, y la prioridad de una acción requiere evaluación humana.
- Privacidad y microdatos restringidos: publicar solo los agregados disponibles previamente, con supresión parcial de celdas pequeñas del ranking por subtema/UV; se requiere revisión institucional antes de otra desagregación.

## Resultado, pendiente y reanudación
**Resultado:** código y taxonomía incorporados en main y verificados por lectura.  
**Pendiente:** revisar uso real en navegador y accesibilidad móvil, validar competencias con direcciones y cotejar contenidos originales/marcas de privacidad antes de migrar a app autenticada.  
**Reanudación:** empezar por docs/METODOLOGIA_CRUCES_MULTIDIMENSIONALES_V1.md, inspeccionar sha de main y último despliegue Pages, probar flujos con un usuario de cada dirección, luego priorizar análisis institucional de acciones.

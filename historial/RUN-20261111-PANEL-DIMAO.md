# RUN — Panel sectorial DIMAO y piloto UV15

**Fecha/hora Chile:** 2026-11-11 17:22:40 (America/Santiago).  
**Repositorio especializado:** germaquintana/congresobarrial_publico, rama main.  
**Resultado:** vista filtrada, accesos y protocolo implementados; pruebas locales contra agregados verificadas.

## Objetivo
Agregar al dashboard público del Congreso Barrial un botón destacado para filtrar temas vinculados con DIMAO, sin atribuir responsabilidad sobre materias que solo la mencionan como apoyo. Iniciar un piloto de trazabilidad por UV15 desde el nuevo panel.

## Fuentes revisadas
- Datos de conteo: datos-agregados.json, derivado de DATOS de Matriz_Congreso_Barrial_fusionada (corte 2026-11-09), 25 etiquetas UV y 1.570 registros, 15 UV y 872 registros de Entrega 01.
- Catálogo CAT_SUBTEMAS A:F publicado en taxonomia-subtemas.json, con 15 subtemas y dirección líder/apoyo/instrumentos referenciales.
- Código previo de index.html, carteras.html/carteras.js, tematicas.html, cruces.html, trazabilidad.html y README.
- No se modificó el repositorio canónico privado congresobarrial, Drive, la matriz fuente, RUN/locks ajenos o las automatizaciones.

## Cambios guardados
1. Nuevo dimao.html, con ayudas de interpretación, cinco filtros, KPIs, barras apiladas por rol/subtema/UV, matriz de calor UV×subtema, tarjetas de gestión, matriz exportable y piloto UV15.
2. Nuevo dimao.js que trabaja solo con agregados públicos y taxonomía; distingue coincidencia exacta de DIMAO en líder de la taxonomía versus apoyo habitual, sin duplicaciones.
3. Botón destacado «Abrir Panel DIMAO» en la portada index.html, con corte de 15 UV o matriz completa sincronizado.
4. Enlaces contextuales al Panel DIMAO desde carteras.html, tematicas.html y cruces.html; enlaces inversos hacia análisis y vista de evidencias.
5. Protocolo docs/PROTOCOLO_PANEL_DIMAO_V1.md y README actualizados. Se conservan los datos individuales fuera del sitio público.

## Control de exactitud
La taxonomía incluye exactamente cinco subtemas DIMAO:
- Referencia: Aseo, residuos y salubridad; Áreas verdes y arbolado.
- Apoyo: Bienestar animal (Higiene Ambiental), Iluminación (SECPLA), Espacio público y equipamiento (SECPLA).
- Entrega 01, roles unidos: 176 problemas y 100 oportunidades, más 28 actores y 94 lugares.
- Entrega 01, DIMAO líder referencial: 101 problemas y 39 oportunidades.
- Entrega 01, apoyo habitual: 75 problemas y 61 oportunidades.
- Matriz completa, roles unidos: 307 problemas y 172 oportunidades.
- El piloto UV15 con liderazgo referencial: 3 problemas y 7 oportunidades de dos subtemas; 3 problemas + 3 oportunidades corresponden a aseo/residuos y 4 oportunidades a áreas verdes/arbolado.

## Revisión documental de lectura — piloto UV15 (11-11-2026)
Se leyeron las hojas DATOS y MAPAS_UV, sin modificarlas. Se filtraron la UV15 y los dos subtemas de dirección referencial DIMAO, tipos Problema u Oportunidad: 10 registros, 10 ID únicos, tres grupos; 5 registros con aud_estado CONSISTENTE y 5 REQUIERE RELECTURA (estado_dato COMPLETO en los diez); 10 con ubicación escrita, ninguno con foto_ref; 7/10 tienen grupo con correspondencia propuesta UV+grupo en MAPAS_UV, 3/10 sin tal cruce; 0 filas MAPAS_UV de UV15 con confirmado_por_y_fecha. Este control no acredita el lugar exacto ni la procedencia de cada cartografía, y no autoriza publicar el texto de post-it.

## Pruebas verificadas
- Script nuevo y scripts embebidos de portada, temáticas, cruces y trazabilidad compilan sintácticamente en motor JavaScript.
- Reconciliación de clasificación entre 15 subtemas × cuatro tipos × 25 UV contra totales de datos-agregados.json sin diferencias.
- Renderizado simulado: dos roles, cinco tarjetas, mapa de calor, filtros de universo/rol/UV y resumen del piloto con valores de control.
- Enlaces al panel desde portada, temáticas, cruces y carteras comprobados en código; el piloto compone URL hacia visor con corte, UV, temática y subtema.
- Exportación de 27 encabezados y 27 campos verificada; deja sin completar decisiones de competencia, responsable, medidas, plazos, recursos, autorizaciones y evidencias.
- La tabla UV×subtema y el CSV aplican supresión de valores positivos pequeños (1 o 2) como mitigación parcial.
- Verificación de lectura de archivos tras escritura GitHub realizada; faltan prueba visual en navegador real y cotejo humano de post-it/cartografía.

## Seguridad y gobernanza
La relación de DIMAO es metodológica y no equivale a competencia ratificada ni tarea asignada. Los puntos particulares solo se consultan en visor local con CSV autorizado, nunca se publican direcciones, textos de post-it, nombres o coordenadas sensibles en el nuevo panel. No se generaron correos, actos administrativos, tarjetas Trello ni compromisos.

## Pendientes, intervención humana y reanudación
- **Cotejo documental:** revisar en UV15 los ID y textos de DATOS contra post-it original, cartografía, fecha/versión y privacidad, en flujo autorizado.
- **Validación funcional:** confirmar competencia DIMAO y apoyos en subtemas compartidos; priorización según evidencia y capacidad.
- **Plataforma definitiva:** autenticación/roles, registro de revisión, plan aprobado y seguimiento antes de uso como sistema de gestión.
- **Publicación:** verificar último despliegue GitHub Pages y prueba de uso en navegador.
- **Reanudar:** comenzar en docs/PROTOCOLO_PANEL_DIMAO_V1.md, comprobar index.html y dimao.html, y revisar último RUN.

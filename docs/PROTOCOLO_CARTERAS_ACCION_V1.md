# Protocolo V1 — Carteras territoriales del Congreso Barrial

Fecha: 11 de noviembre de 2026. Estado: piloto descriptivo, no plan de acción aprobado.

## Objetivo y navegación
La vista [carteras por dirección](../carteras.html) permite convertir los cruces estadísticos de temáticas, subtemas y UV en grupos de problemas y oportunidades para que las direcciones los evalúen. Conecta la [portada](../index.html), los [resultados temáticos](../tematicas.html), los [cruces multidimensionales](../cruces.html) y el [visor local de evidencias](../trazabilidad.html).

Estos enlaces representan una ruta analítica y no prueban derivaciones administrativas ya ejecutadas.

## Fuentes de autoridad
- Matriz_Congreso_Barrial_fusionada, hoja DATOS, fuente humana primaria de clasificación. Las cifras del portal se obtienen únicamente de su derivado público [datos-agregados.json](../datos-agregados.json), corte 09-11-2026.
- Tabla CAT_SUBTEMAS, columnas A:F, reproducida como [taxonomia-subtemas.json](../taxonomia-subtemas.json): 15 subtemas asociados a siete temáticas, y 7 direcciones de referencia con apoyos habituales, modalidades e instrumentos orientativos.
- Matriz total: 25 etiquetas UV y 1.570 registros. Entrega 01: 15 UV y 872 registros. La UV20 continúa pendiente de conciliación territorial.
- No se modifica la matriz original, el repositorio privado, las infografías o sus RUN y locks.

## Reglas de cálculo
1. Problemas: suma por UV y subtema de registros cuyo campo tipo es Problema.
2. Oportunidades: idéntico cálculo para tipo Oportunidad.
3. Contexto: suma de Actor y Lugar importante; NO se incluye en el volumen de problemas y oportunidades.
4. Dirección de referencia: suma de registros de los subtemas que CAT_SUBTEMAS relaciona con ella. No representa expedientes, tareas, presupuestos ni competencia ratificada.
5. Gráfico de barras: rojo = problemas, verde = oportunidades. El largo de las barras corresponde a la cantidad de menciones; no estima incidencia territorial, gravedad, costos o urgencia.
6. Tarjeta: agregación por dirección de referencia y subtema, con apoyos e instrumento sugeridos. No representa un plan aprobado.
7. Tabla: combinación UV × subtema, con conteos de problemas, oportunidades y contexto; permite abrir el visor interno con filtros.
8. Enfoque «grupos con problemas»: retiene intersecciones que presentan al menos un problema y muestra las oportunidades de esos mismos grupos. Enfoque oportunidades es simétrico.
9. Exportación: ofrece conteos agregados y campos en blanco para validar competencia, evidencia, acción, responsable, fecha, tipo de plazo, recursos, prioridad, autorización y seguimiento. El estado es SOLO_ANALISIS_SIN_ASIGNACION.

## Interpretación y privacidad
- Los indicadores cuentan registros o menciones, no personas, votos ni hechos comprobados.
- La clasificación del subtema y la dirección de referencia es metodológica: no constituye designación de funciones, aceptación, instrucción o compromiso municipal.
- El portal público no contiene textos originales, fotografías, ubicaciones exactas, coordenadas ni datos personales. Los registros sensibles requieren una herramienta de acceso institucional autenticado.
- Cuando se selecciona una UV, ciertos valores menores a tres se muestran como «<3» y en la exportación se marcan como SUPRIMIDO_MENOR_A_3. Es una mitigación parcial, no una certificación de anonimato.
- No identificar como comprobados domicilios ocupados, puntos delictivos, asentamientos o situaciones personales a partir de testimonios de jornadas.

## Ciclo institucional propuesto
I. Cotejo humano de id_punto, texto DATOS, post-it y cartografía original con procedencia.
II. Revisión de privacidad, duplicados y competencia de la unidad responsable.
III. Evaluación técnica de respuesta, recursos, presupuesto, prioridad y plazo.
IV. Validación/autorización institucional del plan.
V. Ejecución, seguimiento, evaluación de resultados y cierre documentado.

Ninguna etapa de autorización o ejecución ocurre automáticamente por navegar o exportar.

## Criterios de aceptación
- Cuatro tipos reconciliados en 1.570 registros (788 problemas, 299 oportunidades, 205 actores y 278 lugares).
- En la Entrega 01 se mantienen 872 registros de 15 UV.
- Los 15 subtemas suman los conteos por tipo de la matriz sin duplicación; dirección de referencia no modifica esa suma.
- El CSV mantiene un número idéntico de encabezados y valores; los campos de decisión humana permanecen vacíos.
- No hay transferencia de microdatos a páginas públicas ni cambios en fuente privada.
- Comprobar funcionamiento de filtros, enlaces, secciones de ayuda, versión móvil y despliegue GitHub Pages.

Pendientes: revisión visual en navegador; validación de competencias por las direcciones; cartografía/post-it original verificados; acceso institucional autenticado; seguimiento real de planes.

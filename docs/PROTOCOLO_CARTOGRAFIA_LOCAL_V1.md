# Protocolo V1 · Consulta cartográfica interna por punto y localización

**Fecha:** 11 de noviembre de 2026 · **Destino:** observatorio municipal · **Estado:** piloto sin microdatos publicados.

## Hechos comprobados de la hoja DATOS
- 1.570 registros con ID y par de coordenadas `latitud/longitud` en rango geográfico de Recoleta.
- 547 registros con valor en `ubicacion`. La falta de texto no significa ausencia de lugar: puede haber coordenadas.
- 78 registros marcados en `revisar_privacidad` para análisis especial. La ausencia de marca nunca significa publicación autorizada.
- La hoja MAPAS_UV presenta 59 combinaciones UV-grupo con claves de mapa, pero sin `confirmado_por_y_fecha` completado en la inspección. Por tanto, son **correspondencias propuestas**.

## Tres niveles de certeza espacial
1. **UBICACION_EN_DATOS:** el registro consigna ubicación libre y/o coordenadas. No constituye validación en terreno ni de un mapa físico original.
2. **CARTOGRAFIA_PROPUESTA:** coincidencia de UV+grupo en MAPAS_UV. Puede orientar búsqueda de fuente; no acredita clave ni cartografía de origen.
3. **UBICACION_VERIFICADA:** exigir revisión humana de post-it o cartografía original, archivo y versión, página/zona, `id_punto`, coordenadas y descripción, fecha y revisor. No asignar esta marca automáticamente.

Los números de casa, esquinas, áreas con personas en situación de calle, viviendas presuntamente ocupadas y menciones sobre delitos **deben etiquetarse como reportes de la jornada**, no como verificaciones oficiales. Proteger a quienes participaron y a terceros.

## Interfaz del piloto
- Las categorías temáticas remiten a `trazabilidad.html?tema=...`.
- Cargar manualmente CSV de DATOS y opcional MAPAS_UV bajo permisos de Google Drive. El JS no descarga los archivos privados; el CSV se procesa en memoria.
- Filtrar por UV, tema, subtema, tipo, grupo y términos en descripción/ubicación escrita; seleccionar en tabla o marcador.
- Dibujar las coordenadas en un **plano local** por defecto (sin servicios externos).
- Activar mapa de calles solo tras consentimiento explícito. Teselas OSM reciben únicamente la zona visualizada y nivel de zoom. La conexión externa no recibe CSV, descripciones, IDs ni marcadores. La zona solicitada a un zoom alto puede ser sensible.
- Los registros marcados en privacidad no aparecen salvo doble habilitación. No trasladar este mecanismo de consentimiento local a una aplicación pública: **no sustituye autenticación**.
- Mostrar en la ficha la ubicación original de DATOS, coordenadas y calidad por cotejar, más clave de mapa propuesta y referencia a la hoja de origen.
- Exportar únicamente desde el navegador la matriz de análisis, con ubicaciones referenciales y campos de planificación vacíos; gestión posterior por áreas competentes.

## Reglas de implementación permanente
- Prohibir exponer direcciones precisas o personas vulnerables en el dashboard público; publicar agregados con mínimos de grupo y supresión cuando corresponda.
- Dar acceso al detalle mediante autenticación/roles en un entorno institucional. Separar auditoría de consulta, revisión de fuente, derivación a unidad y seguimiento de acciones.
- Una ubicación propuesta nunca se muestra como incidente acreditado ni como prioridad oficial.
- Antes de afirmar que una esquina concreta aparece en cartografía, cotejar la imagen original e identificar coordenadas de la zona gráfica y/o textual; el vínculo por UV+grupo es insuficiente.
- No hacer geocodificación automática de domicilios con servicios terceros sin revisión de privacidad/base jurídica.
- El mapa de calles es contexto geográfico; **no es la cartografía participativa original**.

## Pruebas de aceptación
- Mantener 1.570 datos y 547 ubicaciones del corte sin copiar ninguno al repositorio público.
- Carga CSV con comillas, separadores y texto multilineal; descartar coordenadas inválidas.
- Navegación de tema a mapa y mapa a ficha con ID; filtros reducen marcadores y filas de forma consistente.
- Ninguna llamada externa de red antes del consentimiento para las teselas.
- Exportación marcada `COORDENADA_DATOS_SIN_COTEJO_CARTOGRAFICO`, con advertencia sobre distribución.
- Análisis visual con navegador real y revisión de privacidad/competencia por una persona autorizada antes de uso operativo.

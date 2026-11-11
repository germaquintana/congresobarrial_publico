# Dashboard de presentación — guion ejecutivo y criterios de habilitación V1

**Proyecto:** Congreso Barrial de Recoleta. **Fecha:** 11 de noviembre de 2026.  
**Vista de presentación:** [presentacion.html](../presentacion.html). **Estado:** código en GitHub; consultar la ejecución de GitHub Pages para confirmar el despliegue de la versión más reciente.

## Objetivo de la presentación

Mostrar los resultados disponibles del Congreso Barrial con tres perspectivas complementarias, sin atribuir a los registros comunitarios carácter de hechos acreditados ni asumir compromisos municipales automáticos. El usuario puede cambiar de corte territorial y avanzar por UV o dirección hasta el grupo y el identificador del dato digitalizado.

### Recorrido sugerido (7 minutos)

| Momento | Pantalla | Mensaje para la reunión |
|---|---|---|
| Inicio (1 min) | Comuna, primera entrega | 15 UV y 872 registros clasificados, procedentes de DATOS. Son menciones de jornadas, no encuestas representativas ni demandas validadas |
| Panorama (1–2 min) | Comuna, barras temáticas y tipos | 436 problemas, 174 oportunidades, 101 actores, 161 lugares importantes. La proporción expresa frecuencia documental |
| Territorial (2 min) | UV15, grupos | 42 registros; GRUPO 1 (18), G2 (16), GRUPO 3 (8). Cada grupo permite llegar a DATOS tras autorización. Mantener visible la discrepancia G2/G3 del catálogo MAPAS_UV |
| Dirección municipal (2 min) | DIMAO, referencia/apoyo | 176 problemas y 100 oportunidades relacionados con DIMAO en la primera entrega, de los cuales 101/39 tienen liderazgo referencial DIMAO y 75/61 un rol de apoyo |
| Cierre (1 min) | Cadena de evidencia | Atributos de la matriz disponibles; texto individual exige fuente autorizada; foto y cartografía original pendientes de cotejo. La futura consulta Workspace será interna y con permisos propios |

## Cómo presentar sin exponer datos

- Utilizar [presentacion.html](../presentacion.html) en pantalla compartida: **solo datos agregados**; no llevar el CSV DATOS a la presentación.
- Cambiar entre las pestañas Comuna, UV y Direcciones sin perder el corte. Para proyectar una lámina, usar «Imprimir o guardar vista como PDF»; esto imprime la perspectiva visible y los agregados.
- Para una reunión de trabajo interno autorizada, abrir por separado [uv-grupos.html](../uv-grupos.html), cargar CSV local y consultar ID, siempre después de evaluar qué información se mostrará a asistentes y si hay datos sensibles.
- **No mostrar la aplicación interna de Apps Script en público** ni distribuir su dirección hasta contar con autorización de despliegue y pruebas con permisos reales.
- Antes de comunicar medidas municipales, verificar competencia, fundamento técnico, prioridades y responsable; la relación entre subtema y dirección de CAT_SUBTEMAS es referencial.
- Los nombres «UV20» y las asociaciones de mapa UV15 G2/G3 requieren conciliación; no presentarlos como vínculos geográficos certificados.

## Recuperación editorial de las visualizaciones originales (V1.1)

La presentación vuelve a incluir las **tortas cromáticas** y las **columnas apiladas por temática** utilizadas en el panorama original. Colores fijos por temática: Infraestructura y espacio público `#2b689b`, Aseo y medio ambiente `#238b84`, Desarrollo social y comunitario `#be772c`, Seguridad y convivencia `#9554a9`, Movilidad y transporte `#d05859`, Actividad económica y comercio `#698b35`, Vivienda y entorno urbano `#946781`.

En la primera capa, una torta muestra la distribución temática y otra los tipos de registro; las columnas por UV dividen el total en segmentos de la paleta y todos usan un máximo común para la escala de altura. En la segunda capa se recupera la torta de las temáticas de la UV seleccionada. En la tercera capa se muestran columnas apiladas para problemas (rojo) y oportunidades (verde), coherentes con los gráficos sectoriales anteriores. Las leyendas identifican número y porcentaje de menciones, no prioridad administrativa. Los segmentos tienen enlaces a sus filtros de origen; se mantienen alternativas de lectura mediante barras.

**Control de regresión:** con Entrega 01, las tortas suman 872 registros y los gráficos muestran 15 columnas UV; UV15 suma 42 registros. Para la matriz completa, se muestran 25 columnas UV y 1.570 registros. En DIMAO, 176/100 problemas/oportunidades en Entrega 01 y 307/172 en la matriz completa. Sintaxis y renderización simulada verificadas; prueba visual externa pendiente.

## Controles de calidad del dashboard

- La fuente pública `datos-agregados.json` mantiene **25 etiquetas UV y 1.570 registros**, con **15 UV y 872 registros** en Entrega 01.
- En ambas escalas la suma de los grupos de cada UV coincide con el total de registros de esa UV.
- La taxonomía pública contiene 15 subtemas, entre ellos dos con DIMAO como líder referencial y tres como apoyo.
- Los indicadores del visor se recalculan únicamente al cambiar corte, perspectiva, UV, dirección o rol.
- Los enlaces a grupos y categorías transmiten parámetros URI sin incluir textos, domicilios ni coordenadas.
- La aplicación Workspace interna, si se activa, comprueba identidad, dominio y permiso de lectura cada vez que se ejecuta una función de servidor.
- Los registros `revisar_privacidad=Sí` están ocultos por defecto; la consulta restringida se registra sin descripción en bitácora.
- Una prueba de código con datos sintéticos o lectura de archivo GitHub **no** equivale a verificar en vivo permisos Workspace o la interfaz visual con usuarios finales.

## Pendientes imprescindibles antes de presentar la capa primaria como funcional

1. **Despliegue real** del proyecto de [Google Apps Script](../interno-appsscript/README.md) por una cuenta municipal autorizada, como **usuario que accede** y **solo dominio**.
2. **Prueba con tres perfiles**: autorizado con permiso en Sheets, institucional sin permiso, externo/anónimo. Conservar evidencia de resultados, sin recopilar capturas con datos personales.
3. **Validación documental** del mapeo de post-it y cartografías; iniciar por UV15.
4. **Prueba de navegación y visual** del sitio público con el último commit desplegado en GitHub Pages.
5. **Definición de destinatarios:** exposición pública solo con agregados; exposición interna de texto individual únicamente con permisos, revisión de privacidad y contexto de uso.

## Cierre y criterio de aceptación

La capa pública ejecutiva está lista a nivel de código y datos agregados. La capa de consulta primaria interna está implementada como proyecto de Apps Script **pendiente de despliegue en Workspace**. No declarar completado el sistema autenticado ni la verificación de cartografías antes de las pruebas y autorizaciones indicadas.

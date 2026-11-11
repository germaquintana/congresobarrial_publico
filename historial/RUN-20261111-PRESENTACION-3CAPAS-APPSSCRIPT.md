# RUN — Dashboard ejecutivo 3 capas y acceso institucional autenticado (preparado)

**Fecha/hora Chile:** 2026-11-11 18:53:04 (America/Santiago).  
**Repositorio especializado:** `germaquintana/congresobarrial_publico`, rama `main`.  
**Tipo:** implementación de producto, auditoría numérica y preparación del despliegue interno.  
**Alcance:** solo repositorio público de visualización y código fuente de aplicación interna. No se editaron hojas de Drive, expedientes, permisos institucionales, automatizaciones ni el repositorio privado canónico.

## Objetivo

Presentar resultados del Congreso Barrial con un dashboard unificado y tres capas coherentes: panorama agregado de la comuna/corte, detalle territorial de UV y grupos, perspectiva municipal de problemas y oportunidades. Preparar una consulta institucional con identidad Google Workspace para abrir descripciones digitales de `DATOS` por ID sin subir CSV públicos ni saltar controles de privacidad.

## Fuentes verificadas

- `datos-agregados.json`: 25 etiquetas UV/1.570 registros; Entrega 01 15 UV/872 registros, todos agregados por tema/tipo/grupo/UV.
- `taxonomia-subtemas.json`: 15 subtemas; rol de dirección líder referencial y apoyos habituales; DIMAO 2 referencia + 3 apoyo.
- Matriz de Drive `Matriz_Congreso_Barrial_fusionada`, pestañas DATOS y CAT_SUBTEMAS, columnas y encabezados comprobados en lectura anterior; ningún cambio a fuente.
- Estado del repositorio canónico `germaquintana/congresobarrial`: privacidad individual en estado pending y publicación individual no autorizada. No se tocó su lock ni la matriz de producción.
- Documentación oficial Apps Script para Web Apps ejecutadas como usuario que accede, control DOMAIN y API `google.script.run`: https://developers.google.com/apps-script/guides/web y https://developers.google.com/apps-script/guides/html/communication.

## Cambios confirmados

1. `presentacion.html` y `presentacion.js`: portada ejecutiva con selector de corte y tres perspectivas. Incluye KPIs, distribución temática, tipos, UV, grupos y enlaces a ficha, direcciones municipales con roles referenciales y apoyos, navegación contextual y botón para imprimir la vista.
2. `index.html`: acceso destacado «Abrir modo presentación», con corte y UV sincronizados.
3. `uv-grupos.js` + `uv-grupos.html`: reciben `direccion` y `rol`, mantienen filtro municipal al leer DATOS localmente; explican diferencia entre totales del grupo y registros filtrados.
4. `interno-appsscript/Code.gs`: API institucional de solo lectura con `doGet`, `boot`, `queryPoints` y `getPoint`. Cada llamada al servidor verifica usuario `@recoleta.cl` y permiso real de lectura sobre la matriz; el listado solo devuelve metadatos. La ficha recupera descripción de un ID, con reserva de registros marcados y segunda confirmación. Bitácora técnica sin texto ni ubicación en cada lectura.
5. `interno-appsscript/Index.html`: interfaz Workspace de comuna, UV/grupos y direcciones, filtros y ficha por ID.
6. `interno-appsscript/appsscript.json`: `webapp.access=DOMAIN`, `webapp.executeAs=USER_ACCESSING`, scopes `spreadsheets.readonly` y `userinfo.email`.
7. `interno-appsscript/README.md`: guía de instalación por cuenta municipal y matriz de pruebas de seguridad.
8. `docs/GUIA_PRESENTACION_TRES_CAPAS_V1.md`: guion ejecutivo y condiciones de habilitación.
9. `README.md`: índice de productos, estado de implementación y límites del acceso.

## Pruebas verificadas

- JavaScript `presentacion.js` sintácticamente válido y renderización simulada con fuente agregada real. Entrega 01: 872 registros, 15 UV, 7 temáticas, 4 tipos; UV15 42 registros, tres grupos; DIMAO Entrega 01 176 problemas, 100 oportunidades (referencia 101/39, apoyo 75/61); DIMAO matriz completa 307/172; todos los conteos coinciden con el catálogo.
- `Code.gs` compiló en V8 y sus funciones se probaron con filas sintéticas: usuario institucional con permiso lee; cuenta externa y usuario sin permiso son rechazados; listados no devuelven `descripcion`; un ID con marca de privacidad no devuelve texto sin reconocimiento expreso. Las pruebas sintéticas no equivalen a la validación de un despliegue Apps Script real.
- `uv-grupos.js` conserva el filtro de dirección/rol al pasar a UV: simulación con 4 registros de prueba separó DIMAO referencia (2), apoyo (1) y ajeno (1). No se publicaron esos textos ficticios ni datos reales.
- Lectura posterior desde GitHub tras escritura y SHA de archivos verificados en cada paso.
- GitHub Actions/Páginas: observado despliegue `success` del commit funcional `a01eebaf01287bc6ee190b4a26f71c78dec30c59` (run 43106563640), seguido de ejecuciones por documentación. La inspección gráfica real en navegador final no fue completada.

## Estado de entrega y bloqueos

**Dashboard público:** código publicado en main y despliegue exitoso observado en GitHub Pages para el commit funcional; requiere validación visual en equipo de presentación.

**Consulta de datos primarios sin CSV:** implementación fuente de Apps Script lista para instalación, **no desplegada ni verificada** con cuentas municipales reales. No se tiene URL de producción. El script debe ser creado/desplegado por una cuenta autorizada en Google Workspace con DOMAIN + USER_ACCESSING y permiso de lectura de la matriz para cada usuario. No se publica ningún dato individual ni URL simulada.

**Cartografías:** vínculo UV15 G2 / G3 sin cotejo documental, no homologado.

## Reanudación y próximas acciones

1. Probar en navegador real `presentacion.html`, botones de las tres perspectivas, enlaces a `uv-grupos.html` y modo impresión/PDF.
2. Crear Apps Script con los 3 archivos indicados y desplegarlo desde cuenta municipal autorizada; verificar usuario con lectura, municipal sin lectura, y externo.
3. Registrar el URL verdadero después de la validación de permisos; entonces incorporar enlace directo «Consulta institucional» en la presentación, sin exponer microdatos.
4. Revisar privacidad, correspondencia post-it/cartografía y competencias por dirección antes de habilitar el paquete definitivo para entrega y gestión.

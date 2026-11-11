# RUN — Tres capas: comuna → UV/grupo → post-it y direcciones

**Fecha/hora Chile:** 2026-11-11 18:26:48 (America/Santiago).  
**Repositorio de producto:** germaquintana/congresobarrial_publico, main.  
**Ejecución:** implementación de prototipo de navegación y control de evidencia; cambios verificados en GitHub.  
**No se realizó:** actualización de hoja DATOS, modificaciones en repositorio canónico privado, cartografía original, expedientes, permisos Drive o comunicación municipal.

## Requisitos y plan aplicado

1. Conservar panorama comunal agregado, con cortes 15 UV (872 registros) y 25 etiquetas UV (1.570 registros).
2. Ofrecer navegación real por UV, grupo en DATOS y registro id_punto, con descripción de la matriz visible en la misma vista cuando la persona carga CSV autorizado; ocultar microdatos del portal público.
3. Integrar vista municipal (DIMAO y carteras) con la misma ruta territorial, sin alterar competencias ni estados de aprobación.
4. Mejorar enlaces URL de corte, UV, grupo, tema, tipo, subtema e ID en el visor alternativo.
5. Documentar discrepancias de mapas, privacidad y publicar resultados de pruebas.

## Fuentes leídas

- Matriz_Congreso_Barrial_fusionada, hojas DATOS, MAPAS_UV, DIGITALIZACION_UV y metadatos de Sheets; no hubo escritura.
- Repositorio canónico privado germaquintana/congresobarrial, estado_proyecto.json y AGENTS.md; privacidad y publicación individual siguen pendientes, sin alterar su lock ni su siguiente acción.
- Repositorio público previo: index.html, trazabilidad.html, resultados-territoriales.json, datos-agregados.json, dimao.js, carteras.js, cruces.html y README.md.
- GitHub Actions del repositorio público para determinar publicación; ejecuciones previas con startup_failure y otras posteriores con success. El estado final requiere cotejo del commit más reciente y prueba visual.

## Archivos creados o modificados

- **uv-grupos.html y uv-grupos.js:** capa territorial: vista general UV, grupos de DATOS, filtro por tipo/tema/subtema y lector local de DATOS.csv por sesión. ID seleccionable con ficha de descripción registrada y vínculo a su fila de origen. Control de autorización, marcadores de privacidad, ocultamiento de textos marcados por defecto, descarte local al cerrar. No utiliza servicios externos para transmitir DATOS.
- **index.html:** grupos de post-it accesibles desde cada ficha UV; tarjetas UV-grupo con conteo, entrada al lector; navegación principal ampliada y corrección de enlaces por corte, incluido apertura en nueva pestaña.
- **trazabilidad.html:** admite URL con grupo e ID y filtro automático luego de importar CSV; enlace de retorno hacia capa UV-grupos.
- **dimao.js, carteras.js, cruces.html:** enlaces territoriales dirigidos a uv-grupos.html con la combinación UV, tema, subtema y tipo de origen.
- **docs/PROTOCOLO_TRES_CAPAS_POSTIT_V1.md:** modelo de datos, recorridos de consulta, fuentes, controles, riesgos, criterios de aceptación y siguiente fase autenticada.
- **README.md:** mapa de navegación y limitaciones de lectura primaria.

## Verificación cuantitativa

- En DATOS: 1.570 IDs únicos con descripción y grupo; cuatro tipos: Problema 788, Oportunidad 299, Actor 205 y Lugar importante 278.
- En agregados del portal: 25 etiquetas UV y 75 grupos; en cada UV, la suma de sus grupos coincide exactamente con el total UV; no se encontraron discrepancias cuantitativas.
- En UV15: 42 registros, tres grupos GRUPO 1 (18), G2 (16), GRUPO 3 (8).
- MAPAS_UV propone G3 con 16 para UV15, mientras DATOS registra G2 con 16. No se homologó G2 a G3, por falta de verificación documental. Un cruce simple UV+grupo identifica 995 asociaciones candidatas y 575 sin ese vínculo en DATOS. Ninguna de las 59 filas de MAPAS_UV contiene confirmación humana de cartografía registrada.
- En DATOS existen 78 marcas de revisión de privacidad y 25 referencias foto_ref no vacías; esto no habilita publicación de los textos o fotografías.

## Pruebas realizadas

- Código JavaScript con sintaxis válida en index.html, trazabilidad.html, cruces.html, uv-grupos.js, dimao.js y carteras.js.
- Integridad de enlaces entre comuna, grupo, direcciones, cruces y visor: ruta correcta hacia uv-grupos.html y parámetros de fuente.
- Prueba funcional sintética del CSV: 3 ID distintos, delimitadores y campos con comillas, filtrado grupo G2, ocultamiento de ID marcados, restricción del texto al activar inclusión sin revelación, vaciado de datos al cerrar y rechazo de ID duplicados.
- uv-grupos.js solo efectúa fetch de datos-agregados.json; no publica ni solicita DATOS de un endpoint remoto. Los textos vienen exclusivamente de archivos elegidos por persona autorizada.
- Lectura de archivos GitHub tras escrituras y coherencia de 75 grupos/1.570 registros confirmadas.
- PENDIENTE: prueba visual en navegador externo real, integración autenticada con Drive/Sheets y verificación de la versión final en Pages.

## Riesgos abiertos y siguiente paso

- El portal GitHub Pages puede presentar retrasos de despliegue; varios runs anteriores fallaron startup_failure aunque se han observado algunos runs nuevos con success. Revisar Actions y comprobar versión final antes de declarar disponibilidad pública.
- El lector local **no es un visor remoto autenticado**. La consulta de texto exige CSV de DATOS y confirmación de autorización. No presentarlo como acceso automático al post-it físico.
- Los vínculos con cartografías físicas y las condiciones de privacidad necesitan cotejo y aprobación por equipos responsables. La discrepancia G2/G3 de UV15 impide un enlace cartográfico automático.
- Próxima fase: diseñar y prototipar aplicación institucional autenticada con Google Drive/Sheets y perfiles de consulta, conservando id_punto y sin exponer registros personales en el repositorio público; validar en UV15 y escalar a las 15 UV de Entrega 01.

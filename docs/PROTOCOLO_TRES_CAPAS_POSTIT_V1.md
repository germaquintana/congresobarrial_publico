# Arquitectura de consulta en tres capas y lectura del post-it — Protocolo V1

**Corte de trabajo:** 11 de noviembre de 2026.  
**Producto:** Congreso Barrial de Recoleta — portal público de datos agregados y prototipo de lectura local.  
**Estado:** piloto implementado para navegación territorial y lectura de DATOS mediante importación autorizada; no existe todavía un backend municipal autenticado.

## Objetivo institucional

Garantizar que las perspectivas **comunal**, **territorial por UV y grupo** y **por dirección municipal** consulten una clasificación numérica coherente y puedan recorrer el camino de evidencia hasta un identificador estable, sin publicar microdatos ni atribuir competencia o ejecución que no esté validada.

### Capa 1 — Panorama comunal

- Entrada: [portada](../index.html), con corte Entrega 01 (15 UV y 872 registros) o matriz completa (25 etiquetas UV y 1.570 registros).
- Indicadores: Problema, Oportunidad, Actor, Lugar importante, temáticas, totales UV, cobertura de fuente, cautelas de representatividad y control de privacidad.
- Navegación: seleccionar UV para ver panorama B01–B10, grupos y fuentes; o seleccionar temática y abrir un cruce UV–subtema.
- Precaución: «25 etiquetas UV» y «15 UV de primera entrega» no equivalen a cobertura exhaustiva de población comunal. No transformar conteos de post-it en prevalencia, causalidad, prioridades ni votos.

### Capa 2 — Unidad Vecinal → grupos → post-it

- La [ficha UV de la portada](../index.html) muestra indicadores, diez bloques B01–B10 y una lista de grupos desde el campo DATOS.grupo (sin cotejo de cartografía).
- Cada grupo enlaza a [UV, grupos y post-it](../uv-grupos.html) con parámetros **corte, UV, grupo, tipo, tema, subtema e ID**. El contexto de filtros se conserva dentro de la página.
- Sin cargar CSV: la nueva página solo muestra información agregada pública de la UV y los grupos. No se consultan ni descargan microdatos automáticamente.
- Con consentimiento y CSV autorizado de la hoja DATOS: una sola carga local por sesión habilita la lista de ID del grupo y la lectura, al pinchar cada ID, del campo descripción del CSV. La página no envía el archivo a GitHub ni a servidores; no usa localStorage, cookies, APIs de escritura ni servicios externos de captura.
- Los registros con revisar_privacidad verdadero no aparecen por defecto. Para mostrar sus metadatos se requiere activar su inclusión; el texto permanece oculto salvo una segunda habilitación explícita.
- La ficha indica id_punto, UV, grupo, tipo, tema y subtema, estado de auditoría, origen y privacidad, descripción registrada y enlace a la fila de la hoja DATOS accesible bajo permisos de Google. **La descripción registrada no es necesariamente el texto literal del post-it**.
- La opción de cerrar el visor descarta la copia del CSV de la memoria del programa y elimina el contenido visible; no puede garantizar borrado físico de datos retenidos por el navegador, capturas, cachés de sistemas o archivos descargados. Usar equipos institucionales adecuados.

### Capa 3 — Direcciones municipales

- [Carteras por dirección](../carteras.html) y [Panel DIMAO](../dimao.html) agrupan problemas y oportunidades por subtema y UV. DIMAO tiene dos categorías donde figura como líder referencial y tres donde aparece como apoyo, con confirmación **preliminar** del usuario.
- Las tablas territoriales y celdas de cruces de los paneles enlazan ahora a uv-grupos.html conservando UV, temática, subtema y tipo. Desde ahí se selecciona grupo y, tras cargar DATOS autorizado, el ID del registro y su descripción.
- Un registro puede estar clasificado en un único tipo y subtema; una dirección es **referencia de análisis**, no asignación formal de obligaciones, presupuesto o actuaciones.
- Otras direcciones deben confirmar competencias y criterios de apoyo antes de utilizarse como instrumento administrativo.

### Fuente de verdad y modelo recomendado

DATOS es la fuente primaria digitalizada de las menciones. Sus campos son **id_punto** (identidad estable), **uv**, **grupo**, **tipo**, **tema_principal**, **subtema**, **descripcion**, **ubicacion**, **aud_estado**, **revisar_privacidad** y procedencia. MAPAS_UV es una relación de cartografías propuesta, no una clave extranjera validada de todos los grupos. Los agregados públicos se derivan de DATOS, sin reemplazarla.

Modelo para versión autenticada futura:

- Tabla **registro** (id_punto, uv_id, grupo_id, tipo_id, tema_id, subtema_id, fuente_Datos, auditoria, privacidad, fecha_version).
- Tabla **grupo** (uv_id, grupo_DATOS, cantidad_registros, etiqueta, estatus_de_cotejo).
- Tabla **mapa** (mapa_id, archivo_original, version, grupo_id_candidato, verificado_por, fecha_verificacion).
- Tabla **competencia** (subtema_id, dirección, rol, fuente, validación, versión).
- Tabla **actuación municipal** (id_accion, id_punto_relacionado o cartera, evaluación técnica, responsable validado, aprobación, prioridad, plazo_oficial/interno, seguimiento). No poblar esta última automáticamente a partir de DATOS.

## Evidencia y cartografía: hallazgos comprobados

La matriz contiene 1.570 registros con ID único y descripción. Hay 75 combinaciones UV-grupo, con sumas por UV coherentes con los agregados publicados. La hoja MAPAS_UV registra 59 filas con agrupaciones; un cruce UV+grupo produce 995 asociaciones **candidatas** y deja 575 registros sin igualación por nombre de grupo. No hay confirmación humana registrada en la columna correspondiente en las 59 filas. En UV15, DATOS registra G2 (16 registros) y MAPAS_UV registra G3 (16); aunque ambos presentan el mismo número de puntos, su identidad no puede inferirse. No igualarlos automáticamente.

Solo 25 registros tienen dato en foto_ref y 78 están marcados para revisión de privacidad. Un ID y descripción de DATOS son verificables digitalmente, pero su foto/cartografía física necesita cotejo documental cuando se quiera afirmar que se muestra el **post-it original**.

## Publicación y privacidad

- **Portal público GitHub Pages:** únicamente agregados, dimensiones, catálogos y código de lectura local sin datos privados.
- **Visor local transitorio:** DATOS.csv proporcionado por persona autorizada, procesado dentro del navegador, con ocultamiento de registros marcados para revisión de privacidad.
- **Aplicación interna definitiva:** deberá autenticarse con cuenta institucional, respetar permisos Drive/Sheets, no usar credenciales públicas, registrar accesos y revisiones, y permitir enlaces estables a ID y cartografía original verificada.
- El campo revisar_privacidad vacío no implica publicación autorizada. No exportar ni compartir microdatos sin revisión correspondiente.
- No publicar texto sensible de ubicaciones, menciones personales, asentamientos, denuncias o coordenadas a través de parámetros de URL o archivos estáticos.

## Pruebas y criterios de aceptación

1. La portada llega por clic a cualquier UV, muestra grupos con totales coherentes y llega a uv-grupos.html?uv=...&grupo=... .
2. La página UV-grupos muestra únicamente agregados cuando no se carga DATOS.csv. Sus indicadores UV no cambian incorrectamente al elegir subtema/tema; el filtro detallado se aplica solo a registros autorizados.
3. El CSV se valida por columnas requeridas, ID duplicados y parseo de campos entrecomillados; el mensaje indica si el número de registros de la UV difiere del agregado del corte.
4. Un registro marcado para privacidad no aparece en el listado salvo opción de inclusión; su texto requiere una segunda habilitación. No hay acceso remoto automático.
5. Los enlaces de carteras DIMAO/cruces permiten llegar al grupo y al ID. El visor alternativo trazabilidad acepta también parámetros de grupo e ID, solo después de cargar CSV.
6. El cambio de UV o alcance restablece grupo y subtema para no mantener filtros residuales.
7. Ninguna cartografía se presenta como confirmada sin cotejo de fuente humana.
8. Antes de afirmar disponibilidad pública debe comprobarse un despliegue exitoso de GitHub Pages y prueba visual real.

## Riesgos abiertos

- La publicación de Pages registró múltiples ejecuciones con resultado startup_failure. Debe revisarse Actions/Pages en GitHub con permisos de administración; guardar archivos en main no equivale a desplegar el portal.
- El prototipo ofrece lectura directa **después de una importación manual** autorizada, no acceso web autenticado directo a Google Drive. Para eliminar esa fricción, la implementación siguiente debe ser una aplicación interna corporativa.
- El lector básico UV-grupos y el visor avanzado de trazabilidad comparten la misma fuente y claves, pero aún hay dos componentes de presentación distintos. Una fase posterior debe consolidarlos mediante un módulo de ficha y permisos común.
- Comprobar cartografía MAPAS_UV, especialmente G2/G3 de UV15, antes de publicar mapas y antes de agregar cartografía al registro individual.
- El repositorio canónico del Congreso Barrial tiene privacidad/publicación individual pendiente; esta iteración **no modifica** esa condición.

**Reanudación:** probar UV15 → G2 → DATOS (con CSV autorizado) → ID, cotejar cartografías y abordar acceso corporativo autenticado para evitar la carga CSV manual.

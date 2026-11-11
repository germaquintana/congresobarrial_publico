# Consulta institucional de post-it — Google Apps Script V1

**Estado al 11-11-2026:** código fuente y manifest preparados y probados con datos sintéticos. **No desplegado ni autorizado en Google Workspace.** El repositorio público contiene únicamente el código, nunca el texto de DATOS, credenciales ni archivos privados.

## Archivos del proyecto

1. [Code.gs](Code.gs): servicio de autenticación y lectura de DATOS / CAT_SUBTEMAS.
2. [Index.html](Index.html): interfaz de consulta de comuna, UV, grupos, direcciones y ficha individual de ID.
3. [appsscript.json](appsscript.json): permisos de ejecución y OAuth mínimos.

La fuente es la [matriz institucional](https://docs.google.com/spreadsheets/d/1KecTjqU4Kx5tJLNPl4Z5D1sxlgC05PxWHh5xwuI0jpQ/edit), pestañas DATOS y CAT_SUBTEMAS. Esta aplicación se prepara de forma separada del portal público [de presentación](../presentacion.html).

## Instalación por una cuenta municipal autorizada

1. Inicia sesión con una cuenta del dominio `recoleta.cl` que tenga acceso al libro. Preferiblemente la cuenta de gestión ambiental o una cuenta de servicio de proyecto administrada institucionalmente.
2. Abre [Google Apps Script](https://script.google.com/home/projects) y crea un proyecto **independiente** llamado «Congreso Barrial — Consulta institucional». No pegues el código en un proyecto de uso público compartido.
3. Sustituye el contenido de `Code.gs` con el archivo de GitHub correspondiente y crea un archivo HTML llamado exactamente `Index` (el editor agrega la extensión `.html`). Copia ahí `Index.html`.
4. En Configuración del proyecto activa la opción de mostrar el manifiesto `appsscript.json`. Sustituye su contenido por el manifiesto suministrado. Confirma `webapp.access = DOMAIN`, `webapp.executeAs = USER_ACCESSING`, ámbito de lectura `spreadsheets.readonly` y `userinfo.email`.
5. Selecciona **Implementar → Nueva implementación → Aplicación web**. Configura **Ejecutar como: usuario que accede** y **Quién tiene acceso: usuarios del dominio institucional**. **No usar «Ejecutar como yo», acceso anónimo ni «cualquiera con el enlace»**.
6. Autoriza los scopes solicitados y abre el enlace `/exec` con la cuenta que desplegó el proyecto. No confundas la URL de desarrollo `/dev` con el despliegue de producción.
7. Comienza probando exclusivamente con UV15, sin compartir el vínculo con público general.

**Importante:** aunque el URL de un Web App no sea confidencial por sí mismo, no lo añadas al portal público hasta confirmar configuración, dominio, permisos y revisión institucional. La aplicación no debe publicarse sin pasar estas pruebas.

## Matriz de pruebas obligatoria (antes de habilitar enlace)

| Caso | Resultado exigido |
|---|---|
| Cuenta del dominio recoleta.cl con permiso de lectura de Sheets | Carga la portada y puede consultar resultados |
| Cuenta del dominio sin permiso de lectura del libro | Acceso denegado y ninguna descripción visible |
| Cuenta externa / sesión anónima | Acceso denegado (preferentemente por barrera del propio dominio) |
| `id_punto` existente en DATOS | Ficha con descripción digitalizada y enlace a fila bajo permisos |
| `revisar_privacidad=Sí` | No aparece en listado por defecto; ficha oculta descripción sin segunda confirmación |
| Se solicita ver registro marcado con confirmación específica | La lectura se consigna en la bitácora Apps Script sin guardar descripción/ubicación |
| Se filtra por dirección y rol | Recuento de problemas/oportunidades coincide con los agregados del portal |
| Se accede al enlace de ficha desde sesión desautorizada | No debe proporcionar datos; toda función de servidor comprueba nuevamente permisos |
| Se cambia de UV o dirección | El ID y la clasificación del resultado corresponden a los filtros seleccionados |
| Se revisan ejecuciones de script | Sin registros de descripciones ni coordenadas en los logs |

## Arquitectura y garantías

- El Web App debe ejecutarse como **usuario que accede**. Google solicita autorización OAuth individual y el servicio `SpreadsheetApp.openById` aplica los **permisos del usuario** sobre el documento.
- Cada función pública de servidor (`boot`, `queryPoints`, `getPoint`, además de `doGet`) valida identidad no vacía con sufijo `@recoleta.cl` y acceso a la matriz. Si Google no facilita la identidad, la aplicación **falla de forma cerrada**. Esto depende de la configuración Workspace; no se admite como alternativa ejecutar como propietario para «hacerlo funcionar».
- El listado `queryPoints` **nunca devuelve la descripción**, ubicación ni coordenadas. Una ficha individual `getPoint` sí devuelve la descripción digitalizada al usuario autorizado. Si el registro está marcado para privacidad, la respuesta inicial no contiene texto; para revelarlo se requiere una confirmación adicional y se deja constancia en la bitácora de ejecución del script.
- La página usa `google.script.run` (RPC nativo de HtmlService), no endpoints JSON sin autenticación, no CORS hacia GitHub Pages y no almacena DATOS en archivos públicos.
- Los parámetros en URL pueden acotar UV, grupo, temática, tipo, dirección, rol e ID. No incluir descripciones ni ubicaciones en URL.
- La base no contiene una vinculación certificada con la cartografía física. `MAPAS_UV` necesita una conciliación específica; el campo de vínculo permanece pendiente de cotejo.
- El frontend es solo lectura. No edita la matriz, no envía correos, no crea tareas y no aprueba gestiones. Las direcciones de referencia proceden de CAT_SUBTEMAS, sujetas a validación.
- Si un usuario autorizado abre su navegador en un equipo compartido, la administración del equipo y del navegador sigue siendo esencial. No existe una garantía absoluta de borrado de memoria o capturas de pantalla.
- La activación municipal exige verificar políticas de seguridad, privacidad y acceso a la hoja; el dominio por sí solo no habilita acceso sin permisos de Drive/Sheets.

## Limitaciones conocidas

Apps Script Web Apps pueden no entregar `Session.getActiveUser().getEmail()` en determinados contextos. La implementación rechaza la sesión si el correo está vacío; este comportamiento evita una degradación insegura del control. La opción «Ejecutar como usuario que accede» puede exigir a cada persona que autorice el proyecto y tenga el documento compartido con su cuenta. Véase la [documentación oficial de Apps Script Web Apps](https://developers.google.com/apps-script/guides/web) y de [Session](https://developers.google.com/apps-script/reference/base/session).

Esta es una **implementación preparada y técnicamente probada en simulación**, no una garantía de que exista una URL desplegada. El paso de crear proyecto, autorizar permisos y desplegar Web App queda bajo control de una persona municipal autorizada. Cuando exista un despliegue verificado podrá añadirse un acceso directo al dashboard público sin exponer los datos internos.

# RUN — mapa territorial referencial del Congreso Barrial

**Fecha y hora Chile:** 2026-11-11 13:21:39 (America/Santiago).  
**Repositorio afectado:** `germaquintana/congresobarrial_publico`, rama `main`.  
**Alcance:** nueva capa geográfica en explorador de evidencia local, sin publicar microdatos.

## Fuentes y comprobaciones previas
- Repositorio canónico `germaquintana/congresobarrial`: `AGENTS.md`, `estado_proyecto.json` y `00_SISTEMA/POLITICA_PRIVACIDAD.md`. Se detectó `run_lock.active=true` en trabajo de infografías; se respetó, sin alterar estado ni lock ni repositorio privado.
- Hoja fuente `DATOS` de `Matriz_Congreso_Barrial_fusionada` (ID `1KecTjqU4Kx5tJLNPl4Z5D1sxlgC05PxWHh5xwuI0jpQ`): **1.570** registros con coordenadas, **547** con `ubicacion` textual, **78** marcados `revisar_privacidad`; coordenadas ubicadas en el entorno geográfico de Recoleta. **No equivale a exactitud de punto ni a cotejo cartográfico**.
- Hoja `MAPAS_UV`: 59 enlaces candidatos UV+grupo, sin `confirmado_por_y_fecha` observado. No se acreditó coincidencia post-it individual ↔ cartografía original.
- Repositorio público existente: `index.html`, `tematicas.html`, `trazabilidad.html`, `README.md`, `docs/ARQUITECTURA_TRAZABILIDAD_V1.md`.

## Cambios
1. `trazabilidad.html`: mapa interactivo con marcadores por tipo y selección por ID, filtros existentes por temática/UV/grupo/subtema y búsqueda ampliada a texto de `ubicacion` (calle, número o esquina).
2. Plano local de coordenadas sin conexión por defecto; fondo OSM de calles únicamente tras consentimiento específico. Solicitudes OSM incluyen área/zoom de teselas, no CSV, texto, IDs ni datos de marcadores. Sin JavaScript externo.
3. Ficha de punto: ubicación escrita en DATOS, par de coordenadas referenciales y estado de cartografía propuesta; botón para localizar punto.
4. CSV de planificación ampliado con ubicación y coordenadas **no verificadas**; corrección de correspondencia 29 columnas/29 campos.
5. Enlaces desde dashboard general y temáticas. Documentación complementaria `docs/PROTOCOLO_CARTOGRAFIA_LOCAL_V1.md` y arquitectura V1.1.

## Controles y pruebas verificadas
- Sintaxis JavaScript de `index.html`, `tematicas.html`, `trazabilidad.html`: **OK** con motor JavaScript.
- Proyección Web Mercator y reproyección inversa: error numérico de prueba inferior a 2e-14 grados; soporte decimal con coma; valores vacíos y fuera de rango rechazados.
- Parser CSV probado con comas internas, comillas duplicadas y texto de varias líneas: **OK**.
- Cabecera y filas de exportación: 29/29 tras corrección.
- Revisión estática de código: sin `fetch`, sin `localStorage`/`sessionStorage`, sin JavaScript externo, consulta de teselas solo después de confirmación; marcadores con `revisar_privacidad` ocultos salvo habilitación explícita de doble control.
- Lecturas posteriores de archivos desde GitHub realizadas; el navegador de producción y la exactitud del punto de origen aún requieren contraste humano.

## Restricciones y pendiente
- El visor es código alojado en sitio público; los CSV **no** se publicaron ni incorporaron al repositorio, se seleccionan manualmente y se procesan en la memoria del navegador. No sustituye autenticación institucional.
- Los puntos son coordenadas de la matriz DATOS, NO las cartografías originales digitalizadas; no afirmar precisión exacta ni acreditar reporte de delito, domicilio tomado o asentamiento sin revisión.
- Próximo paso: probar en navegador con muestra de CSV autorizada, cotejar punto ↔ post-it ↔ cartografía física y desarrollar aplicación institucional autenticada con control de roles, fuentes privadas y gestión de plan de acción.
- Intervención humana: revisión de privacidad, correspondencia espacial, competencia de cada dirección y eventual aprobación de acciones.

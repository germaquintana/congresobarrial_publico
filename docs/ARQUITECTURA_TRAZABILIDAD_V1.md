# Arquitectura V1 — Observatorio de trazabilidad y planes de acción · Congreso Barrial

**Fecha:** 2026-11-11 · **Estado:** piloto de lectura local; sin publicación de textos originales.

## Objetivo
Pasar del resumen estadístico a un recorrido reproducible: **tema → UV → grupo → id_punto → descripción en DATOS → vínculo propuesto a cartografía → fuente original → evaluación institucional → plan de acción → evidencia de ejecución**.

## Evidencia y contrato de datos
Origen identificado en la matriz madre, hoja DATOS (`id_punto`, `uv`, `tipo`, `tema_principal`, `subtema`, `descripcion`, `grupo`, `origen_dato`, `aud_estado`, `revisar_privacidad`, `foto_ref`, `fecha_asamblea`, entre otros). La hoja MAPAS_UV aporta `uv`, `grupo_en_DATOS`, `clave_mapa`, `mapa_propuesto`, `estado`; no se observan validaciones consignadas en `confirmado_por_y_fecha` en el corte inspeccionado. Un mapeo `UV + grupo` es **candidato**, no georreferenciación o autoría original acreditada.

La descripción de DATOS es una **transcripción/digitalización registrada**, no necesariamente literal al post-it. Distinguir `texto_original_verificado` (solo si se cotejó), `descripcion_DATOS` y `sintesis_tecnica` (interpretación). Evitar atribuciones a una persona.

## Separación de superficies
1. **Dashboard público:** agregados por tema y UV; no microdatos, testimonio, fotografía ni enlace a texto sensible.
2. **Visor de lectura local [piloto](../trazabilidad.html):** código estático, carga explícita por persona autorizada, procesamiento solo en navegador, sin carga de archivos a servidor, exportación voluntaria y responsable.
3. **Aplicación institucional definitiva (pendiente):** inicio de sesión corporativo, verificación de rol por servidor, acceso autorizado a fuente, auditoría de consultas/descargas, clasificación y minimización, permisos por perfil, flujo de revisión. **No instalar un proxy público ni API que exponga la hoja original.**

## Navegación recomendada
- **A. Resumen comunal:** distribución territorial/temática, filtros y conteos.
- **B. Explorador de hallazgos:** filtros simultáneos por tema, tipo, UV, subtema, grupo, calidad y búsqueda.
- **C. Ficha individual:** ID estable, origen, texto DATOS, diferencia con literal original, grupo, cartografía propuesta/no conciliada, metadatos, privacidad y estado de revisión.
- **D. Bandeja de planificación:** tabla exportable por selección con responsabilidades propuestas, acciones, hitos, evidencias y validación humana.
- **E. Seguimiento:** vista futura agregada por dirección, estado, fecha oficial/interna y resultados observados; no inferir ejecución desde propuesta.

## Modelo relacional futuro (normalización)
- `registro(id_punto PK, uv_id, tipo, tema_id, subtema_id, descripcion_DATOS, privacidad_estado, aud_estado, version_fuente, source_locator)`
- `fuente(source_id PK, drive_id, tipo_documental, version, sha, localizador, clasificacion_privacidad)`
- `cartografia(carto_id PK, uv_id, jornada_id, source_id, estado_validacion)`
- `registro_cartografia(id_punto, carto_id, tipo_vinculo, evidencia, estado_revision)`: muchos-a-muchos cuando un contenido se verifica en más de una cartografía. Nunca inferir relación por un nombre parecido.
- `derivacion(id, id_punto, direccion, competencia, responsable, estado_validacion)`: múltiples direcciones por registro, no asignación automática por tema.
- `accion(id, id_punto, derivacion_id, propuesta, prioridad_fundamentada, plazo_tipo, fecha, responsable, estado, aprobacion)`
- `evidencia_accion(id, accion_id, url, tipo, fecha, verificacion)`

## Regla de privacidad / seguridad
La plataforma pública **no mostrará descripciones de DATOS**. El visor piloto no ofrece autenticación ni autorización verificable; la casilla es un compromiso de uso, no control de acceso. El usuario debe obtener CSV de Drive con sus permisos y decidir si puede consultarlo. Los registros con `revisar_privacidad=Sí` se ocultan por defecto; la ausencia de marca no implica aptitud de publicación. La exportación debe tratarse como documento interno, sujeto a acceso restringido y eventual anonimización.

## Indicadores interpretables
Distinguir número de **registros**, número de **cartografías distintas verificadas**, número de **UV**, número de **acciones asignadas**, número de **acciones ejecutadas**, y número de **resultados evaluados**. No usar los registros como votos o representatividad. No mezclar 872 CSV históricos con la matriz madre de 1.570 filas.

## Aceptación y fases
- **Fase 1 (este piloto):** navegación y filtros locales, ficha, vínculo a fila por índice del CSV, estado de cartografía y descarga de matriz de trabajo sin transmitir texto a GitHub. El índice de fila debe cotejarse nuevamente si el orden de la hoja cambia.
- **Fase 2:** cotejo humano del ID-post-it, validación UV/grupo/cartografía y clasificación de privacidad por registro; pruebas de unicidad y consistencia.
- **Fase 3:** aplicación con acceso corporativo real y registros de auditoría, sin exposición de microdatos en un repositorio o hosting público. Definir roles lector, analista, referente de dirección, revisor y administrador.
- **Fase 4:** derivación/aceptación por direcciones, plan de acción, fechas, verificación de cumplimiento, tableros de responsabilidad y exportaciones institucionales autorizadas.

**No alcanzado:** copia literal verificada de post-it, asociación definitiva a la cartografía original, publicación de microdatos o ejecución de acciones administrativas.

## Extensión V1.1 — exploración geográfica (11-11-2026)
- DATOS dispone de 1.570 pares `latitud/longitud` numéricos dentro del entorno de Recoleta; 547 filas contienen `ubicacion` escrita. La casi ausencia de coordenadas duplicadas **no prueba georreferenciación individual verificada**.
- Mapa interactivo en `trazabilidad.html` sobre CSV local sin transmitir microdatos; plano de coordenadas sin conexión por defecto. Tesoros cartográficos originales **no** están incorporados como imágenes públicas.
- Capa de calles con mosaicos OpenStreetMap activable únicamente mediante confirmación. El proveedor puede observar teselas/área/zoom solicitados; no se añaden IDs, descripciones, CSV, ni coordenadas individuales a la URL de las teselas. No se carga JavaScript externo.
- Búsqueda de calle, esquina o número exclusivamente cuando se dispone de `ubicacion` escrita; si no, solo coordenadas indicadas por DATOS, sujetas a cotejo.
- Cartografía UV-grupo en MAPAS_UV sigue vinculada como **propuesta**, nunca original verificado.
- Para reportes de viviendas, situaciones de calle, delincuencia o información que pueda identificar personas, acceso interno controlado, revisión de privacidad, proporcionalidad y auditoría; no generar capa pública de direcciones exactas.

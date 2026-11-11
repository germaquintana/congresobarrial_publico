# RUN — piloto de trazabilidad del Congreso Barrial

- Fecha/hora Chile: 2026-11-11 12:52:21; repositorio: `germaquintana/congresobarrial_publico` (`main`).
- Objetivo: evolucionar resultados por temática a una exploración por ID, UV, grupo/cartografía, descripción registrada y preparación de plan de acción.
- Lecturas: estado y AGENTS.md de `germaquintana/congresobarrial` (bloqueo activo ajeno a esta iniciativa; no intervenido); `FUENTE_MADRE_DATOS.md`; protocolo anti-alucinaciones y privacidad; metadatos/encabezados de DATOS y MAPAS_UV en Drive (solo lectura).
- Campos verificados: `id_punto`, `uv`, `tipo`, `tema_principal`, `subtema`, `descripcion`, `grupo`, `revisar_privacidad`, `aud_estado`, `origen_dato`, `foto_ref`, `fecha_asamblea`; en MAPAS_UV: `grupo_en_DATOS`, `mapa_propuesto`, `estado`, `clave_mapa`, `confirmado_por_y_fecha`.
- MAPAS_UV: 59 filas, 59 pares UV+grupo únicos en la lectura, 59 claves registradas, ninguna `confirmado_por_y_fecha` cumplimentada en el corte; enlace provisional, no cartografía verificada.
- Escrituras: `trazabilidad.html`, `docs/ARQUITECTURA_TRAZABILIDAD_V1.md`, `tematicas.html`, README y este RUN. No se tocó el repositorio canónico privado, la hoja DATOS, los documentos fuente, las infografías o las automatizaciones.
- Seguridad: página de código abierta, microdatos no embebidos, no descarga directa de la hoja privada, sin API de fuente en cliente, sin `fetch` y sin almacenamiento web. Importación de archivos mediante `File.text()`; datos solo en la memoria del navegador, exportación CSV local y voluntaria. Control de acceso institucional sigue pendiente.
- QA ejecutado: script Javascript del visor compiló sintácticamente; parser CSV probó valores entrecomillados, comas internas y saltos de línea; guardado/verificación por lectura de GitHub. Los agregados anteriores del dashboard permanecieron sin cambios.
- Limitaciones: sin autenticar usuarios, sin persistir gestiones, sin reproducir post-it gráfico ni determinar vínculo cartográfico verificado. Las filas exportadas son base de análisis interno, no órdenes de trabajo o actos aprobados.
- Verificación posterior pendiente: comprobar despliegue GitHub Pages y evaluación visual en navegador real con archivo autorizado.
- Próximo paso: cotejo de registros y mapas, evaluar privacidad por registro y diseñar acceso autenticado corporativo para direcciones y ciclo de planificación/seguimiento.

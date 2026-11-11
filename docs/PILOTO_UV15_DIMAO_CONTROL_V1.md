# Piloto DIMAO UV15 — guía de cotejo y preparación de medidas (V1)

**Fecha:** 11 de noviembre de 2026. **Estado:** insumo técnico pendiente de revisión de fuente; no constituye instrucción, aprobación ni apertura de expediente.

## Alcance
Se ha seleccionado la UV15 por los dos subtemas donde CAT_SUBTEMAS identifica a DIMAO como dirección líder referencial: «Aseo, residuos y salubridad» y «Áreas verdes y arbolado». El usuario confirmó preliminarmente que el criterio general de competencias es correcto, pero esta confirmación **no es una derivación formal de 10 casos ni ratifica cada medida propuesta**.

La hoja DATOS registra **10 ID distintos**, clasificados así:

| Subtema | Problemas | Oportunidades |
| --- | ---: | ---: |
| Aseo, residuos y salubridad | 3 | 3 |
| Áreas verdes y arbolado | 0 | 4 |
| **Total** | **3** | **7** |

## Calidad y cartografía: control realizado
- **Auditoría DATOS:** 5 registros CONSISTENTE, 5 REQUIERE RELECTURA. Ninguno de los diez fue etiquetado «Sin auditar» en el corte observado.
- **Ubicación escrita:** los diez tienen texto en el campo ubicacion, **sin verificación de dirección o esquina exacta**.
- **Grupo/cartografía:** tres grupos presentes; 7 registros tienen enlace *candidato* por combinación UV+grupo con MAPAS_UV, mientras tres no tienen esa correspondencia.
- **Confirmación humana en MAPAS_UV:** no se encontró fecha y persona confirmante para las cartografías de UV15.
- **Foto de referencia:** el campo foto_ref estaba vacío en las diez filas revisadas.
- **Privacidad:** ninguno marcado con revisar_privacidad en el campo observado; la ausencia de marca **no es autorización de publicación**.

Estos recuentos son agregados de QA. No se publican identificadores individuales ni descripciones o coordenadas.

## Secuencia de revisión humana

### Fase A — asegurar procedencia
Filtrar en la matriz madre la hoja DATOS por UV15, los dos subtemas señalados y tipo Problema u Oportunidad. Comprobar 10 filas con 10 ID distintos, registrar la versión/fecha de revisión en el expediente interno. No sumar registros históricos CSV que puedan duplicar la fuente.

### Fase B — relectura
Localizar las **cinco filas con aud_estado = REQUIERE RELECTURA**. Contrastar cada descripción con post-it, fotografía o acta original, conservando diferencias entre texto literal, transcripción y síntesis técnica. La revisión debe ser firmada/validada por quien tenga competencia; el dashboard no cambia aud_estado.

### Fase C — cartografía
Para cada ID verificar UV, grupo, hoja/cartografía original, localizador y referencia a la fuente. Revisar primero las siete coincidencias candidatas y resolver por separado las tres sin cruce UV+grupo. Ningún enlace propuesto debe convertirse automáticamente en «ubicación verificada». Conservar nombre de mapa, versión, fecha, revisor y estado del cotejo.

### Fase D — privacidad y pertinencia
Examinar textos, direcciones, menciones a viviendas, puntos específicos y personas. La apertura de fuentes con detalle debe realizarse en Drive/entorno institucional autorizado; no subir esos registros al GitHub público ni al dashboard agregado.

### Fase E — competencias y plan de acción preliminar
Separar la respuesta técnica de los conteos: para aseo/residuos, instrumento referencial «Operativo», con apoyos de Operaciones y organizaciones barriales; para áreas verdes/arbolado, instrumento referencial «Mantención», con posible apoyo SECPLA. Confirmar atribuciones, duplicados, viabilidad operativa, priorización fundamentada, recursos, plazo y vías de coordinación antes de iniciar acciones. La validación preliminar de las competencias no reemplaza este examen específico.

### Fase F — ficha por intersección territorial
Desde el [Panel DIMAO](../dimao.html?corte=entrega01&rol=lead&uv=15), seleccionar el subtema y usar «Descargar ficha» en la tabla UV-subtema. El CSV solo incluye el grupo y campos *vacíos* para ID, cartografía validada, revisión de privacidad, acción, responsable, fecha y aprobación. Completar esos campos **fuera del portal público**, con datos autorizados. No se crea ninguna tarea institucional por descargarlo.

## Criterios para pasar a formulación de medidas
- Cada registro de los diez posee ID único, fuente original localizada, revisión de privacidad y estado explícito de auditoría.
- Las cinco relecturas se revisaron o tienen bloqueo documentado; ninguna se declara cerrada por deducción.
- Cada vínculo con cartografía original se verificó, o se marcó «por localizar» sin inventarlo.
- Competencia real y modalidad de respuesta confirmadas con la unidad correspondiente.
- La propuesta indica alcance técnico, recursos, prioridad justificada, plazo y responsable **solo si hubo validación humana**.
- Las medidas se registran en el sistema institucional pertinente únicamente con autorización y no en GitHub Pages.

**Punto de reanudación:** abrir DATOS en Google Drive, aplicar filtro UV15 y aud_estado REQUIERE RELECTURA en los dos subtemas; no se publican aquí esos ID.

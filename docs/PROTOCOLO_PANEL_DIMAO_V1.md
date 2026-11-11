# Protocolo V1 — Panel sectorial DIMAO

**Fecha:** 11 de noviembre de 2026. **Estado:** lectura analítica agregada; no se asignan tareas ni se aprueban planes.

## Objetivo
Publicar en la [portada](../index.html) un botón «Abrir Panel DIMAO» que lleve al [dashboard sectorial](../dimao.html). La vista cruza problemas y oportunidades por subtema, UV y relación documental con DIMAO.

## Base para identificar asuntos de DIMAO
La [taxonomía CAT_SUBTEMAS](../taxonomia-subtemas.json) de la matriz madre incluye la dirección líder de referencia y apoyos habituales. Se incluyen únicamente cinco subtemas:

**DIMAO como dirección líder referencial (2):**
- Aseo, residuos y salubridad.
- Áreas verdes y arbolado.

**DIMAO como apoyo habitual (3):**
- Bienestar animal: líder referencial Higiene Ambiental.
- Iluminación: líder referencial SECPLA.
- Espacio público y equipamiento: líder referencial SECPLA.

Los roles son clasificaciones de la matriz, no asignaciones administrativas. Un subtema se incluye solo si el valor líder es DIMAO o si DIMAO aparece como componente separado en apoyos habituales. La unión de los cinco subtemas no duplica registros.

## Cifras de referencia

| Corte | Relación | Problemas | Oportunidades | Actores | Lugares |
|---|---|---:|---:|---:|---:|
| Entrega 01 (15 UV) | Líder y apoyo | 176 | 100 | 28 | 94 |
| Entrega 01 (15 UV) | Líder referencial | 101 | 39 | 2 | 18 |
| Entrega 01 (15 UV) | Apoyo | 75 | 61 | 26 | 76 |
| Matriz completa (25 etiquetas UV) | Ambos | 307 | 172 | 43 | 160 |

El total de la Entrega 01 es 872 registros de cuatro tipos; la matriz completa tiene 1.570. Los registros DIMAO son un subconjunto y sus conteos no deben sumarse dos veces al total.

## Componentes del panel
- Filtros por corte de datos, rol de DIMAO, foco en problemas u oportunidades, UV y subtema.
- KPI de problemas, oportunidades, contexto, UV y subtemas. Actores y lugares se presentan separados de las necesidades y propuestas.
- Barras apiladas por rol, subtema y UV; su extensión expresa frecuencia de menciones, no prioridad.
- Mapa de calor UV × subtema con selección interactiva; colores representan conteos, no intensidad o causalidad.
- Tarjetas con dirección líder, apoyos e instrumentos orientativos.
- Piloto UV15 y enlaces hacia el visor local de registros.
- Exportación CSV de cartera preliminar con campos de decisión humana vacíos: unidad competente, fuente, cartografía, responsable, medida, recursos, prioridad, fechas, autorizaciones y seguimiento.
- Secciones con ayudas explicativas sobre fuente, alcance y cautelas.

## Piloto UV15
En los subtemas con liderazgo referencial DIMAO: «Aseo, residuos y salubridad» contiene 3 problemas y 3 oportunidades. «Áreas verdes y arbolado» contiene 4 oportunidades. Estas cifras vienen de DATOS agregados; todavía hay que comprobar por ID la descripción, el post-it original, la cartografía, la fecha de cotejo y su privacidad. La implementación ofrece filtros y enlaces, no certifica la verificación física de las cartografías.

## Seguridad y gobernanza
El portal público solo consulta [datos agregados](../datos-agregados.json) y taxonomía no personal. No incluye textos originales, nombres privados, fotos, direcciones ni coordenadas. Para examinar puntos específicos, el [visor de trazabilidad](../trazabilidad.html) exige cargar CSV autorizado en el navegador. La operación institucional futura requerirá autenticación, control de roles y auditoría. Un registro comunitario no acredita un delito ni una situación habitacional concreta.

En las celdas UV-subtema y en el CSV se suprimen valores positivos inferiores a tres. Este control no implica anonimización integral. La etiqueta UV20 continúa pendiente de conciliación territorial.

## Criterios de aceptación
1. Confirmar cinco subtemas DIMAO sin duplicaciones y dos roles diferenciados.
2. Reconciliar 176 problemas y 100 oportunidades en la Entrega 01, y 307 problemas y 172 oportunidades en matriz completa.
3. Comprobar filtros conectados, piloto UV15, mapas de calor, botones a evidencia y exportación con igual cantidad de encabezados y campos.
4. No crear tareas, aprobar acciones ni modificar la matriz privada o los expedientes en Drive.
5. Comprobar el SHA de GitHub tras escrituras y el despliegue en Pages; pendiente revisión visual en navegador real.

**Próxima fase:** cotejo humano de post-it/cartografía en UV15; validación de competencias y diseño de un procedimiento institucional autenticado para planes de acción.


## Extensión V1.1: validación preliminar, perfiles territoriales y QA (11-11-2026)

El usuario confirmó preliminarmente que el criterio de competencias DIMAO (referencia versus apoyo) corresponde al trabajo de la unidad. Este antecedente respalda el enfoque analítico, **no** implica ratificación formal, designación de responsables, aceptación de derivaciones ni prioridad de gestión.

### Nueva clasificación de grupos UV × subtema

Se distingue entre grupos donde DATOS contiene **problema y oportunidad**, **problema sin oportunidad registrada en ese mismo cruce**, y **oportunidad sin problema registrado**. Una coincidencia de UV/subtema no demuestra que los post-it tengan la misma causa, lugar o autor. Los filtros interactivos permiten contrastar los grupos sin crear casos oficiales.

En las 15 UV de Entrega 01, los cinco subtemas DIMAO presentan 34 intersecciones UV-subtema con ambos tipos, 24 solo con problemas y 9 solo con oportunidades (67 intersecciones con registros relevantes). El modo de enfoque y los demás filtros pueden modificar estos conteos.

### Diagrama de dispersión

Cada círculo representa una UV; coordenada horizontal = número de registros Problema y vertical = registros Oportunidad en los grupos que cumplen los filtros. Un círculo más grande significa mayor volumen conjunto, **no urgencia, prevalencia, prioridad o capacidad de respuesta**. La selección del círculo filtra la UV; se mantiene lectura equivalente a través de las barras y la tabla.

### Auditoría de calidad agregada

Se añadió [dimao-calidad-agregada.json](../dimao-calidad-agregada.json), derivado de DATOS con lectura de los campos uv, tipo, subtema y aud_estado. Solo contiene resúmenes por corte y rol DIMAO para tipos Problema/Oportunidad; no incluye textos, ID, coordenadas ni direcciones.

| Corte/rol | Total P+O | CONSISTENTE | REQUIERE RELECTURA | SIN AUDITAR |
| --- | ---: | ---: | ---: | ---: |
| Entrega 01, ambos roles | 276 | 182 | 7 | 87 |
| Entrega 01, dirección de referencia | 140 | 92 | 5 | 43 |
| Entrega 01, apoyo | 136 | 90 | 2 | 44 |
| Matriz completa, ambos roles | 479 | 380 | 12 | 87 |

Si el usuario filtra UV, subtema, enfoque o patrón, esta tabla de calidad **no representa esa selección particular**. El panel lo advierte explícitamente; no se publican cruzamientos finos de estados de auditoría por ID o ubicación. CONSISTENTE es una categoría de control de matriz, no confirmación cartográfica ni permiso para difundir información personal.

### Ficha territorial por cruce

La tabla UV-subtema ofrece botón «Descargar ficha» para exportar un solo grupo analítico a un CSV, además de la exportación global. Cada fila incluye perfil del grupo y constancia de confirmación preliminar del criterio de competencias. Los campos para cotejar ID, cartografía, privacidad, competencia, acción, responsable, fechas, recursos, prioridades y aprobación siguen vacíos. Descargar **no crea tarea, expediente ni documento aprobado**.

Se creó una [guía de cotejo UV15](PILOTO_UV15_DIMAO_CONTROL_V1.md) para revisar los diez registros del piloto, de los cuales cinco requieren relectura; el enlace UV+grupo con MAPAS_UV es candidato, no validación del mapa original.

**Riesgo de publicación:** GitHub Pages ha informado ejecuciones de Actions con startup_failure en la misma fecha; verificar la última ejecución antes de afirmar que la versión es visible en la web. El estado en GitHub main y la publicación efectiva no son equivalentes.

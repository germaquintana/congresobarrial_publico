# Metodología V1 — Explorador multidimensional del Congreso Barrial

**Corte fuente:** 2026-11-09 (datos agregados) · **Versión de visualización:** 2026-11-11 · **Estado:** análisis descriptivo preliminar, no aprobación institucional.

## Propósito
Permitir la exploración y comparación cuantitativa de **7 temáticas × 15 subtemas × 4 dimensiones operativas × UV**, vinculando cruces relevantes con el visor interno de registros y un mapeo referencial de direcciones municipales, sin publicar testimonios, textos individuales ni coordenadas.

## Distinción indispensable entre dimensiones y atributos
El modelo del informe contiene dimensiones documentales B01–B10. Estas **no son diez campos excluyentes** asignados a cada registro. Para cruces estadísticos, las siguientes cuatro se corresponden con el campo \`tipo\` de la matriz DATOS:

| Dimensión editorial | Tipo de registro | Unidad que se cuenta |
| --- | --- | --- |
| B03 Problemas reportados | \`Problema\` | Filas clasificadas como problema |
| B05 Propuestas y oportunidades | \`Oportunidad\` | Filas clasificadas como oportunidad |
| B06 Actores mencionados | \`Actor\` | Filas clasificadas como actor |
| B07 Lugares relevantes | \`Lugar importante\` | Filas clasificadas como lugar |

B01 Jornada, B02 Instrumentos, B04 Cartografía, B08 Aportes por mesa, B09 Temas transversales y B10 Fuentes y seguimiento describen **otros niveles de contexto, evidencia o síntesis**. No corresponde producir un conteo B01–B10 como si fueran clases paralelas de post-it. En particular, B04 no equivale a la cantidad de puntos cartografiados.

Los ejes legítimos de análisis por registro son \`uv\`, \`tipo\`, \`tema_principal\`, \`subtema\`, y de forma controlada \`grupo\`, \`ubicacion\`, auditoría y privacidad. No inferir simultaneidad de temas en un mismo post-it: cada punto tiene un tema principal; una misma UV puede contener varios temas, pero eso es **copresencia territorial**, no coocurrencia en una sola mención.

## Fuentes
- **[Matriz madre](https://docs.google.com/spreadsheets/d/1KecTjqU4Kx5tJLNPl4Z5D1sxlgC05PxWHh5xwuI0jpQ/edit)**, hoja DATOS, de solo lectura para el portal: identificadores y atributos del punto.
- **[Datos agregados publicados](../datos-agregados.json)**: total por UV; total por temática; desgloses \`por_tipo[tipo].temas\` y \`por_tipo[tipo].subtemas\`. Sin textos de vecinos.
- **[Taxonomía publicada](../taxonomia-subtemas.json)**: 15 parejas \`tema_principal/subtema\` tomadas de CAT_SUBTEMAS, columnas A–F; también conserva \`direccion_lider_referencial\`, \`apoyo_habitual\`, \`modalidad_gestion\` e \`instrumento_respuesta\`, entendidos como categorías orientativas, no actos ni asignaciones de gestión.

**Reconciliación comprobada:** 15 subtemas distintos con clasificación temática única, 0 categorías sin correspondencia y 0 diferencias en los 25 × 4 desgloses disponibles respecto de \`tema_principal\`; suma total 1.570 registros. Universo Entrega 01: 15 UV y 872 registros. El conjunto completo mantiene 25 etiquetas UV y 1.570 registros; UV20 (3 filas) requiere conciliación territorial y no representa necesariamente una jornada adicional.

## Cálculos y denominadores
1. **Temática × dimensión**: sumar \`por_tipo[tipo].temas[tema]\` en las UV filtradas. La suma de cuatro tipos para una temática es su total.
2. **UV × temática**: contar \`uv.temas[tema]\` o, al elegir dimensión, \`por_tipo[tipo].temas[tema]\`.
3. **Subtema**: asociar de forma inequívoca cada \`por_tipo[tipo].subtemas[subtema]\` con \`tema_principal\` mediante CAT_SUBTEMAS, agregando por UV y dimensión. No adjudicar subtemas por similitud de nombre o generación automática.
4. **Diagrama de flujo**: \`temática → tipo\` ponderado por el número de menciones de cada intersección. No hay flujos reales de derivación, ejecución ni movilidad; es una representación de la clasificación.
5. **Dirección orientativa**: cada subtema se asocia al valor \`direccion_lider\` en CAT_SUBTEMAS; se suma la frecuencia de menciones de los subtemas correspondientes. Este indicador **no** es una carga formal de trabajo, derivación aprobada ni obligación de la dirección.
6. **Modo porcentajes en matriz temática × dimensión**: \`n(tema, tipo) / n(tema, todos los tipos)\`. Denominador = menciones de la temática en UV filtradas.
7. **Modo porcentajes UV × temática**: \`n(UV, tema, tipo seleccionado) / n(UV, tipo seleccionado)\`. Con todas las dimensiones, el denominador = total de la UV.
8. **Participación del cruce en el subtotal seleccionado**: \`n(UV, tema, tipo) / suma(n de los cruces que satisfacen los filtros)\`. Distinto de la participación dentro de la UV; no intercambiar denominadores.

La matriz temática y el diagrama de flujo mantienen la vista comparativa del universo elegido; los filtros seleccionados resaltan celdas/flujos, mientras UV y subtema afectan los desgloses señalados. La matriz UV × temática conserva el contexto de las restantes UV y resalta la seleccionada. La tabla final aplica todos los filtros para permitir consulta contextualizada.

## Controles de interpretación
- Todos los números representan **registros de la matriz**, no participantes ni votos; la frecuencia no constituye urgencia, prioridad ni diagnóstico acreditado.
- No confundir problemas con lugares ni sumar subtemas al total de temas nuevamente.
- Las diferencias entre UV pueden reflejar distinta intensidad de levantamiento; normalizar sobre el total de cada UV antes de comparar proporciones.
- La dirección de referencia proviene de una hoja de clasificación. La competencia final y planes de acción deben validarse con las unidades responsables y autoridades pertinentes.
- Una misma temática puede distribuirse entre numerosas UV. No extrapolar los conteos a población comunal o incidencia general.
- El portal solo utiliza agregados publicados y taxonomía no personal; para textos, grupo, cartografía y ubicaciones se utiliza [visor de lectura local](../trazabilidad.html) con CSV que la persona autorizada carga en su navegador.
- Las desagregaciones pequeñas pueden plantear riesgos de reidentificación; en visuales/subtemas de una sola UV se representa \`<3\` cuando corresponda. La salida CSV suprime celdas de subtema inferiores a 3. Esta presentación no sustituye revisión integral de privacidad del conjunto público ya existente.

## Controles de calidad y aceptación
- 25 UV y 1.570 registros en matriz completa; 15 UV y 872 registros en Entrega 01.
- 7 temáticas, 15 subtemas, 4 tipos; sumas coherentes con datos agregados y taxonomía.
- Los conteos por temática × dimensión deben sumar el total de cada temática.
- Los conteos por UV × temática deben sumar el total de cada UV para el tipo elegido.
- El diagrama de flujos debe reproducir las mismas cifras de la matriz temática.
- Click en una celda de dimensiones → filtra temática + tipo; click en UV×tema → selecciona UV + temática; click en subtema → selecciona tema + subtema.
- Tabla de cruces → visor \`trazabilidad.html\` con parámetros \`tema\`, \`uv\`, \`tipo\`, \`subtema\` y \`corte\`; el visor solo muestra contenido individual tras una carga explícita y autorizada.
- JS sintácticamente válido; comprobación programática de los conteos de fuente; no incluir microdatos, texto, ubicaciones ni identificadores de personas en la página.
- Verificación visual y accesibilidad en navegador real siguen pendientes de revisión humana.

## Próximas fases
1. Probar con las direcciones una secuencia de decisiones: categoría → UV → subtema → evidencia → pregunta de gestión.
2. Revisar nombres y validez de áreas referentes; distinguir competencia primaria, apoyo, coordinación externa y capacidad real de respuesta.
3. Integrar cartografía original verificada, fuente con localizador, fecha de revisión y registro documental, en una aplicación institucional autenticada y autorizada.
4. Agregar matriz real de acciones (pendiente, en revisión, priorizado, ejecutado y validado), diferenciando propuestas de comunidad, evaluación técnica y compromisos formales.

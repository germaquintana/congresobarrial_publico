# Congreso Barrial Recoleta — portal territorial público

**Sitio web:** https://germaquintana.github.io/congresobarrial_publico/

## Fuente principal y corte
Desde el 9 de noviembre de 2026, el origen principal de los registros de resultados es la hoja **DATOS** de la matriz `Matriz_Congreso_Barrial_fusionada` (spreadsheet ID `1KecTjqU4Kx5tJLNPl4Z5D1sxlgC05PxWHh5xwuI0jpQ`). Rango leído: `DATOS!A1:AF1571`.

- 1.570 registros con ID y sin duplicados observados.
- 788 problemas, 299 oportunidades, 278 lugares importantes y 205 actores.
- 25 etiquetas UV en la matriz, pero el inventario de fuentes tiene 24 carpetas UV. **UV20 tiene tres registros por conciliar**.
- Auditoría fuente: 1.215 CONSISTENTE, 45 REQUIERE RELECTURA y 310 Sin auditar.
- 78 registros marcados para revisión de privacidad; los 1.492 restantes no implican permiso de difusión.

Los CSV históricos con 872 filas **no son el origen numérico principal** y no se suman a la matriz.

## Dashboard

- `index.html` — dashboard general y fichas por UV; admite enlaces `?uv=25`.
- `datos-agregados.json` — totales por tipo, tema, UV y subtema derivados de DATOS.
- `resultados-territoriales.json` — diez dimensiones B01–B10 por UV y categorías de la hoja madre; material cualitativo complementario del proyecto permanece identificado como preliminar.

## Limitaciones
Los registros son aportes documentales, no personas, votos, mediciones representativas ni acuerdos aprobados. Se excluyeron descripciones individuales de filas, RUT, firmas, fotografías, teléfonos, correos, ubicaciones precisas y coordenadas. La revisión institucional de contenido y privacidad sigue pendiente. La etiqueta CONSISTENTE pertenece al proceso de auditoría de la hoja, **no certifica que un resultado sea publicable ni exacto en terreno**.

La hoja original es de solo lectura para la sincronización. No se activa la publicación automática de las filas sin revisión.

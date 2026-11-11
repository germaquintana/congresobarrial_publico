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


## Exploración temática — interfaz 11-11-2026

- [Dashboard general](index.html): gráfico de torta de las siete temáticas y comparación UV mediante barras apiladas por temas.
- [Detalle por temática](tematicas.html): navegación entre los siete temas, comparación UV y desglose por tipo (Problema, Oportunidad, Lugar importante, Actor), preservando los filtros Entrega 01 / matriz completa.
- La página `tematicas.html` reutiliza `datos-agregados.json`; no agrega microdatos, nombres, testimonios ni distribuciones inferidas de subtemas. Las categorías y cifras siguen siendo preliminares. Para filtrar directamente una categoría, usar `tematicas.html?corte=entrega01&tema=Infraestructura%20y%20espacio%20p%C3%BAblico`.

## Observatorio de trazabilidad — piloto de lectura local

- [Explorador de evidencia territorial](trazabilidad.html): lectura local de CSV autorizados, filtros por tema/UV/tipo/grupo/subtema, ficha de punto con descripción de DATOS, vínculo propuesto desde MAPAS_UV y descarga de plantilla para planes de acción.
- [Arquitectura y gobierno del dato](docs/ARQUITECTURA_TRAZABILIDAD_V1.md): separación de superficie pública y aplicación institucional, trazabilidad, privacidad, roles y fases siguientes.
- **Importante:** el código es público, pero los textos individuales no están alojados aquí. Requiere cargar archivos CSV autorizados desde el dispositivo del usuario; no utiliza `fetch`, almacenamiento web ni APIs externas para acceder a microdatos. Un checkbox no es autenticación corporativa.
- Las relaciones UV-grupo/cartografía de MAPAS_UV **no están acreditadas como vínculos definitivos**, ni las descripciones de DATOS como texto literal verificado del post-it. No usar la exportación como decisión de competencia o plan oficialmente aprobado.

## Limitaciones
Los registros son aportes documentales, no personas, votos, mediciones representativas ni acuerdos aprobados. Se excluyeron descripciones individuales de filas, RUT, firmas, fotografías, teléfonos, correos, ubicaciones precisas y coordenadas. La revisión institucional de contenido y privacidad sigue pendiente. La etiqueta CONSISTENTE pertenece al proceso de auditoría de la hoja, **no certifica que un resultado sea publicable ni exacto en terreno**.

La hoja original es de solo lectura para la sincronización. No se activa la publicación automática de las filas sin revisión.

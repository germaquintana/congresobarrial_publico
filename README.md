# Congreso Barrial Recoleta — portal de resultados territoriales

**Portal:** https://germaquintana.github.io/congresobarrial_publico/

## Qué permite consultar

- Navegación por las 24 unidades vecinales inventariadas.
- Diez dimensiones (B01–B10) para cada UV.
- Cantidad de archivos indexados por UV y segmentos codificados en una muestra.
- Para 15 UV, número de registros clasificados como problemas, oportunidades, lugares y actores en CSV históricos.
- Temáticas generales deducidas mediante reglas sobre síntesis preliminares, sin textos individuales.

## Fuente y advertencia obligatoria

El archivo `datos-agregados.json` tiene como origen versiones internas de `germaquintana/congresobarrial`, con corte 9 de noviembre de 2026. Los 15 CSV del corte fueron marcados obsoletos: **872 filas son históricas, no datos certificados vigentes**. El inventario comprende 416 archivos, 357 en las carpetas de UV y 59 fuera. La matriz fusionada tiene 1.567 IDs únicos y no debe sumarse al corte CSV por posible solapamiento.

Las temáticas son clasificaciones automáticas de síntesis preliminares. No representan votos, prevalencia, hechos constatados, compromisos municipales o acuerdos aprobados. Los valores ausentes no se interpretan como cero.

**No se publica material fuente sensible:** nombres y contactos de asistentes, RUT, domicilios privados, fotografías, videos, testimonios atribuibles, enlaces internos de Drive y copias de documentos originales. La revisión institucional de exactitud, privacidad y autorización de contenido territorial sigue pendiente.

## Archivos

- `index.html`: página estática HTML/CSS/JavaScript, adaptable a móviles.
- `datos-agregados.json`: lista blanca de datos agregados no identificables.

## Control editorial

Los contenidos se limitan a indicadores documentales históricos y temas generales. No copiar automáticamente archivos, testimonios ni estructuras internas completas desde el repositorio privado. Cualquier publicación de hallazgos específicos requiere cotejo de fuentes y aprobación competente.

**Estado técnico:** configuración Pages seleccionada por el usuario en `main / (root)`. La publicación efectiva debe comprobarse en Actions y mediante prueba de la URL.

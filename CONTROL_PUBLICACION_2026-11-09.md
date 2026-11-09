# RUN de publicación de resultados — 2026-11-09

## Objetivo
Corregir el portal público que mostraba contenidos genéricos y permitir navegar por resultados territoriales procesados para las 24 unidades vecinales y las dimensiones B01–B10.

## Fuentes consultadas
Repositorio especializado privado `germaquintana/congresobarrial`, rama `main`:
- `dashboard/data/RESUMEN_DEVOLUCION_24UV.json` (blob SHA `fd9829d80b16c9ab3202f332ea5b87d1f3759251`).
- `dashboard/data/indice_contenidos_uv.json` (blob SHA `7e723e3f84157f0482e2dd15485c21d644dd23c4`).
- `docs/indicadores.json` (inventario histórico).
- `00_SISTEMA/POLITICA_PRIVACIDAD.md`, `AGENTS.md` y `dashboard/METODOLOGIA_DEVOLUCION.md`.

## Cambios ejecutados
- Publicado `resultados-territoriales.json` con diez dimensiones por cada una de las 24 UV. Se excluyen referencias a archivos nominativos, enlaces a Drive e IDs privados.
- Revisado `index.html`: panel general con ejemplos reales de síntesis, comparación y enlaces directos `?uv=XX`, además de navegación B01–B10 en cada ficha.
- Control de duplicados B03/B05 en cada UV.
- Se conserva `datos-agregados.json` con los totales históricos, sin sumar los CSV a la matriz fusionada.

## Verificaciones
- 24 UV y diez dimensiones por UV: verificadas por lectura de JSON.
- 19 UV cuentan con descripciones procesadas para B03 y B05; cinco no acreditan contenido temático suficiente en el corte.
- Los 872 registros CSV son históricos, no un catastro vigente.
- No se realizó cotejo sustantivo de originales ni revisión institucional de privacidad de cada relato en esta ejecución; los datos publicados se presentan como **síntesis preliminares no validadas**.
- El despliegue de GitHub Pages debe verificarse contra el commit final: no inferir éxito de la mera escritura en `main`.

## Pendiente humano
Revisión de privacidad y exactitud del contenido público y aprobación institucional de cualquier presentación como resultado definitivo. Resolver contradicciones documentales y completar la lectura de UV7, UV9, UV10, UV11 y UV12. No inferir ausencia de aportes por falta de extracción.

## Continuidad
No se modificaron `estado_proyecto.json`, `next_action` ni el bloqueo operativo del repositorio privado. Este RUN corresponde exclusivamente a los archivos del repositorio público.

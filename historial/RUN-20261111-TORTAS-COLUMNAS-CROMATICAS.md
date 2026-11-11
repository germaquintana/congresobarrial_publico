# RUN — Recuperación de tortas y columnas apiladas cromáticas en presentación

**Fecha/hora Chile:** 2026-11-11 19:07:35 (America/Santiago).  
**Repositorio:** `germaquintana/congresobarrial_publico`, rama `main`.  
**Resultado:** implementación y pruebas de la visualización recuperada.  
**Alcance:** presentación ejecutiva y documentación. No se modificaron DATOS, matriz madre, repositorio privado, permisos Drive ni actuaciones institucionales.

## Solicitud
Recuperar de la versión anterior del Congreso Barrial las **gráficas de torta** y las **columnas apiladas por colores** en la nueva versión de tres capas.

## Fuentes y criterios
- `index.html`: paleta cromática original de siete temáticas y orden editorial; visual previa de torta y barras apiladas por UV.
- `presentacion.html` y `presentacion.js`: nueva vista de comuna, UV y direcciones, previamente validada.
- `datos-agregados.json`: datos agregados por UV, temática, tipo y subtema; matriz completa de 1.570 registros y entrega de 15 UV/872 registros.
- `taxonomia-subtemas.json`: 15 subtemas y direcciones de referencia / apoyos habituales.
- No se consultaron ni publicaron microdatos. Los valores de los gráficos representan menciones clasificadas, nunca votos, incidencia real o prioridades oficiales.

## Cambios
1. `presentacion.html`: torta temática y torta de tipos en capa comunal, torta temática en capa UV, columna apilada de temáticas por UV, columnas apiladas rojo/verde por UV dentro de la perspectiva municipal. Leyendas textuales, estados vacíos y enlaces navegables. Los gráficos de barras anteriores se conservan como alternativa desplegable.
2. `presentacion.js`: paleta fija heredada del dashboard anterior; generación de tortas proporcionales mediante CSS conic-gradient y leyenda con conteos y porcentajes; columnas apiladas con altura relativa a un máximo común, segmentos cromáticos navegables; recálculo de todas las vistas al cambiar corte, UV, dirección o rol.
3. `README.md` y `docs/GUIA_PRESENTACION_TRES_CAPAS_V1.md`: metodología editorial, colores, cautelas y pruebas de regresión.

## Pruebas verificadas
- Código JavaScript sintácticamente válido; CSS/HTML con identificadores únicos; lectura posterior de archivos GitHub main.
- Entrega 01: torta temática suma 872 registros, 7 entradas de leyenda, torta por tipo de cuatro entradas, 15 columnas UV y 96 segmentos temáticos positivos. Paleta exacta de siete temáticas contra `index.html`.
- UV15: torta temática de seis entradas y 42 registros, tres grupos; enlaza a cruce por temática y UV.
- DIMAO, entrega 01: 15 columnas sectoriales, 176 problemas y 100 oportunidades; filtros referencia (101/39) y apoyo (75/61) preservados desde la implementación anterior.
- Matriz completa: 25 columnas UV y 1.570 registros; DIMAO 307 problemas / 172 oportunidades.
- Títulos, descripciones, leyendas y enlaces reflejan **frecuencias documentales**, no ponderación por población o atribución administrativa; no se publicaron nombres, descripciones individuales ni ubicaciones.

## Pendientes y riesgos
- Confirmar un despliegue GitHub Pages exitoso asociado a la última escritura y efectuar revisión visual real (navegadores móvil y escritorio, impresión).
- Aplicación de consulta interna autenticada Apps Script, preparada en `interno-appsscript`, sigue pendiente de despliegue autorizado y pruebas con cuentas institucionales reales.
- La asociación grupo/cartografía original y revisión de privacidad permanecen sujetas a cotejo documental. No modificar el estado de publicación del repositorio canónico privado.
- **Reanudación:** abrir `presentacion.html?corte=entrega01`, revisar tortas y columnas en las tres pestañas, verificar corte `todo` y, si corresponde, realizar ajustes visuales tras revisión del usuario.

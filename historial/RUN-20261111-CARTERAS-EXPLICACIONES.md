# RUN — Carteras por dirección y ayudas contextuales del dashboard

**Fecha/hora Chile:** 2026-11-11 14:18:16 (America/Santiago).  
**Repositorio especializado:** germaquintana/congresobarrial_publico, rama main.  
**Estado:** cambios guardados y verificados en GitHub; publicación GitHub Pages comprobada en ejecución previa; verificación visual manual pendiente.

## Encargo y criterio aplicado
Preparar carteras explorables de problemas y oportunidades por dirección de referencia, UV, temática y subtema, con enlaces a los cruces y al visor de evidencia; explicar qué representa cada indicador y gráfico desde la portada del dashboard. No tratar los datos como planes aprobados ni trasladar microdatos al sitio público.

## Fuentes leídas
- DATOS, matriz madre Matriz_Congreso_Barrial_fusionada, mediante datos-agregados.json (corte 09-11-2026).
- CAT_SUBTEMAS A:F, mediante taxonomia-subtemas.json: 15 subtemas, siete direcciones de referencia, apoyos, instrumentos y modalidades orientativas.
- Código vigente de index.html, tematicas.html, cruces.html, trazabilidad.html, README y metodología de cruces.
- No se modificó el repositorio privado del Congreso Barrial, la hoja fuente de Drive, las infografías, la programación de tareas ni locks ajenos.

## Productos guardados
1. Nueva carteras.html con filtros corte/dirección/tema/UV/subtema/enfoque, indicadores, comparación por dirección, por temática y territorio, tarjetas de subtema, matriz de grupos UV×subtema, ayuda desplegable en ocho secciones y ciclo de acción propuesto.
2. Nueva carteras.js, datos desde agregados públicos; validación de esquema al cargar; navegación hacia cruces y visor de evidencia; exportación de 23 columnas con decisiones y plazos vacíos.
3. Portada index.html actualizada con navegación inicial de cuatro niveles; entrada directa a carteras y ayudas de seis secciones principales.
4. Tematicas.html, cruces.html y trazabilidad.html con accesos conectados y ayudas en ocho, ocho y seis secciones respectivamente. Las ayudas son elementos desplegables accesibles fuera de encabezados.
5. Documentación docs/PROTOCOLO_CARTERAS_ACCION_V1.md y README actualizados. No se añadieron direcciones privadas ni textos de post-it al portal.

## Controles y pruebas
- Tipos reconciliados en fuente de 25 etiquetas UV: 788 problemas, 299 oportunidades, 205 actores y 278 lugares (1.570 registros).
- Corte Entrega 01 de 15 UV: 872 registros; la cartera muestra 436 problemas, 174 oportunidades, 101 actores y 161 lugares.
- Verificación de taxonomía: 15 subtemas y siete direcciones referenciales, sin diferencias de conteos por tipo/UV al comparar la taxonomía y el agregado.
- Prueba de filtros acotados: UV15, Aseo y medio ambiente, dirección DIMAO = 3 problemas, 7 oportunidades, 1 actor y 1 lugar de contexto en dos subtemas.
- Sintaxis JavaScript validada en cinco módulos: index.html, tematicas.html, cruces.html, trazabilidad.html y carteras.js.
- 6+8+8+8+6 ayudas desplegables en cinco páginas; enlaces de carteras verificados en portada, temáticas, cruces y visor.
- Exportación comprobada: 23 encabezados / 23 campos. Se suprimen números pequeños (menores a tres) en tarjetas, filas UV-subtema y exportaciones; protección parcial, no anonimización certificada.
- El CSV mantiene estado SOLO_ANALISIS_SIN_ASIGNACION; campos para competencia, evidencia, intervención, responsable, prioridad, recursos, fechas y aprobación vacíos.
- La inspección visual mediante herramienta web no pudo abrir GitHub Pages; el estado de despliegue se verifica por ejecuciones de GitHub Actions. Navegador real y accesibilidad final pendientes.

## Cautelas e intervención humana
- Clasificación de dirección e instrumento según CAT_SUBTEMAS = criterio de análisis, no competencia validada ni asignación administrativa.
- Frecuencia de menciones != cantidad de vecinos, representatividad, urgencia, presupuesto o hechos comprobados.
- No publicar ni derivar datos identificables sin evaluación de privacidad, fuentes originales y atribuciones competentes.
- Antes de usar para plan formal: cotejar post-it/cartografía, validar atribución, determinar medidas, priorizar, autorizar, fijar plazos y registrar evidencia en sistema institucional.

## Próximo paso
Probar recorrido de portada → carteras → UV/subtema → ficha de evidencia con CSV autorizado; revisar experiencia móvil y pertinencia por la primera dirección que analice una cartera; priorizar integración autenticada para planes de acción reales sin usar GitHub Pages como repositorio de expedientes.

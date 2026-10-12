# Plantilla del flyer

## Maestro y capas

`FlyerCanvas` mide exactamente **1080 x 1350 px**. Orden de capas: hero/foto (z 0), cinta (z 2), titulos y requisitos (z 3), encabezado y pie (z 4). La vista previa usa transformacion proporcional; PNG y PDF usan el mismo nodo a tamano maestro.

## Coordenadas implementadas

| Bloque | CSS actual | Objetivo orientativo de `Modelo.png` |
|---|---:|---:|
| Encabezado | Y 0-166 | Y 0-145 |
| Foto/hero | Y 0-885 | integrada bajo encabezado |
| Programa | X29, Y523 | X28, Y528 |
| Titulo | X29, posterior al programa; 91 px | Y565-725 |
| Regla | X29, ancho 359 | Y742-748 |
| Requisitos | X77 texto, desde aprox. Y826 | Y820-1080 |
| QR | X31, Y1123, 200x200 | X31, Y1123, 200x200 |
| Inscripcion | X257, Y1120 | X257, Y1120-1160 |
| Monto | X257, Y1164 | X257, Y1165-1210 |
| Correo | X257, Y1234 | X257, Y1235-1275 |
| Telefonos | X257, Y1286 | X257, Y1290-1335 |

Las coordenadas de la columna derecha se obtienen de `.flyer-bottom` y sus bloques absolutos. Los objetivos son mediciones orientativas de la referencia, no una certificacion pixel-perfect.

## Foto y cinta

La foto visible mide 790 px dentro de un hero de 885 px. `::before` blanquea la parte superior; `.hero-fade` lleva a blanco la inferior. La cinta ocupa un SVG `viewBox="0 0 1080 1350"`; sus paths empiezan visualmente en la derecha alrededor de Y746/Y782 y se recortan por el canvas.

## Colisiones

El canvas mide con `getBoundingClientRect()`, normaliza a 1080 px y compara inscripcion/monto, monto/correo, correo/telefonos, requisitos/QR, requisitos/inscripcion y texto frente a la region de cinta. Guarda el total en `data-collision-count` y emite `console.error` si hay colision. No muestra advertencia en el formulario y no se ha ejecutado en una captura de exportacion verificada.

## Diferencias conocidas

La cabecera y la cinta fueron reconstruidas por CSS/SVG; falta una comparacion de imagen renderizada frente a `Modelo.png`. Textos largos pueden cambiar altura y activar colisiones, ya que no hay limitador ni aviso UI.

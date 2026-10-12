# Auditoria de nitidez y exportacion

## Hallazgos estaticos

| Prueba | Resultado | Evidencia |
|---|---|---|
| A. SVG original | Pendiente de inspeccion visual al 400% | Analisis XML: `Header Nav.svg` tiene 307 `path`, 0 `image`, 0 `text`, 0 `foreignObject` y 0 raster embebido. |
| Logo.svg | Vector predominante | 85 `path`, 0 `image`; contiene dos `text` de signos `+` con Franklin Gothic Demi. |
| Facultad Humanidades | Vectorial | 49 `path`, 0 `image`, 0 `text`, 0 raster embebido. |
| B. Encabezado del editor | Pendiente de navegador | Se inserta como `<img src={headerNavUrl}>`; la previsualizacion aplica `transform: scale()`. |
| C. PNG | Corregido en codigo, pendiente de archivo real | Se captura sin `transform`, desde 1080 x 1350; valida dimensiones. |
| D. PDF | Raster confirmado | `pdf-lib` incrusta el PNG completo con `embedPng`. |

## Causa raiz

Los SVG institucionales auditados no contienen raster incrustado. La suavidad observada en pantalla puede venir de la escala CSS de la vista previa. La perdida al ampliar PDF es esperada porque el exportador actual inserta una unica imagen PNG. La captura anterior tenia ademas riesgo de heredar la transformacion de la previsualizacion.

## Cambios realizados

`renderArtifacts()` elimina `transform` y margenes de escala durante `html-to-image`, espera fuentes/imágenes, revisa fuentes con `document.fonts.check()` y valida el tamaño natural del PNG. Se agrego PNG 2x, que vuelve a renderizar el DOM con `pixelRatio: 2` para 2160 x 2700, sin ampliar un PNG existente.

## Fuentes

El CSS carga Gotham Book/Bold/Black y OLDENGLISH UASD desde rutas relativas. TrajanPro y GOTMSNN existen en `Tipografias/`, pero no tienen `@font-face` ni uso actual. Goudy Trajan Bold no fue identificado como archivo/declaracion actual. La comprobacion de disponibilidad se ejecuta antes de exportar y advierte en consola si falta una fuente.

## Plan PDF hibrido

`pdf-lib` no convierte por si solo el DOM, fuentes CSS y SVG `<img>` en un PDF vectorial preservando fidelidad. Una migracion hibrida requeriria reproducir manualmente cada texto, path SVG, degradado y fotografia mediante una biblioteca PDF compatible con navegador, y validar fuentes/licencias. Hasta entonces se conserva el PDF raster de PNG para no alterar composicion. No se ha implementado ni validado exportacion vectorial.

## Pruebas pendientes

Abrir SVG/editor/PNG/PDF al 400%, inspeccionar dimensiones PNG reales, revisar consola de fuentes y comparar nitidez con la version anterior. No se ejecutaron en esta auditoria por falta de Node y navegador de prueba en el entorno local.

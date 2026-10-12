# Sistema de diseno

## Fuentes y recursos

El CSS declara `Gotham` Book (400), Bold (700), Black (900) y `UasdOld` desde `OLDENGLISH UASD.ttf`. Los archivos disponibles tambien incluyen TrajanPro Regular/Bold, Gotham Medium/Light/Ultra, Narrow, XNarrow, Condensed y `GOTMSNN*.TTF`; no todos estan cargados por CSS. `Header Nav.svg` aporta la referencia institucional del encabezado.

## Colores

`--theme-primary` y `--theme-secondary` provienen del flyer. Humanidades usa `#54248a` y `#ffa04f`; los demas catalogos usan los valores genericos actuales `#6d358e` y `#f28b26`. El azul del encabezado, blanco de fondo y negro de contactos no deben convertirse en color tematico.

## Reglas visuales

- Maestro fijo de 1080 x 1350, sin redistribucion por breakpoint.
- Foto, lavado tematico, degradado superior y degradado inferior son capas separadas.
- Encabezado usa recorte de `Header Nav.svg` y logo de facultad dinamico.
- La cinta es SVG, no `border-radius` ni raster.
- El panel administrativo puede ser responsivo; el flyer solo se escala.

La fuente Goudy Trajan Bold fue solicitada como identidad visual, pero no hay un archivo con ese nombre declarado en el CSS actual. TrajanPro existe, pero su uso no esta implementado.

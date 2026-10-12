# Recursos institucionales

| Ruta | Formato y uso |
|---|---|
| `Modelo.png` | PNG RGB 1080 x 1350; referencia visual, no fondo. |
| `Header Nav.svg` | SVG institucional usado como imagen de encabezado recortada. |
| `Logo.svg` | SVG oficial disponible; no se importa directamente en el canvas actual. |
| `Loguitos/*.svg` | Nueve logos de facultad importados por Vite. |
| `Tipografias/` | OTF, TTF y algunos archivos sin extension de Gotham/Trajan. |

El CSS importa de forma relativa `Gotham-Book.otf`, `Gotham-Bold.otf`, `Gotham-Black.otf` y `OLDENGLISH UASD.ttf`. No mover ni renombrar recursos sin actualizar imports y volver a probar el build Netlify.

Los SVG deben tratarse como recursos de identidad. No se almacenan en Supabase.

La auditoria XML encontro que `Header Nav.svg` y el logo de Humanidades no tienen elementos `image`, `text` ni raster embebido; el encabezado es paths vectoriales. `Logo.svg` contiene dos textos pequenos con Franklin Gothic Demi. Ver [RENDERING_AUDIT.md](RENDERING_AUDIT.md).

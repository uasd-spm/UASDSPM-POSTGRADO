# Exportacion PNG y PDF

`exportPng()` espera fuentes e imagenes, elimina la transformacion de vista previa y llama `toPng` sobre `FlyerCanvas` con 1080 x 1350. Descarga solo el flyer.

`exportPdf()` vuelve a renderizar el canvas a 3240 x 4050 (3x), crea una pagina `1080 x 1350` con `pdf-lib` y dibuja esa imagen embebida. El PDF actual es raster, no PDF vectorial de texto/SVG, pero ya no reutiliza el PNG estandar de 1080 x 1350. Al Guardar, ambos blobs se almacenan sin descarga; con Supabase usan rutas fijas por diseno y con modo local IndexedDB.

Para QR por URL, la exportacion valida `http://`/`https://`, crea el Data URL con correccion `H`, margen 2, negro sobre blanco y espera dos frames de render antes de capturar el canvas.

La captura espera fuentes/imágenes y elimina `transform` de la vista previa. PNG normal verifica 1080 x 1350; el boton PNG 2X vuelve a renderizar a 2160 x 2700. El informe de evidencia y limites esta en [RENDERING_AUDIT.md](RENDERING_AUDIT.md).

Ventaja: vista, PNG y PDF provienen del mismo DOM. Limites: no hay prueba automatizada de fuentes, SVG, QR, foto, resolucion efectiva ni coincidencia visual. `html-to-image` puede verse afectado por compatibilidad de navegador, recursos externos o URL firmadas expiradas.

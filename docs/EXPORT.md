# Exportacion PNG y PDF

`exportPng()` espera `document.fonts.ready` y llama `toPng(canvasRef.current, { pixelRatio: 1, width: 1080, height: 1350, cacheBust: true })`. Descarga solo `FlyerCanvas`.

`exportPdf()` vuelve a generar ese PNG, crea una pagina `1080 x 1350` con `pdf-lib` y dibuja la imagen embebida. Por tanto el PDF actual es raster, no un PDF vectorial de texto/SVG. Al Guardar, ambos blobs se almacenan sin descarga; con Supabase usan rutas fijas por diseno y con modo local IndexedDB.

Para QR por URL, la exportacion valida `http://`/`https://`, crea el Data URL con correccion `H`, margen 2, negro sobre blanco y espera dos frames de render antes de capturar el canvas.

Ventaja: vista, PNG y PDF provienen del mismo DOM. Limites: no hay prueba automatizada de fuentes, SVG, QR, foto, resolucion efectiva ni coincidencia visual. `html-to-image` puede verse afectado por compatibilidad de navegador, recursos externos o URL firmadas expiradas.

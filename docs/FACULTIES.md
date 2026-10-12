# Facultades

`src/data.ts` usa `import.meta.glob('../Loguitos/*.svg', { eager: true, query: '?url', import: 'default' })`; Vite descubre al compilar los nueve archivos actuales: Agronomia, Artes, Ciencias, Economia, Educacion, Humanidades, Ingenieria, Juridicas y Medicina.

El nombre legible se deriva del archivo `facultad-*.svg`. El SVG se conserva sin modificar y se muestra en `.faculty-mark`. El fallback es Humanidades si el catalogo no se encuentra.

Humanidades recibe `#54248a` y `#ffa04f`; las demas usan el tema generico `#6d358e`/`#f28b26`. No hay analisis automatico de colores visibles del SVG ni metadatos completos por facultad. La facultad guardada es el identificador de ruta de `import.meta.glob`, por lo que cambiar ese patron puede afectar datos existentes.

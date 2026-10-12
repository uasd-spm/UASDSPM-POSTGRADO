# Arquitectura

## Capas actuales

- **Entrada:** `index.html` carga `src/main.tsx`; este monta `App` con `StrictMode`.
- **Presentacion:** `src/App.tsx` concentra navegacion, formulario, biblioteca, autenticacion, canvas y exportacion. No existen rutas React Router ni componentes en archivos separados.
- **Estilos:** `src/styles.css` contiene CSS del panel y del canvas. Tailwind/PostCSS estan configurados, pero no se observaron directivas Tailwind ni clases de utilidad en el codigo actual.
- **Datos:** `src/data.ts` descubre SVG con `import.meta.glob`; `src/types.ts` define datos del flyer.
- **Persistencia:** `src/supabase.ts` selecciona Supabase cuando hay URL y anon key; de lo contrario usa `localStorage`.
- **Infraestructura:** Vite genera `dist`; Netlify lo publica y redirige SPA a `index.html`.

## Flujo de datos

El formulario actualiza el estado `flyer` de `App`. Ese objeto se pasa a `FlyerCanvas` para la vista y las exportaciones. Guardar normaliza imagenes Data URL a Storage, guarda la fila, renderiza PNG/PDF, sube ambos y actualiza sus rutas. La biblioteca se rellena con `listFlyers()` y firma los artefactos al leerlos.

## Dependencias reales

React/React DOM, Supabase JS, `html-to-image`, `pdf-lib`, `qrcode`, Lucide React, React Hook Form, Zod y resolvers estan declarados. React Hook Form, Zod y resolvers no se importan en el codigo actual. Tailwind, PostCSS y Autoprefixer estan declarados como desarrollo.

Ver tambien: [COMPONENTS.md](COMPONENTS.md), [DATABASE.md](DATABASE.md), [EXPORT.md](EXPORT.md).

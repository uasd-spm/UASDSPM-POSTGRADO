# Despliegue

Repositorio configurado: `https://github.com/uasd-spm/UASDSPM-POSTGRADO.git`. Rama publicada: `main`. No se conoce ni documenta una URL publica de Netlify.

`netlify.toml` define `npm run build`, publica `dist`, usa Node 20, pasa `--no-audit --no-fund` a npm y redirige `/*` a `/index.html` con 200 para SPA. Netlify instala dependencias y ejecuta la compilacion remota; no se requiere Node local para ese flujo.

## Actualizacion y verificacion

1. Revisar cambios y subir un commit a `main`.
2. Confirmar en Netlify que el build ejecuto `tsc -b && vite build` y publico `dist`.
3. Configurar las variables Vite en Netlify si se usara Supabase.
4. Abrir la aplicacion, iniciar sesion, comprobar recursos, guardado y exportaciones.

Para revertir, seleccionar un deploy previo en Netlify o crear/revertir un commit Git y subirlo. Nunca se debe incluir `service_role` en las variables Vite.

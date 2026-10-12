# Estructura del proyecto

```text
.
|- src/
|  |- App.tsx             UI, canvas, exportacion y colisiones
|  |- data.ts             catalogo y valores iniciales
|  |- supabase.ts         adaptador de persistencia
|  |- styles.css          estilos del panel y flyer
|  |- types.ts            tipos de dominio
|  |- main.tsx            montaje React
|  `- vite-env.d.ts       tipos Vite
|- supabase/schema.sql    esquema y politicas
|- Loguitos/              nueve SVG de facultades
|- Tipografias/           fuentes institucionales
|- Modelo.png             referencia 1080 x 1350
|- Header Nav.svg         referencia de encabezado
|- Logo.svg               recurso institucional
|- netlify.toml           build, publish y SPA redirect
|- package.json           scripts y dependencias
|- tailwind.config.ts     exploracion Tailwind
`- postcss.config.js      PostCSS
```

`desktop.ini` existe por el sistema de archivos, esta ignorado por Git y no pertenece a la aplicacion. No hay directorios `public/`, `tests/`, `node_modules/` ni `dist/` versionados.

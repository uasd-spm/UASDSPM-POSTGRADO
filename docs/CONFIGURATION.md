# Configuracion

## Variables de entorno

`.env.example` declara:

```env
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

Sin ambas, `supabase` es `null`, no se solicita login y el adaptador usa `localStorage` bajo `uasd-flyers-local-v1`. Con ambas, la pantalla solicita email/contrasena mediante `signInWithPassword` y usa Supabase.

## Build

`package.json` exige Node `>=20 <23` y npm `>=10`. Scripts: `npm run dev`, `npm run build` y `npm run preview`. No hay `package-lock.json` en el repositorio auditado; Netlify instala desde `package.json`, pero un lockfile generado en un entorno controlado mejoraria reproducibilidad.

Vite usa React plugin. `src/vite-env.d.ts` referencia `vite/client`, necesario para `import.meta.env`, `import.meta.glob` e imports de assets.

Antes de habilitar artefactos en un Supabase existente, ejecutar la migracion de `png_path`/`pdf_path` y la politica Storage `update` incluidas en `supabase/schema.sql`.

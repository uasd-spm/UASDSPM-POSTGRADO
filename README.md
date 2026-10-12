# Generador institucional UASD San Pedro

Aplicacion React/Vite para editar y exportar flyers institucionales a PNG (1080 x 1350) y PDF. Sin variables de Supabase usa `localStorage` solo para pruebas locales; no es almacenamiento multiusuario.

## Recursos institucionales

Los recursos institucionales ya se conservan en la raiz del repositorio: `Logo.svg`, `Modelo.png`, `Header Nav.svg`, `Tipografias/` y `Loguitos/`. Vite importa el logo, las fuentes y los SVG de facultades desde esas rutas relativas al compilar; no hay rutas de Windows ni copias de los recursos.

`Modelo.png` y `Header Nav.svg` son referencias institucionales y no se usan como fondo del flyer. El segundo esta disponible para futuras reconstrucciones del encabezado.

## Desarrollo local

1. Instale Node.js 20 o superior si desea ejecutar el proyecto localmente.
2. Ejecute `npm install`.
3. Opcionalmente copie `.env.example` a `.env.local` y configure Supabase.
4. Ejecute `npm run dev`.
5. Genere produccion con `npm run build`.

## Supabase

1. Cree un proyecto Supabase y ejecute `supabase/schema.sql` en SQL Editor.
2. Cree un bucket privado `flyer-images` antes de ejecutar las politicas Storage del mismo archivo.
3. En Authentication active el proveedor de correo y cree usuarios autorizados.
4. Configure las URLs de redireccion con la URL local y la URL final `https://SU-SITIO.netlify.app`.
5. Agregue al entorno `VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY`. Nunca use `service_role` en el navegador.

La tabla aplica RLS por `auth.uid()`. La clave anonima es publica por diseno y solo es segura junto con dichas politicas.

## Publicar con GitHub y Netlify sin Node local

1. Cree un repositorio privado nuevo en GitHub, sin archivo README, licencia ni `.gitignore` iniciales.
2. En la carpeta del proyecto, inicialice Git, agregue los archivos y publique la rama principal:

   ```powershell
   Set-Location "G:\Mi unidad\WEB PROMOCIONES\POSTGRADO"
   git init
   git add .
   git commit -m "Initial UASD flyer generator"
   git branch -M main
   git remote add origin https://github.com/SU-USUARIO/SU-REPOSITORIO.git
   git push -u origin main
   ```

3. En Netlify seleccione **Add new site** > **Import an existing project** > GitHub y autorice el repositorio.
4. Netlify detectara `netlify.toml`: instalara dependencias con npm, ejecutara `npm run build` con Node 20 y publicara `dist`.
5. En **Site configuration** > **Environment variables**, agregue `VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY`. No agregue `service_role` ni suba `.env` al repositorio.
6. Publique el sitio. Cada `git push` a `main` disparara una compilacion y despliegue automaticos.
7. Anada el subdominio `.netlify.app` asignado por Netlify a las URLs de redireccion permitidas de Supabase Auth.

`package-lock.json` no se incluye porque este equipo no dispone de Node/npm para generarlo. Netlify puede instalar desde `package.json`; una vez que se cree el lockfile en un entorno Node, debe subirse a Git para compilaciones reproducibles.

## Verificacion posterior

Compruebe inicio de sesion, guardado y recuperacion desde dos sesiones, aislamiento de usuarios, carga de fotos, QR, PNG/PDF y los anchos 375, 768 y 1440 px. Compare una exportacion PNG contra `Modelo.png` antes de publicar una version institucional.

# Seguridad

- La anon key de Supabase puede estar en frontend solo junto con RLS correcto; `service_role` nunca debe exponerse.
- Auth usa email/contrasena existente. No hay registro, recuperacion de contrasena, roles administrativos ni UI de gestion de usuarios.
- RLS restringe filas por `auth.uid() = user_id`.
- Storage restringe objetos por primera carpeta de ruta igual al usuario autenticado.
- Fotos y QR se suben como blobs; la tabla guarda ruta, no Base64, cuando Supabase esta activo.
- PNG/PDF se reemplazan mediante `upsert` en rutas fijas; por ello la politica Storage `update` es necesaria.
- El modo local no tiene autenticacion ni aislamiento multiusuario; es solo desarrollo/pruebas.
- `.gitignore` excluye `.env`, `.env.local`, `node_modules`, `dist` y `.netlify`.

Revisar politicas directamente en Supabase despues de ejecutar SQL. La seguridad no ha sido probada contra cuentas reales durante esta auditoria.

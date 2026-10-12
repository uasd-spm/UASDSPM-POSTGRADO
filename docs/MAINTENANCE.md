# Mantenimiento

## Cambio visual

Leer [FLYER_TEMPLATE.md](FLYER_TEMPLATE.md), abrir `Modelo.png`, medir antes de cambiar coordenadas y conservar 1080 x 1350. Cambiar `FlyerCanvas` y `styles.css` de forma coordinada. Probar preview, PNG y PDF porque comparten DOM.

## Cambio de datos o seguridad

Leer [DATABASE.md](DATABASE.md) y [SECURITY.md](SECURITY.md). No cambiar columnas ni identificadores de facultad sin migracion compatible. Aplicar y probar RLS/Storage en Supabase; nunca versionar secretos.

Al cambiar artefactos, no persistir URL firmadas. Mantener rutas por diseno y comprobar que PNG, PDF y miniatura provienen del mismo canvas.

## Cambio de despliegue

Leer [DEPLOYMENT.md](DEPLOYMENT.md). Mantener `netlify.toml`, build `npm run build` y `dist` salvo instruccion fundada. Verificar el log remoto despues de cada push.

## Cierre de trabajo

Actualizar la documentacion afectada, `CHANGELOG.md`, problemas y roadmap. Registrar pruebas ejecutadas y no ejecutadas. Antes de publicar: revisar `git status`, diff, log, remoto y archivos incluidos.

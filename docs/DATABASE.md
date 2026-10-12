# Base de datos y Storage

## Tabla `public.flyers`

`schema.sql` crea UUID `id`, `user_id` con valor `auth.uid()`, nombre, facultad, colores, programa, titulo, encabezado y JSONB de requisitos. Tambien guarda rutas de imagen/QR, artefactos `png_path`/`pdf_path`, encuadre (`image_zoom`, `image_x`, `image_y`, `overlay`), QR, inscripcion, importe, correo, telefonos y timestamps.

El trigger `flyers_updated_at` invoca `set_updated_at()` antes de actualizar. La aplicacion mapea camelCase a columnas snake_case en `toRow`/`fromRow`.

## RLS y relaciones

`user_id` referencia `auth.users(id)` y borra en cascada. RLS esta habilitado. La unica politica de tabla permite todas las operaciones cuando `auth.uid() = user_id`, tanto para `using` como `with check`.

## Storage

Se espera el bucket privado `flyer-images`. Las rutas se crean como `<user-id>/<uuid>.<extension>`. Hay politicas de insert, select y delete que exigen que la primera carpeta sea el usuario autenticado. La aplicacion crea URL firmadas por una hora.

No hay politica `update` de Storage ni borrado de objetos al eliminar un flyer. Ejecutar el SQL requiere crear primero el bucket. Las sentencias `create policy` no son idempotentes si se ejecutan dos veces sin eliminar politicas existentes.

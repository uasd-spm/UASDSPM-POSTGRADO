# CRUD de disenos

- **Crear:** inicia con `defaultFlyer`; Guardar inserta en Supabase o crea UUID en `localStorage`, genera PNG/PDF y registra sus rutas.
- **Leer:** `listFlyers()` ordena Supabase por `updated_at` descendente; local mantiene el orden guardado.
- **Editar:** selecciona una tarjeta, clona requisitos y actualiza por `id`.
- **Duplicar:** limpia `id`, agrega el sufijo `copia` y abre Crear. Guardar como nuevo hace lo mismo desde el editor.
- **Eliminar:** muestra `confirm()` y borra fila/local item. No borra objetos Storage asociados.

La biblioteca busca solo por nombre. Usa el PNG almacenado como miniatura, permite abrir PDF y descargar PDF/PNG. Un diseno sin archivos abre el editor para regenerarlos al Guardar.

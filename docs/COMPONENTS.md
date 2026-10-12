# Componentes React

| Elemento | Responsabilidad |
|---|---|
| `App` | Estado del flyer, vistas Crear/Creaciones, sesion, guardado, exportacion y mensajes. |
| `Form` | Controles controlados para todos los campos editables y requisitos. |
| `FormSection` | Agrupa controles en `fieldset`. |
| `Range` | Slider numerico reutilizado por encuadre y overlay. |
| `FlyerCanvas` | Renderiza el flyer fijo y comprueba colisiones. Recibe `flyer` y `faculty`, admite ref para exportacion. |
| `QrImage` | Genera Data URL QR desde URL con la libreria `qrcode`. |

No hay componentes de rutas, contexto global, reducer ni tests. `FlyerCanvas` se usa tanto en la previsualizacion como en las miniaturas de Creaciones; la ref principal se usa para PNG/PDF.

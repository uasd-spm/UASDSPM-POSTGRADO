# Pruebas y validacion

## Estado actual

No hay suite automatizada ni Node/npm disponible en el equipo auditado. No se ejecutaron `npm run build`, pruebas de navegador, exportacion ni comparacion de imagenes durante esta auditoria documental.

## Lista manual recomendada

1. Build Netlify sin errores TypeScript/Vite.
2. Login y aislamiento de dos usuarios Supabase.
3. Crear, editar, duplicar, eliminar y recargar un flyer.
4. Foto JPG/PNG/WebP, encuadre, QR generado y QR subido.
5. PNG 1080 x 1350 y PDF una pagina.
6. Anchos 375, 768 y 1440; el canvas no debe redistribuirse.
7. Revisar `data-collision-count="0"` en el canvas y la consola.
8. Comparar PNG exportado con `Modelo.png`, generando diferencia por zonas estructurales.
9. Guardar, recargar la biblioteca, abrir PDF y descargar ambos archivos; comprobar que editar reemplaza miniatura y archivos.
10. Repetir sin Supabase y confirmar la persistencia local de IndexedDB.
11. Escribir una URL HTTPS, esperar la vista QR, cambiarla, limpiar el enlace, subir QR personalizado y escanear PNG/PDF con una camara.

La comparacion pixel-perfect, el QR escaneable y la persistencia remota siguen pendientes de evidencia.

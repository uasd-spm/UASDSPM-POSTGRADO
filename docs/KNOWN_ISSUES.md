# Problemas conocidos

| Severidad | Problema | Estado |
|---|---|---|
| Alta | Fidelidad pixel-perfect y exportaciones no tienen captura/diferencia verificada. | Pendiente. |
| Alta | Contenido muy largo puede alterar bloques visuales; detector solo registra en consola. | Pendiente de UX/validacion. |
| Media | Solo Humanidades tiene colores especificos; otras facultades comparten tema generico. | Pendiente. |
| Media | PDF es PNG raster embebido, no vectorial. | Limitacion actual. |
| Media | Borrar un flyer no borra sus objetos en Storage. | Pendiente. |
| Media | Diseños antiguos requieren Guardar de nuevo para crear artefactos. | Compatibilidad prevista. |
| Media | URL firmadas de imagen expiran a la hora durante una sesion abierta. | Pendiente. |
| Baja | Biblioteca solo busca por nombre; no filtra por facultad ni ordena desde UI. | Pendiente. |
| Baja | `package-lock.json` no existe. | Pendiente. |
| Baja | Git muestra a veces `warning: ignoring broken ref refs/heads/desktop.ini`. | Requiere investigar el metadato creado en `.git` por el entorno Windows/Drive. |

El commit `784f306` separo el pie en bloques absolutos y agrego deteccion de colisiones, pero esa deteccion no se ha observado en un render real durante la auditoria.

# Instrucciones para agentes

1. Leer primero [MASTER.md](MASTER.md), despues los archivos relevantes de `docs/`.
2. Inspeccionar el codigo afectado y sus dependencias; la documentacion no sustituye al codigo.
3. Preservar CRUD, autenticacion, Supabase, Netlify, recursos institucionales y composicion 1080 x 1350 salvo instruccion explicita.
4. Preferir cambios pequenos. No introducir rutas Windows, secretos, `node_modules`, `dist` ni `.env`.
5. Para cambios visuales, medir contra `Modelo.png`, conservar el maestro fijo y revisar `data-collision-count` del canvas.
6. Antes de un commit: revisar `git status`, diff, log y remoto. No sobrescribir cambios ajenos.
7. Ejecutar pruebas cuando el entorno lo permita; declarar con precision las pruebas no ejecutadas.
8. Tras un cambio importante, actualizar `MASTER.md`, el documento tecnico correspondiente, `docs/CHANGELOG.md`, `docs/KNOWN_ISSUES.md` y `docs/ROADMAP.md` si cambia una prioridad.

Regla fundamental: no realizar modificaciones importantes sin comprender arquitectura, recursos institucionales y restricciones visuales. Mantener la documentacion consistente sin reescribirla innecesariamente.

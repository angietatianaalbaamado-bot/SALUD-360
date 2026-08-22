# Módulo: Triage y Enfermería

Esta carpeta corresponde al integrante encargado de **Triage y Enfermería**.

## Qué va aquí
- `entities/` -> las entidades TypeORM de este módulo (una clase por tabla)
- `dto/` -> los DTOs de creación/actualización (create-x.dto.ts, update-x.dto.ts)
- `triage.controller.ts` -> los endpoints REST
- `triage.service.ts` -> la lógica de negocio
- `triage.module.ts` -> ya está armado, solo agrega tus entities al TypeOrmModule.forFeature([...])

Guíate por el módulo billing/ (Facturación y Reportes) como ejemplo ya resuelto.

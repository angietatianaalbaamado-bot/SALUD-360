# Módulo: Agenda y Citas

Esta carpeta corresponde al integrante encargado de **Agenda y Citas**.

## Qué va aquí
- `entities/` -> las entidades TypeORM de este módulo (una clase por tabla)
- `dto/` -> los DTOs de creación/actualización (create-x.dto.ts, update-x.dto.ts)
- `appointments.controller.ts` -> los endpoints REST
- `appointments.service.ts` -> la lógica de negocio
- `appointments.module.ts` -> ya está armado, solo agrega tus entities al TypeOrmModule.forFeature([...])

Guíate por el módulo billing/ (Facturación y Reportes) como ejemplo ya resuelto.

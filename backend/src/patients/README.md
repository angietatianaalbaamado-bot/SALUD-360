# Módulo: Pacientes y Médicos

Esta carpeta corresponde al integrante encargado de **Pacientes y Médicos**.

## Qué va aquí
- `entities/` -> las entidades TypeORM de este módulo (una clase por tabla)
- `dto/` -> los DTOs de creación/actualización (create-x.dto.ts, update-x.dto.ts)
- `patients.controller.ts` -> los endpoints REST
- `patients.service.ts` -> la lógica de negocio
- `patients.module.ts` -> ya está armado, solo agrega tus entities al TypeOrmModule.forFeature([...])

Guíate por el módulo billing/ (Facturación y Reportes) como ejemplo ya resuelto.

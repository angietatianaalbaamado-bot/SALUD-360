# Módulo: Historia Clínica

Esta carpeta corresponde al integrante encargado de **Historia Clínica**.

## Qué va aquí
- `entities/` -> las entidades TypeORM de este módulo (una clase por tabla)
- `dto/` -> los DTOs de creación/actualización (create-x.dto.ts, update-x.dto.ts)
- `medical-records.controller.ts` -> los endpoints REST
- `medical-records.service.ts` -> la lógica de negocio
- `medical-records.module.ts` -> ya está armado, solo agrega tus entities al TypeOrmModule.forFeature([...])

Guíate por el módulo billing/ (Facturación y Reportes) como ejemplo ya resuelto.

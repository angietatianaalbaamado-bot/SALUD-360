# Módulo: Seguridad y Accesos

Esta carpeta corresponde al integrante encargado de **Seguridad y Accesos**.

## Qué va aquí
- `entities/` -> las entidades TypeORM de este módulo (una clase por tabla)
- `dto/` -> los DTOs de creación/actualización (create-x.dto.ts, update-x.dto.ts)
- `auth.controller.ts` -> los endpoints REST
- `auth.service.ts` -> la lógica de negocio
- `auth.module.ts` -> ya está armado, solo agrega tus entities al TypeOrmModule.forFeature([...])

Guíate por el módulo billing/ (Facturación y Reportes) como ejemplo ya resuelto.

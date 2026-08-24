# Módulo: Facturación y Reportes

Responsable: **Tatiana Alba**

## Entidades incluidas

- `invoices`, `invoice_details`, `payments`, `payment_methods`
- `eps`, `insurance_plans`, `authorizations`
- `reports`, `report_exports`
- `settings`, `countries`, `departments`, `cities`, `document_types`, `genders`, `blood_types`, `marital_status`

## Endpoints ya implementados

| Método | Ruta | Descripción |
|---|---|---|
| POST | `/billing/invoices` | Crear factura con detalles |
| GET | `/billing/invoices` | Listar todas las facturas |
| GET | `/billing/invoices/:id` | Ver una factura |
| PATCH | `/billing/invoices/:id` | Actualizar factura |
| DELETE | `/billing/invoices/:id` | Eliminar factura |
| POST | `/billing/payments` | Registrar un pago (actualiza el estado de la factura automáticamente) |
| GET | `/billing/invoices/:id/payments` | Ver pagos de una factura |
| GET | `/billing/authorizations` | Listar autorizaciones EPS |
| GET | `/billing/reports` | Listar reportes generados |

## Pendiente por hacer

- CRUD completo de `eps`, `insurance_plans`, `authorizations` (crear/actualizar/eliminar)
- Generación real de reportes (PDF/Excel) en `report_exports`
- CRUD de las tablas de configuración (`countries`, `departments`, `cities`, etc.) — probablemente compartido con el módulo de Seguridad
- Conectar `patient_id` con la entidad real de `patients` cuando ese módulo esté listo (por ahora es un número suelto, referencia lógica)
- Conectar `procedure_id` en `authorizations` con el módulo de Laboratorio e Imágenes

## Cómo probar localmente

```bash
npm run start:dev
```

Con Swagger corriendo en `http://localhost:3000/api/docs`, ya aparecen todos los endpoints de "Facturación y Reportes" listos para probar.

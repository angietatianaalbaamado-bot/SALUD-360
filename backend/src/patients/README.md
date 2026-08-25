# Módulo: Pacientes y Médicos

Este módulo administra la información básica de pacientes y médicos. Se desarrolla
por etapas para facilitar la revisión académica y el aprendizaje del equipo.

## Etapa actual: CRUD de pacientes

### Endpoints implementados

| Método | Ruta | Descripción |
|---|---|---|
| `POST` | `/patients` | Registrar un paciente |
| `GET` | `/patients` | Listar pacientes con sus catálogos |
| `GET` | `/patients/:id` | Consultar un paciente y sus relaciones |
| `PATCH` | `/patients/:id` | Actualizar parcialmente un paciente |
| `DELETE` | `/patients/:id` | Desactivar un paciente sin borrar su historial |

### Decisiones del diseño

- Los DTOs validan tipos, campos obligatorios, longitudes, correo y formato de fecha.
- Un documento repetido genera una respuesta de conflicto comprensible.
- Una referencia inválida a un catálogo genera una solicitud incorrecta.
- El endpoint `DELETE` realiza una desactivación lógica mediante `is_active = false`.
  No elimina físicamente el registro, para conservar la trazabilidad clínica.
- Los listados se ordenan por apellidos y nombres.
- El detalle incluye contactos, direcciones, documentos, fotos y afiliaciones.

### Cómo verificar

Desde la carpeta `backend`:

```bash
npm test -- --runInBand
npm run build
```

También puede iniciarse el backend y consultar Swagger en:

```text
http://localhost:3000/api/docs
```

## Pruebas unitarias actuales

- Creación de un paciente válido.
- Listado ordenado de pacientes.
- Respuesta cuando un paciente no existe.
- Desactivación sin borrado físico.
- Manejo de documentos duplicados.

## Pendiente para las siguientes etapas

- CRUD de contactos, direcciones, documentos, fotos y afiliaciones.
- CRUD de médicos, especialidades, horarios y disponibilidad.
- Pruebas de integración con PostgreSQL.
- Paginación y filtros de búsqueda.
- Conectar `doctors.user_id` con la entidad del módulo de Seguridad.

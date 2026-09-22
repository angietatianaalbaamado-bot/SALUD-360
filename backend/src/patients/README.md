# Módulo: Pacientes y Médicos

Este módulo administra la información básica de pacientes y médicos. Se desarrolla
por etapas para facilitar la revisión académica y el aprendizaje del equipo.

## Etapa actual: CRUD de pacientes y médicos

### Endpoints implementados

| Método | Ruta | Descripción |
|---|---|---|
| `POST` | `/patients` | Registrar un paciente |
| `GET` | `/patients` | Listar pacientes con sus catálogos |
| `GET` | `/patients/:id` | Consultar un paciente y sus relaciones |
| `PATCH` | `/patients/:id` | Actualizar parcialmente un paciente |
| `DELETE` | `/patients/:id` | Desactivar un paciente sin borrar su historial |
| `POST` | `/doctors` | Registrar un médico |
| `GET` | `/doctors` | Listar médicos activos e inactivos |
| `GET` | `/doctors/:id` | Consultar los datos básicos de un médico |
| `PATCH` | `/doctors/:id` | Actualizar parcialmente un médico |
| `DELETE` | `/doctors/:id` | Desactivar un médico sin borrar su registro |

### Gestión de médicos

Las rutas `/doctors` requieren un token JWT válido. Iniciar sesión con
`POST /auth/login` y usar el token con **Authorize** en Swagger o mediante
el encabezado `Authorization: Bearer <token>`.
La autorización por roles sigue pendiente en Seguridad: por ahora, cualquier
usuario autenticado puede usar estas rutas. La protección de `/patients` no
cambia en esta entrega.

Ejemplo de cuerpo para `POST /doctors`:

```json
{
  "document_type_id": 1,
  "document_number": "1020304050",
  "medical_license": "RM-12345",
  "first_name": "Ana",
  "last_name": "Gómez",
  "email": "ana@example.com",
  "phone": "3001234567",
  "user_id": 1
}
```

El tipo de documento y, si se envía, el usuario deben existir en la base de
datos. `user_id` es opcional y un usuario solo puede vincularse a un médico.
El vínculo no crea una cuenta ni asigna roles. Las respuestas incluyen
`user_id`, sin cargar datos ni credenciales del usuario relacionado.

- Los campos obligatorios son `document_type_id`, `document_number`,
  `medical_license`, `first_name` y `last_name`.
- Se validan tipos, longitudes y correo. Se recortan espacios al inicio y final
  de los textos; los campos obligatorios no aceptan cadenas vacías.
- La combinación de tipo y número de documento, el registro profesional y el
  usuario vinculado no pueden repetirse, incluso en peticiones simultáneas.
  Un conflicto devuelve `409`; una referencia inexistente o datos inválidos,
  `400`; un médico inexistente, `404`; un token ausente o inválido, `401`.
- `PATCH` conserva los campos omitidos. Se puede enviar `null` para limpiar
  segundo nombre, segundo apellido, teléfono, correo o vínculo al usuario.
  Los campos obligatorios y `is_active` no aceptan `null`.
- `DELETE` establece `is_active = false`, conservando especialidades, horarios
  y disponibilidad. Se puede reactivar mediante `PATCH` con `is_active: true`.
- El listado se ordena por apellidos, nombres e identificador e incluye médicos
  inactivos. La paginación, los filtros y la integración con Citas quedan para
  la siguiente etapa; la desactivación no cancela citas ni desactiva al usuario.

La relación `doctors.user_id` ya está conectada con `User` de Seguridad en
TypeORM. La migración SQL `002_patients_doctors.sql` ya contiene esa clave
foránea. Si una base creada previamente con sincronización contiene referencias
a usuarios inexistentes, deben corregirse antes de agregar la relación.

### Decisiones del diseño de pacientes

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

En PowerShell, si la política de ejecución bloquea `npm.ps1`, utilizar
`npm.cmd` en lugar de `npm`. Ejecutar `npm install` al actualizar las
dependencias; el archivo de bloqueo incluye `bcryptjs` y sus tipos.

También puede iniciarse el backend y consultar Swagger en:

```text
http://localhost:3000/api/docs
```

## Pruebas

Las pruebas unitarias de pacientes verifican:

- Creación de un paciente válido.
- Listado ordenado de pacientes.
- Respuesta cuando un paciente no existe.
- Desactivación sin borrado físico.
- Manejo de documentos duplicados.

Las pruebas de médicos verifican validación de entradas, actualización parcial,
tratamiento de nulos, desactivación y errores de duplicados y referencias.

### Integración de médicos con PostgreSQL

La suite `doctors.integration.spec.ts` carga los módulos reales de Pacientes,
Seguridad y Facturación (catálogos), y obtiene el token mediante registro e
inicio de sesión. Prueba las rutas HTTP con JWT y PostgreSQL, incluyendo
duplicados al crear y editar, registros simultáneos,
referencias inexistentes, conservación de horarios al desactivar y Swagger.

Usar una **base de pruebas independiente**, previamente creada. La suite crea
un esquema con nombre aleatorio `doctors_test_...` y elimina únicamente ese
esquema al terminar. El usuario de conexión necesita permiso para crear esquemas.
Configurar la conexión en `DOCTORS_TEST_DATABASE_URL`; no utiliza `.env`.

Desde `backend`, en PowerShell (ajustar los datos de conexión):

```powershell
$env:DOCTORS_TEST_DATABASE_URL = 'postgresql://usuario:clave@localhost:5432/salud360_doctors_test'
npm.cmd test -- --runInBand
Remove-Item Env:DOCTORS_TEST_DATABASE_URL
```

En Bash:

```bash
DOCTORS_TEST_DATABASE_URL='postgresql://usuario:clave@localhost:5432/salud360_doctors_test' npm test -- --runInBand
```

Sin esa variable, las pruebas de integración se omiten y se ejecutan las
unitarias. No guardar credenciales reales en Git. Estas pruebas cubren la API
de médicos; no validan todos los módulos del sistema.

## Pendiente para las siguientes etapas

- CRUD de contactos, direcciones, documentos, fotos y afiliaciones.
- CRUD de especialidades, horarios y disponibilidad de médicos.
- Pruebas de integración de pacientes y de los flujos entre módulos.
- Paginación y filtros de búsqueda.
- Aplicar los permisos por rol cuando estén disponibles en Seguridad.
- Integrar disponibilidad y desactivación de médicos con las reglas de Citas.

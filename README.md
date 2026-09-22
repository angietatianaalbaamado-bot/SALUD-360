# 🏥 SALUD+ 360

## Sistema Integral Inteligente para la Gestión Hospitalaria

Plataforma web para hospitales, clínicas, IPS y centros médicos.

![Version](https://img.shields.io/badge/version-1.0-blue)
![Backend](https://img.shields.io/badge/NestJS-Backend-red)
![Frontend](https://img.shields.io/badge/Frontend-Pendiente-lightgrey)
![Database](https://img.shields.io/badge/PostgreSQL-Database-blue)
![License](https://img.shields.io/badge/License-MIT-green)
![Status](https://img.shields.io/badge/Status-En%20Desarrollo-yellow)

- [Repositorio](https://github.com/angietatianaalbaamado-bot/SALUD-360)
- [Reportar un problema](https://github.com/angietatianaalbaamado-bot/SALUD-360/issues)

---

## 📌 Descripción

**SALUD+ 360** es una plataforma integral de gestión hospitalaria diseñada
para optimizar los procesos administrativos, clínicos y asistenciales de
hospitales, clínicas, IPS y centros médicos.

El objetivo es administrar desde el ingreso del paciente hasta su egreso,
centralizando la información clínica, administrativa y financiera.

Actualmente el repositorio contiene una API REST en NestJS, entidades para
PostgreSQL, scripts SQL y pruebas del módulo de pacientes. Los nueve módulos
del backend están registrados en la aplicación. La integración entre módulos
sigue en desarrollo y la interfaz web en React aún no está incluida.

El proyecto está orientado a implementar buenas prácticas de Ingeniería de
Software, Arquitectura Limpia, APIs REST y trabajo colaborativo mediante Git y
GitHub.

---

## 🎯 Objetivos

### Objetivo general

Desarrollar una plataforma web que permita administrar de forma eficiente todos
los procesos de una institución prestadora de servicios de salud (IPS),
incluyendo la gestión de pacientes, historias clínicas, citas médicas, farmacia,
laboratorio, hospitalización, facturación y reportes.

### Objetivos específicos

- Gestionar pacientes, personal médico e historias clínicas.
- Administrar el proceso de Triage y signos vitales.
- Gestionar hospitalizaciones, habitaciones y camas.
- Controlar el inventario y la administración de medicamentos.
- Gestionar laboratorio clínico e imágenes diagnósticas.
- Administrar la agenda y citas médicas.
- Generar reportes y un dashboard general.
- Gestionar usuarios, roles y permisos.
- Implementar auditoría del sistema.
- Aplicar autenticación segura mediante JWT.

---

## 🏗 Arquitectura

Arquitectura prevista en tres capas. El backend y los archivos de base de datos
ya están presentes; el frontend está pendiente:

```text
   React (Frontend previsto)
         │
         ▼
NestJS API REST (Backend)
         │
         ▼
   PostgreSQL (Base de datos)
```

---

## 🚀 Tecnologías

| Capa | Tecnologías | Estado |
| --- | --- | --- |
| **Frontend** | React, Vite, TypeScript, Tailwind CSS, React Router, Axios | Previsto; sin código en esta rama |
| **Backend** | NestJS 10, TypeScript, TypeORM, JWT, Passport, bcryptjs, Swagger, class-validator | En desarrollo |
| **Base de datos** | PostgreSQL | Entidades y scripts SQL por módulo |
| **Pruebas** | Jest, ts-jest, SQL | Pruebas de pacientes y médicos |

El trabajo colaborativo se gestiona con Git y GitHub.

---

## 📁 Estructura del proyecto

```text
SALUD-360/
├── backend/
│   ├── src/
│   │   ├── auth/
│   │   ├── patients/
│   │   ├── appointments/
│   │   ├── medical-records/
│   │   ├── triage/
│   │   ├── pharmacy/
│   │   ├── laboratory-imaging/
│   │   ├── hospitalization/
│   │   ├── billing/
│   │   ├── app.module.ts
│   │   └── main.ts
│   ├── .env.example
│   └── package.json
├── database/
│   ├── migrations/
│   ├── tests/
│   ├── appointments_schema.sql
│   ├── auth_schema.sql
│   ├── billing_schema.sql
│   ├── medical_records_schema.sql
│   └── pharmacy_schema.sql
├── Diagrama.png
├── README.md
└── .gitignore
```

---

## ⚙️ Instalación y ejecución local

Estas instrucciones corresponden al backend de la rama `develop`.
El frontend todavía no tiene comandos de instalación o ejecución.

### Requisitos previos

- Node.js y npm. El repositorio todavía no fija una versión de Node.js.
- PostgreSQL 14+
- Git
- Las herramientas de PostgreSQL, como `createdb`, disponibles en el PATH
  para usar los comandos siguientes.

### 1. Clonar el proyecto

```bash
git clone https://github.com/angietatianaalbaamado-bot/SALUD-360.git
cd SALUD-360
git switch develop
git pull --ff-only origin develop
```

### 2. Instalar dependencias y configurar el entorno

```bash
cd backend
npm install
```

Desde `backend`, crear el archivo de configuración en PowerShell:

```powershell
Copy-Item .env.example .env
```

En Bash:

```bash
cp .env.example .env
```

Editar `.env` con los datos de la base local y un secreto JWT propio:

| Variable | Uso |
| --- | --- |
| `PORT` | Puerto de la API; el ejemplo usa `3000` |
| `DB_HOST`, `DB_PORT` | Dirección y puerto de PostgreSQL |
| `DB_USERNAME`, `DB_PASSWORD` | Credenciales de la base de datos local |
| `DB_NAME` | Nombre de la base; el ejemplo usa `salud_plus_360` |
| `JWT_SECRET` | Secreto para firmar los tokens; reemplazar el valor de ejemplo |
| `JWT_EXPIRES_IN` | Duración del token; el ejemplo usa `1d` |

El archivo `.env` está excluido de Git; `.env.example` se comparte como plantilla.

### 3. Crear la base de datos local

```bash
createdb -h localhost -p 5432 -U postgres salud_plus_360
```

Ajustar host, puerto, usuario y nombre de base para que coincidan con `.env`.

La configuración actual de TypeORM tiene `synchronize: true`: al iniciar,
intenta crear o ajustar las tablas de las entidades registradas. Usar una base
local de desarrollo sin datos importantes. Esta opción debe desactivarse antes
de usar una base de producción.

Los archivos de [`database/`](database/) contienen esquemas SQL por módulo y
una migración de pacientes y médicos. Todavía no existe el comando
`npm run migration:run` ni un flujo unificado de migraciones. Revisar las
dependencias de cada script antes de ejecutarlo; no aplicar todos los esquemas
sobre las tablas que ya haya creado TypeORM.

La sincronización de tablas no carga los datos de los catálogos. Por ejemplo,
las citas usan estados como `Programada` y `Cancelada`, además de tipos de cita.
Esos datos deben prepararse para probar los flujos correspondientes.

### 4. Iniciar el backend

Desde la carpeta `backend`:

```bash
npm run start:dev
```

### 5. Documentación de la API

Con el backend iniciado y `PORT=3000`, abrir Swagger en:

[http://localhost:3000/api/docs](http://localhost:3000/api/docs)

El inicio de sesión se realiza con `POST /auth/login`. El token obtenido permite
probar `GET /auth/me` usando **Authorize** en Swagger. Si se cambia `PORT`,
ajustar también la URL.

### Comandos de compilación y pruebas

Ejecutar desde `backend`:

```bash
npm run build
npm test -- --runInBand
```

Las pruebas unitarias actuales están en
[`patients.service.spec.ts`](backend/src/patients/patients.service.spec.ts).
También existen [pruebas SQL de pacientes y médicos](database/tests/) para
una base de prueba independiente. La cobertura de todos los módulos y las
pruebas de integración siguen pendientes.

---

## 🌳 Flujo de trabajo con Git

```text
main
 └── develop
       ├── feature/auth
       ├── feature/users
       ├── feature/patients
       ├── feature/doctors
       ├── feature/appointments
       ├── feature/triage
       ├── feature/pharmacy
       ├── feature/laboratory
       ├── feature/billing
       └── feature/dashboard
```

### Reglas del proyecto

- No hacer cambios directamente sobre `main` ni `develop`.
- Cada integrante trabaja en su propia rama `feature/...`.
- Enviar los cambios mediante un Pull Request hacia `develop` para revisión.

### Flujo típico

```bash
# Actualizar develop antes de empezar
git switch develop
git pull --ff-only origin develop

# Crear rama de trabajo
git switch -c feature/mi-cambio

# Guardar cambios
git add ruta/del/archivo
git commit -m "docs: describir el cambio realizado"

# Subir cambios
git push -u origin feature/mi-cambio
```

Luego se abre un **Pull Request**: `feature/mi-cambio` → `develop`.
La integración de `develop` en `main` se revisa en un Pull Request separado.

---

## 📚 Módulos del sistema

Los siguientes módulos tienen código registrado en
[`app.module.ts`](backend/src/app.module.ts). La tabla describe lo implementado
en el código; la integración completa del sistema sigue en desarrollo.

| Módulo | Funciones presentes |
| --- | --- |
| Seguridad y accesos | Registro, inicio de sesión con JWT, perfil autenticado, hash de contraseñas y registro de accesos |
| Pacientes y médicos | Crear, consultar, actualizar y desactivar pacientes; entidades de médicos, especialidades y disponibilidad |
| Agenda y citas | Crear y consultar citas, cambiar su estado, consultar por médico o paciente y marcar notificaciones como leídas |
| Historia clínica | Historias, consultas, diagnósticos, tratamientos, prescripciones, notas, alergias y consulta de condiciones crónicas |
| Triage y enfermería | Registro de triage, signos vitales, notas y procedimientos de enfermería |
| Farmacia | Medicamentos, lotes, movimientos de inventario, consultas de existencias bajas y vencimientos, órdenes de medicación |
| Laboratorio e imágenes | Pruebas, órdenes y resultados de laboratorio e imágenes; procedimientos, quirófanos y vacunación |
| Hospitalización | Crear, consultar, actualizar y eliminar hospitalizaciones; entidades de habitaciones, camas, ambulancias y emergencias |
| Facturación y reportes | Facturas, registro de pagos y consulta de autorizaciones y reportes; entidades de EPS y catálogos generales |

Tener una entidad no implica que ya exista una pantalla o una API completa
para administrarla. Por ejemplo, médicos, camas y ambulancias todavía no tienen
controladores propios. El dashboard y la interfaz web están pendientes.

---

## 🗄 Modelo de base de datos

El [diagrama del proyecto](Diagrama.png) y la siguiente lista describen el
alcance del modelo. Las tablas y relaciones se implementan por módulo;
la lista no garantiza que todas las funciones estén terminadas o integradas.

| Módulo | Tabla |
| --- | --- |
| Seguridad | `users` |
| Seguridad | `roles` |
| Seguridad | `permissions` |
| Seguridad | `role_permissions` |
| Seguridad | `user_roles` |
| Seguridad | `sessions` |
| Seguridad | `audit_logs` |
| Pacientes | `patients` |
| Pacientes | `patient_contacts` |
| Pacientes | `patient_addresses` |
| Pacientes | `patient_documents` |
| Pacientes | `patient_photos` |
| Pacientes | `patient_insurance` |
| Médicos | `doctors` |
| Médicos | `specialties` |
| Médicos | `doctor_specialties` |
| Médicos | `doctor_schedule` |
| Médicos | `doctor_availability` |
| Historia Clínica | `medical_records` |
| Historia Clínica | `consultations` |
| Historia Clínica | `diagnoses` |
| Historia Clínica | `treatments` |
| Historia Clínica | `prescriptions` |
| Historia Clínica | `medical_notes` |
| Triage | `triages` |
| Triage | `vital_signs` |
| Triage | `pain_scale` |
| Triage | `triage_levels` |
| Citas | `appointments` |
| Citas | `appointment_status` |
| Citas | `appointment_types` |
| Hospitalización | `hospitalizations` |
| Hospitalización | `rooms` |
| Hospitalización | `room_types` |
| Hospitalización | `beds` |
| Hospitalización | `bed_assignments` |
| Farmacia | `medicines` |
| Farmacia | `medicine_categories` |
| Farmacia | `pharmaceutical_laboratories` |
| Farmacia | `medicine_presentations` |
| Farmacia | `medicine_batches` |
| Farmacia | `inventory` |
| Farmacia | `inventory_movements` |
| Administración de Medicamentos | `medication_orders` |
| Administración de Medicamentos | `medication_schedule` |
| Administración de Medicamentos | `medication_administration` |
| Laboratorio | `laboratory_orders` |
| Laboratorio | `laboratory_tests` |
| Laboratorio | `laboratory_results` |
| Laboratorio | `laboratory_categories` |
| Imagenología | `imaging_orders` |
| Imagenología | `imaging_results` |
| Imagenología | `imaging_types` |
| Enfermería | `nursing_notes` |
| Enfermería | `nursing_procedures` |
| Enfermería | `nursing_shift` |
| Procedimientos | `procedures` |
| Procedimientos | `procedure_types` |
| Procedimientos | `surgery_rooms` |
| Vacunación | `vaccines` |
| Vacunación | `vaccination_records` |
| Enfermedades | `diseases` |
| Enfermedades | `allergies` |
| Enfermedades | `chronic_conditions` |
| Facturación | `invoices` |
| Facturación | `invoice_details` |
| Facturación | `payments` |
| Facturación | `payment_methods` |
| EPS | `eps` |
| EPS | `authorizations` |
| EPS | `insurance_plans` |
| Ambulancias | `ambulances` |
| Ambulancias | `ambulance_drivers` |
| Ambulancias | `ambulance_services` |
| Emergencias | `emergencies` |
| Emergencias | `emergency_events` |
| Emergencias | `emergency_priority` |
| Notificaciones | `notifications` |
| Notificaciones | `notification_templates` |
| Reportes | `reports` |
| Reportes | `report_exports` |
| Configuración | `settings` |
| Configuración | `countries` |
| Configuración | `departments` |
| Configuración | `cities` |
| Configuración | `document_types` |
| Configuración | `genders` |
| Configuración | `blood_types` |
| Configuración | `marital_status` |

### Resumen de entidades

| Módulo | Tablas |
| --- | ---: |
| Seguridad | 7 |
| Pacientes | 6 |
| Médicos | 5 |
| Historia Clínica | 6 |
| Triage | 4 |
| Citas | 3 |
| Hospitalización | 5 |
| Farmacia | 7 |
| Administración de Medicamentos | 3 |
| Laboratorio | 4 |
| Imagenología | 3 |
| Enfermería | 3 |
| Procedimientos | 3 |
| Vacunación | 2 |
| Enfermedades | 3 |
| Facturación | 4 |
| EPS | 3 |
| Ambulancias | 3 |
| Emergencias | 3 |
| Notificaciones | 2 |
| Reportes | 2 |
| Configuración | 8 |
| **Total del listado** | **89 tablas** |

---

## 👨‍💻 Distribución del equipo

| # | Módulo | # | Módulo |
| --- | --- | --- | --- |
| 1 | Autenticación | 17 | Administración de Medicamentos |
| 2 | Usuarios | 18 | Laboratorio |
| 3 | Roles y permisos | 19 | Imagenología |
| 4 | Pacientes | 20 | Hospitalización |
| 5 | Médicos | 21 | Habitaciones y Camas |
| 6 | Especialidades | 22 | Enfermería |
| 7 | Agenda Médica | 23 | Procedimientos |
| 8 | Citas | 24 | Vacunación |
| 9 | Historia Clínica | 25 | Facturación |
| 10 | Triage | 26 | Pagos |
| 11 | Signos Vitales | 27 | EPS y Autorizaciones |
| 12 | Diagnósticos | 28 | Ambulancias |
| 13 | Tratamientos | 29 | Emergencias |
| 14 | Farmacia | 30 | Reportes |
| 15 | Inventario | 31 | Notificaciones |
| 16 | Medicamentos | 32 | Dashboard y Configuración |

---

## 🔐 Seguridad

El código actual incluye hash de contraseñas con bcryptjs, autenticación JWT,
protección de `GET /auth/me`, validación global de los DTO y registro de los
eventos de registro e inicio de sesión en `audit_logs`.

La protección JWT todavía no se aplica a todas las rutas. Existen entidades
de roles, permisos y sesiones, pero siguen pendientes la administración y
asignación de roles y permisos, la recuperación de contraseña y el uso activo
de la tabla de sesiones. Consultar el [módulo de autenticación](backend/src/auth/README.md).

---

## 🚀 Funcionalidades futuras

- Interfaz web en React y dashboard
- Completar la integración entre módulos y sus relaciones de base de datos
- Unificar migraciones y carga inicial de catálogos
- Completar permisos, protección de rutas y pruebas de integración
- Aplicación móvil
- Inteligencia artificial para apoyo clínico
- Chat médico-paciente y videoconsultas
- Firma digital
- Integración con dispositivos médicos
- Dashboard en tiempo real
- Código QR para pacientes
- Notificaciones push
- Generación automática de reportes en PDF

---

## 📄 Licencia

Este proyecto se desarrolla con **fines académicos**, como práctica de
Ingeniería de Software, trabajo colaborativo y buenas prácticas de desarrollo.
El código se distribuye bajo licencia **MIT**, por lo que puede reutilizarse,
modificarse y compartirse libremente, dando el crédito correspondiente.

---

## ⭐ Estado del proyecto

> 🚧 **En desarrollo** — Backend con nueve módulos registrados, entidades,
> scripts SQL y pruebas de pacientes y médicos. La integración completa, el
> frontend y el dashboard siguen pendientes. Los cambios se revisan mediante
> Pull Requests hacia `develop`.

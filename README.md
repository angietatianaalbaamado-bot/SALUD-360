# 🏥 SALUD+ 360

## Sistema Integral Inteligente para la Gestión Hospitalaria

Plataforma web para hospitales, clínicas, IPS y centros médicos.

![Version](https://img.shields.io/badge/version-1.0-blue)
![Backend](https://img.shields.io/badge/NestJS-Backend-red)
![Frontend](https://img.shields.io/badge/React-Frontend-61DAFB)
![Database](https://img.shields.io/badge/PostgreSQL-Database-blue)
![License](https://img.shields.io/badge/License-MIT-green)
![Status](https://img.shields.io/badge/Status-En%20Desarrollo-yellow)

- [Repositorio](https://github.com/angietatianaalbaamado-bot/-SALUD-360)
- [Reportar un problema](https://github.com/angietatianaalbaamado-bot/-SALUD-360/issues)

---

## 📌 Descripción

**SALUD+ 360** es una plataforma integral de gestión hospitalaria diseñada
para optimizar los procesos administrativos, clínicos y asistenciales de
hospitales, clínicas, IPS y centros médicos.

El sistema permite administrar desde el ingreso del paciente hasta su egreso,
centralizando toda la información clínica, administrativa y financiera en una
única plataforma moderna, segura y escalable.

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

Arquitectura basada en tres capas:

```text
   React (Frontend)
         │
         ▼
NestJS API REST (Backend)
         │
         ▼
   PostgreSQL (Base de datos)
```

---

## 🚀 Tecnologías

| Capa | Tecnologías |
| --- | --- |
| **Frontend** | React, Vite, TypeScript, Tailwind CSS, React Router, Axios |
| **Backend** | NestJS, TypeORM, JWT, Passport, Swagger, Class Validator |
| **Base de datos** | PostgreSQL |
| **Herramientas** | Git, GitHub, Postman, Docker, Figma, Draw.io, VS Code |

---

## 📁 Estructura del proyecto

```text
SALUD-PLUS-360
├── backend
├── frontend
├── database
├── docs
├── diagrams
├── postman
├── README.md
└── .gitignore
```

---

## ⚙️ Instalación y ejecución local

> ⚠️ **Nota:** el repositorio aún no tiene código publicado. Esta sección
> es un placeholder con la estructura esperada de comandos; se actualizará a
> medida que se suban el backend y el frontend.

### Requisitos previos

- Node.js 18+
- PostgreSQL 14+
- npm o yarn
- Git

### 1. Clonar el proyecto

```bash
git clone https://github.com/angietatianaalbaamado-bot/-SALUD-360.git
cd -SALUD-360
```

### 2. Backend (NestJS)

```bash
cd backend
npm install
cp .env.example .env    # configurar variables de entorno (DB, JWT, etc.)
npm run start:dev
```

### 3. Frontend (React + Vite)

```bash
cd frontend
npm install
cp .env.example .env    # configurar URL del API
npm run dev
```

### 4. Base de datos

```bash
# Crear la base de datos en PostgreSQL
createdb salud_plus_360

# Ejecutar migraciones (una vez existan)
npm run migration:run
```

### 5. Documentación de la API

Una vez el backend esté corriendo, la documentación Swagger estará disponible en:

```text
http://localhost:3000/api/docs
```

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

✅ Nunca trabajar directamente sobre `main`
✅ Nunca trabajar directamente sobre `develop`
✅ Cada integrante trabaja en su propia rama `feature/...`

### Flujo típico

```bash
# Crear y subir develop (una sola vez)
git checkout -b develop
git push -u origin develop

# Actualizar develop antes de empezar
git checkout develop
git pull origin develop

# Crear rama de trabajo
git checkout -b feature/patients

# Guardar cambios
git add .
git commit -m "feat: crear entidad Patient"

# Subir cambios
git push origin feature/patients
```

Luego se abre un **Pull Request**: `feature/patients` → `develop` → `main`.

---

## 📚 Módulos del sistema

Seguridad · Usuarios · Roles · Pacientes · Médicos · Especialidades ·
Agenda Médica · Citas · Historia Clínica · Triage · Hospitalización ·
Farmacia · Inventario · Medicamentos · Laboratorio · Imagenología ·
Enfermería · Procedimientos · Vacunación · Facturación · EPS ·
Ambulancias · Emergencias · Reportes · Dashboard · Configuración

---

## 🗄 Modelo de base de datos

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
| **Total aproximado** | **90 tablas** |

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

JWT · Hash de contraseñas · Roles y permisos · Validaciones · Auditoría y
logs · Protección de rutas · Control de sesiones

---

## 🚀 Funcionalidades futuras

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

> 🚧 **En desarrollo** — Proyecto colaborativo con metodología Git Flow y
> desarrollo por módulos. Aún no hay código publicado en el repositorio.

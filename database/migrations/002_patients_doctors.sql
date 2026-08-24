-- SALUD+ 360
-- Modulo 2: Pacientes y Medicos
-- PostgreSQL 14+
--
-- Dependencias administradas por otros modulos:
--   users, document_types, genders, blood_types, marital_status,
--   countries, departments, cities, eps, insurance_plans.
-- Estas tablas deben existir antes de ejecutar esta migracion.

BEGIN;

-- Necesaria para las restricciones de exclusion que evitan horarios cruzados.
CREATE EXTENSION IF NOT EXISTS btree_gist;

CREATE OR REPLACE FUNCTION set_patients_doctors_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
    NEW.updated_at = clock_timestamp();
    RETURN NEW;
END;
$$;

CREATE TABLE specialties (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(120) NOT NULL,
    description TEXT,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_specialties_name UNIQUE (name)
);

CREATE TABLE patients (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    document_type_id INTEGER NOT NULL,
    document_number VARCHAR(30) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    middle_name VARCHAR(100),
    last_name VARCHAR(100) NOT NULL,
    second_last_name VARCHAR(100),
    birth_date DATE NOT NULL,
    gender_id INTEGER NOT NULL,
    blood_type_id INTEGER,
    marital_status_id INTEGER,
    email VARCHAR(254),
    phone VARCHAR(30),
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_patients_document_type
        FOREIGN KEY (document_type_id) REFERENCES document_types (id),
    CONSTRAINT fk_patients_gender
        FOREIGN KEY (gender_id) REFERENCES genders (id),
    CONSTRAINT fk_patients_blood_type
        FOREIGN KEY (blood_type_id) REFERENCES blood_types (id),
    CONSTRAINT fk_patients_marital_status
        FOREIGN KEY (marital_status_id) REFERENCES marital_status (id),
    CONSTRAINT uq_patients_document
        UNIQUE (document_type_id, document_number),
    CONSTRAINT chk_patients_birth_date
        CHECK (birth_date <= CURRENT_DATE)
);

CREATE TABLE patient_contacts (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    patient_id INTEGER NOT NULL,
    full_name VARCHAR(200) NOT NULL,
    relationship VARCHAR(80) NOT NULL,
    phone VARCHAR(30) NOT NULL,
    email VARCHAR(254),
    is_emergency_contact BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_patient_contacts_patient
        FOREIGN KEY (patient_id) REFERENCES patients (id) ON DELETE CASCADE
);

CREATE TABLE patient_addresses (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    patient_id INTEGER NOT NULL,
    country_id INTEGER NOT NULL,
    department_id INTEGER NOT NULL,
    city_id INTEGER NOT NULL,
    address VARCHAR(250) NOT NULL,
    neighborhood VARCHAR(120),
    postal_code VARCHAR(20),
    is_primary BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_patient_addresses_patient
        FOREIGN KEY (patient_id) REFERENCES patients (id) ON DELETE CASCADE,
    CONSTRAINT fk_patient_addresses_country
        FOREIGN KEY (country_id) REFERENCES countries (id),
    CONSTRAINT fk_patient_addresses_department
        FOREIGN KEY (department_id) REFERENCES departments (id),
    CONSTRAINT fk_patient_addresses_city
        FOREIGN KEY (city_id) REFERENCES cities (id)
);

CREATE TABLE patient_documents (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    patient_id INTEGER NOT NULL,
    document_type_id INTEGER NOT NULL,
    file_url TEXT NOT NULL,
    uploaded_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_patient_documents_patient
        FOREIGN KEY (patient_id) REFERENCES patients (id) ON DELETE CASCADE,
    CONSTRAINT fk_patient_documents_document_type
        FOREIGN KEY (document_type_id) REFERENCES document_types (id),
    CONSTRAINT uq_patient_documents_file
        UNIQUE (patient_id, document_type_id, file_url)
);

CREATE TABLE patient_photos (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    patient_id INTEGER NOT NULL,
    file_url TEXT NOT NULL,
    is_current BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_patient_photos_patient
        FOREIGN KEY (patient_id) REFERENCES patients (id) ON DELETE CASCADE
);

CREATE TABLE patient_insurance (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    patient_id INTEGER NOT NULL,
    eps_id INTEGER NOT NULL,
    insurance_plan_id INTEGER,
    membership_number VARCHAR(80) NOT NULL,
    valid_from DATE,
    valid_until DATE,
    is_primary BOOLEAN NOT NULL DEFAULT FALSE,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_patient_insurance_patient
        FOREIGN KEY (patient_id) REFERENCES patients (id) ON DELETE CASCADE,
    CONSTRAINT fk_patient_insurance_eps
        FOREIGN KEY (eps_id) REFERENCES eps (id),
    CONSTRAINT fk_patient_insurance_plan
        FOREIGN KEY (insurance_plan_id) REFERENCES insurance_plans (id),
    CONSTRAINT uq_patient_insurance_membership
        UNIQUE (eps_id, membership_number),
    CONSTRAINT chk_patient_insurance_dates
        CHECK (valid_until IS NULL OR valid_from IS NULL OR valid_until >= valid_from)
);

CREATE TABLE doctors (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id INTEGER,
    document_type_id INTEGER NOT NULL,
    document_number VARCHAR(30) NOT NULL,
    medical_license VARCHAR(80) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    middle_name VARCHAR(100),
    last_name VARCHAR(100) NOT NULL,
    second_last_name VARCHAR(100),
    phone VARCHAR(30),
    email VARCHAR(254),
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_doctors_user
        FOREIGN KEY (user_id) REFERENCES users (id),
    CONSTRAINT fk_doctors_document_type
        FOREIGN KEY (document_type_id) REFERENCES document_types (id),
    CONSTRAINT uq_doctors_user UNIQUE (user_id),
    CONSTRAINT uq_doctors_document UNIQUE (document_type_id, document_number),
    CONSTRAINT uq_doctors_medical_license UNIQUE (medical_license)
);

CREATE TABLE doctor_specialties (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    doctor_id INTEGER NOT NULL,
    specialty_id INTEGER NOT NULL,
    is_primary BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_doctor_specialties_doctor
        FOREIGN KEY (doctor_id) REFERENCES doctors (id) ON DELETE CASCADE,
    CONSTRAINT fk_doctor_specialties_specialty
        FOREIGN KEY (specialty_id) REFERENCES specialties (id),
    CONSTRAINT uq_doctor_specialties UNIQUE (doctor_id, specialty_id)
);

CREATE TABLE doctor_schedule (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    doctor_id INTEGER NOT NULL,
    day_of_week SMALLINT NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    slot_duration_minutes SMALLINT NOT NULL DEFAULT 30,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_doctor_schedule_doctor
        FOREIGN KEY (doctor_id) REFERENCES doctors (id) ON DELETE CASCADE,
    CONSTRAINT chk_doctor_schedule_day CHECK (day_of_week BETWEEN 0 AND 6),
    CONSTRAINT chk_doctor_schedule_time CHECK (end_time > start_time),
    CONSTRAINT chk_doctor_schedule_slot CHECK (slot_duration_minutes > 0),
    CONSTRAINT ex_doctor_schedule_no_overlap
        EXCLUDE USING gist (
            doctor_id WITH =,
            day_of_week WITH =,
            tsrange(
                DATE '2000-01-01' + start_time,
                DATE '2000-01-01' + end_time,
                '[)'
            ) WITH &&
        ) WHERE (is_active)
);

CREATE TABLE doctor_availability (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    doctor_id INTEGER NOT NULL,
    availability_date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    is_available BOOLEAN NOT NULL DEFAULT TRUE,
    reason VARCHAR(250),
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_doctor_availability_doctor
        FOREIGN KEY (doctor_id) REFERENCES doctors (id) ON DELETE CASCADE,
    CONSTRAINT chk_doctor_availability_time CHECK (end_time > start_time),
    CONSTRAINT ex_doctor_availability_no_overlap
        EXCLUDE USING gist (
            doctor_id WITH =,
            availability_date WITH =,
            tsrange(
                availability_date + start_time,
                availability_date + end_time,
                '[)'
            ) WITH &&
        )
);

CREATE TRIGGER trg_specialties_updated_at
    BEFORE UPDATE ON specialties
    FOR EACH ROW EXECUTE FUNCTION set_patients_doctors_updated_at();

CREATE TRIGGER trg_patients_updated_at
    BEFORE UPDATE ON patients
    FOR EACH ROW EXECUTE FUNCTION set_patients_doctors_updated_at();

CREATE TRIGGER trg_patient_contacts_updated_at
    BEFORE UPDATE ON patient_contacts
    FOR EACH ROW EXECUTE FUNCTION set_patients_doctors_updated_at();

CREATE TRIGGER trg_patient_addresses_updated_at
    BEFORE UPDATE ON patient_addresses
    FOR EACH ROW EXECUTE FUNCTION set_patients_doctors_updated_at();

CREATE TRIGGER trg_patient_documents_updated_at
    BEFORE UPDATE ON patient_documents
    FOR EACH ROW EXECUTE FUNCTION set_patients_doctors_updated_at();

CREATE TRIGGER trg_patient_insurance_updated_at
    BEFORE UPDATE ON patient_insurance
    FOR EACH ROW EXECUTE FUNCTION set_patients_doctors_updated_at();

CREATE TRIGGER trg_doctors_updated_at
    BEFORE UPDATE ON doctors
    FOR EACH ROW EXECUTE FUNCTION set_patients_doctors_updated_at();

CREATE TRIGGER trg_doctor_schedule_updated_at
    BEFORE UPDATE ON doctor_schedule
    FOR EACH ROW EXECUTE FUNCTION set_patients_doctors_updated_at();

CREATE TRIGGER trg_doctor_availability_updated_at
    BEFORE UPDATE ON doctor_availability
    FOR EACH ROW EXECUTE FUNCTION set_patients_doctors_updated_at();

CREATE INDEX idx_patient_contacts_patient_id ON patient_contacts (patient_id);
CREATE INDEX idx_patient_addresses_patient_id ON patient_addresses (patient_id);
CREATE INDEX idx_patient_documents_patient_id ON patient_documents (patient_id);
CREATE INDEX idx_patient_photos_patient_id ON patient_photos (patient_id);
CREATE INDEX idx_patient_insurance_patient_id ON patient_insurance (patient_id);
CREATE INDEX idx_doctors_name ON doctors (last_name, first_name);
CREATE INDEX idx_doctor_specialties_specialty_id ON doctor_specialties (specialty_id);
CREATE INDEX idx_doctor_schedule_doctor_day ON doctor_schedule (doctor_id, day_of_week);
CREATE INDEX idx_doctor_availability_doctor_date
    ON doctor_availability (doctor_id, availability_date);

CREATE UNIQUE INDEX uq_patient_primary_address
    ON patient_addresses (patient_id)
    WHERE is_primary;

CREATE UNIQUE INDEX uq_patient_current_photo
    ON patient_photos (patient_id)
    WHERE is_current;

CREATE UNIQUE INDEX uq_patient_primary_insurance
    ON patient_insurance (patient_id)
    WHERE is_primary AND is_active;

CREATE UNIQUE INDEX uq_doctor_primary_specialty
    ON doctor_specialties (doctor_id)
    WHERE is_primary;

COMMIT;

-- SOLO PARA PRUEBAS LOCALES EN salud360_pruebas.
-- Ejecutar despues de 001_test_dependencies.sql y 002_patients_doctors.sql.
-- Los datos se revierten al finalizar la prueba.

BEGIN;

INSERT INTO users DEFAULT VALUES;
INSERT INTO document_types (name) VALUES ('Cedula de ciudadania');
INSERT INTO genders (name) VALUES ('Femenino');
INSERT INTO blood_types (name) VALUES ('O+');
INSERT INTO marital_status (name) VALUES ('Soltero');
INSERT INTO countries (name) VALUES ('Colombia');
INSERT INTO departments (country_id, name) VALUES (1, 'Cundinamarca');
INSERT INTO cities (department_id, name) VALUES (1, 'Bogota');
INSERT INTO eps (name) VALUES ('EPS de prueba');
INSERT INTO insurance_plans (eps_id, name) VALUES (1, 'Plan basico');

INSERT INTO specialties (name, description)
VALUES ('Medicina general', 'Especialidad de prueba');

INSERT INTO patients (
    document_type_id,
    document_number,
    first_name,
    last_name,
    birth_date,
    gender_id,
    blood_type_id,
    marital_status_id,
    email,
    phone
) VALUES (
    1,
    '100000001',
    'Ana',
    'Prueba',
    DATE '1990-01-01',
    1,
    1,
    1,
    'ana.prueba@example.com',
    '3000000000'
);

INSERT INTO patient_contacts (
    patient_id, full_name, relationship, phone, is_emergency_contact
) VALUES (1, 'Luis Prueba', 'Familiar', '3000000001', TRUE);

INSERT INTO patient_addresses (
    patient_id, country_id, department_id, city_id, address, is_primary
) VALUES (1, 1, 1, 1, 'Calle 1 # 2-3', TRUE);

INSERT INTO patient_documents (
    patient_id, document_type_id, file_url
) VALUES (1, 1, 'https://example.com/documento-prueba.pdf');

INSERT INTO patient_photos (patient_id, file_url, is_current)
VALUES (1, 'https://example.com/foto-prueba.jpg', TRUE);

INSERT INTO patient_insurance (
    patient_id, eps_id, insurance_plan_id, membership_number, is_primary
) VALUES (1, 1, 1, 'AFILIACION-001', TRUE);

INSERT INTO doctors (
    user_id,
    document_type_id,
    document_number,
    medical_license,
    first_name,
    last_name,
    email
) VALUES (
    1,
    1,
    '200000001',
    'RM-001',
    'Carlos',
    'Medico',
    'carlos.medico@example.com'
);

INSERT INTO doctor_specialties (doctor_id, specialty_id, is_primary)
VALUES (1, 1, TRUE);

INSERT INTO doctor_schedule (
    doctor_id, day_of_week, start_time, end_time
) VALUES (1, 1, TIME '08:00', TIME '12:00');

INSERT INTO doctor_availability (
    doctor_id, availability_date, start_time, end_time
) VALUES (1, DATE '2026-09-01', TIME '08:00', TIME '12:00');

DO $$
DECLARE
    old_updated_at TIMESTAMPTZ;
    new_updated_at TIMESTAMPTZ;
BEGIN
    SELECT updated_at INTO old_updated_at FROM patients WHERE id = 1;
    PERFORM pg_sleep(0.01);
    UPDATE patients SET phone = '3000000099' WHERE id = 1;
    SELECT updated_at INTO new_updated_at FROM patients WHERE id = 1;

    IF new_updated_at <= old_updated_at THEN
        RAISE EXCEPTION 'Fallo: updated_at no cambio al actualizar el paciente';
    END IF;
END;
$$;

DO $$
DECLARE
    overlap_rejected BOOLEAN := FALSE;
BEGIN
    BEGIN
        INSERT INTO doctor_schedule (
            doctor_id, day_of_week, start_time, end_time
        ) VALUES (1, 1, TIME '10:00', TIME '14:00');
    EXCEPTION
        WHEN exclusion_violation THEN
            overlap_rejected := TRUE;
    END;

    IF NOT overlap_rejected THEN
        RAISE EXCEPTION 'Fallo: se permitio un horario medico cruzado';
    END IF;
END;
$$;

DO $$
BEGIN
    IF (SELECT COUNT(*) FROM patients) <> 1 THEN
        RAISE EXCEPTION 'Fallo: cantidad inesperada de pacientes';
    END IF;

    IF (SELECT COUNT(*) FROM doctors) <> 1 THEN
        RAISE EXCEPTION 'Fallo: cantidad inesperada de medicos';
    END IF;

    IF (SELECT COUNT(*) FROM doctor_specialties) <> 1 THEN
        RAISE EXCEPTION 'Fallo: la especialidad no quedo asociada al medico';
    END IF;
END;
$$;

SELECT 'PRUEBAS SUPERADAS' AS resultado;

ROLLBACK;

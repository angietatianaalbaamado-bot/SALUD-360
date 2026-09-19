CREATE OR REPLACE FUNCTION set_medical_records_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$;

CREATE TABLE diseases (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    cie10_code VARCHAR(10) UNIQUE
);

CREATE TABLE allergies (
    id SERIAL PRIMARY KEY,
    patient_id INT NOT NULL,
    disease_id INT REFERENCES diseases(id),
    severity VARCHAR(30) NOT NULL DEFAULT 'leve'
        CHECK (severity IN ('leve', 'moderada', 'severa')),
    created_at TIMESTAMP NOT NULL DEFAULT now()
);

CREATE TABLE chronic_conditions (
    id SERIAL PRIMARY KEY,
    patient_id INT NOT NULL,
    disease_id INT REFERENCES diseases(id),
    diagnosed_at DATE NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT now()
);

CREATE TABLE medical_records (
    id SERIAL PRIMARY KEY,
    patient_id INT NOT NULL,
    doctor_id INT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT now()
);

CREATE TABLE consultations (
    id SERIAL PRIMARY KEY,
    medical_record_id INT NOT NULL REFERENCES medical_records(id) ON DELETE CASCADE,
    appointment_id INT,
    reason VARCHAR(250) NOT NULL,
    notes TEXT,
    consultation_date TIMESTAMP NOT NULL DEFAULT now()
);

CREATE TABLE diagnoses (
    id SERIAL PRIMARY KEY,
    consultation_id INT NOT NULL REFERENCES consultations(id) ON DELETE CASCADE,
    disease_id INT REFERENCES diseases(id),
    description TEXT NOT NULL
);

CREATE TABLE treatments (
    id SERIAL PRIMARY KEY,
    diagnosis_id INT NOT NULL REFERENCES diagnoses(id) ON DELETE CASCADE,
    description TEXT NOT NULL,
    start_date DATE NOT NULL DEFAULT CURRENT_DATE,
    end_date DATE,
    CONSTRAINT chk_treatments_dates CHECK (end_date IS NULL OR end_date >= start_date)
);

CREATE TABLE prescriptions (
    id SERIAL PRIMARY KEY,
    consultation_id INT NOT NULL REFERENCES consultations(id) ON DELETE CASCADE,
    medicine_id INT NOT NULL,
    dosage VARCHAR(150) NOT NULL,
    duration_days SMALLINT NOT NULL CHECK (duration_days > 0)
);

CREATE TABLE medical_notes (
    id SERIAL PRIMARY KEY,
    medical_record_id INT NOT NULL REFERENCES medical_records(id) ON DELETE CASCADE,
    note TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT now()
);

CREATE INDEX idx_allergies_patient_id ON allergies(patient_id);
CREATE INDEX idx_chronic_conditions_patient_id ON chronic_conditions(patient_id);
CREATE INDEX idx_medical_records_patient_id ON medical_records(patient_id);
CREATE INDEX idx_medical_records_doctor_id ON medical_records(doctor_id);
CREATE INDEX idx_consultations_medical_record_id ON consultations(medical_record_id);
CREATE INDEX idx_diagnoses_consultation_id ON diagnoses(consultation_id);
CREATE INDEX idx_treatments_diagnosis_id ON treatments(diagnosis_id);
CREATE INDEX idx_prescriptions_consultation_id ON prescriptions(consultation_id);
CREATE INDEX idx_medical_notes_medical_record_id ON medical_notes(medical_record_id);

INSERT INTO diseases (name, cie10_code) VALUES
    ('Hipertension arterial', 'I10'),
    ('Diabetes mellitus tipo 2', 'E11'),
    ('Rinitis alergica', 'J30'),
    ('Asma', 'J45'),
    ('Migraña', 'G43'),
    ('Gastritis', 'K29'),
    ('Infeccion respiratoria aguda', 'J06');
CREATE OR REPLACE FUNCTION set_appointments_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$;

CREATE TABLE appointment_status (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE appointment_types (
    id SERIAL PRIMARY KEY,
    name VARCHAR(80) NOT NULL UNIQUE,
    default_duration_minutes SMALLINT NOT NULL DEFAULT 30
);

CREATE TABLE notification_templates (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    content TEXT NOT NULL
);

CREATE TABLE appointments (
    id SERIAL PRIMARY KEY,
    patient_id INT NOT NULL,
    doctor_id INT NOT NULL,
    appointment_type_id INT NOT NULL REFERENCES appointment_types(id),
    appointment_status_id INT NOT NULL REFERENCES appointment_status(id),
    scheduled_at TIMESTAMP NOT NULL,
    reason VARCHAR(250),
    created_at TIMESTAMP NOT NULL DEFAULT now(),
    updated_at TIMESTAMP NOT NULL DEFAULT now(),
    CONSTRAINT chk_appointments_future CHECK (scheduled_at >= '2000-01-01')
);

CREATE TABLE notifications (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    notification_template_id INT NOT NULL REFERENCES notification_templates(id),
    appointment_id INT REFERENCES appointments(id) ON DELETE CASCADE,
    sent_at TIMESTAMP,
    is_read BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP NOT NULL DEFAULT now()
);

CREATE TRIGGER trg_appointments_updated_at
    BEFORE UPDATE ON appointments
    FOR EACH ROW EXECUTE FUNCTION set_appointments_updated_at();

CREATE INDEX idx_appointments_patient_id ON appointments(patient_id);
CREATE INDEX idx_appointments_doctor_id ON appointments(doctor_id);
CREATE INDEX idx_appointments_scheduled_at ON appointments(scheduled_at);
CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_appointment_id ON notifications(appointment_id);

INSERT INTO appointment_status (name) VALUES
    ('Programada'), ('Confirmada'), ('En curso'), ('Completada'), ('Cancelada'), ('No asistio');

INSERT INTO appointment_types (name, default_duration_minutes) VALUES
    ('Consulta general', 20), ('Consulta especializada', 30), ('Control', 15), ('Procedimiento', 45), ('Urgencia', 30);

INSERT INTO notification_templates (name, content) VALUES
    ('recordatorio_cita', 'Recordatorio: tienes una cita programada el {fecha} a las {hora}.'),
    ('cita_confirmada', 'Tu cita del {fecha} ha sido confirmada.'),
    ('cita_cancelada', 'Tu cita del {fecha} ha sido cancelada.');
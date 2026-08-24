-- =========================================================
-- SALUD+ 360 - Modulo: Facturacion y Reportes
-- Responsable: Tatiana Alba
-- Motor: PostgreSQL
-- =========================================================

-- =========== CONFIGURACION GENERAL ===========

CREATE TABLE countries (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE departments (
    id SERIAL PRIMARY KEY,
    country_id INT NOT NULL REFERENCES countries(id),
    name VARCHAR(100) NOT NULL
);

CREATE TABLE cities (
    id SERIAL PRIMARY KEY,
    department_id INT NOT NULL REFERENCES departments(id),
    name VARCHAR(100) NOT NULL
);

CREATE TABLE document_types (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);

CREATE TABLE genders (
    id SERIAL PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);

CREATE TABLE blood_types (
    id SERIAL PRIMARY KEY,
    name VARCHAR(10) NOT NULL
);

CREATE TABLE marital_status (
    id SERIAL PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);

CREATE TABLE settings (
    id SERIAL PRIMARY KEY,
    key VARCHAR(100) NOT NULL UNIQUE,
    value VARCHAR(255)
);

-- =========== EPS Y AUTORIZACIONES ===========

CREATE TABLE eps (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    nit VARCHAR(30) NOT NULL UNIQUE
);

CREATE TABLE insurance_plans (
    id SERIAL PRIMARY KEY,
    eps_id INT NOT NULL REFERENCES eps(id),
    name VARCHAR(150) NOT NULL
);

CREATE TABLE authorizations (
    id SERIAL PRIMARY KEY,
    patient_id INT NOT NULL,
    eps_id INT NOT NULL REFERENCES eps(id),
    procedure_id INT,
    status VARCHAR(20) NOT NULL DEFAULT 'pending'
        CHECK (status IN ('pending', 'approved', 'rejected')),
    authorized_at TIMESTAMP NOT NULL DEFAULT now()
);

-- =========== FACTURACION ===========

CREATE TABLE payment_methods (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);

CREATE TABLE invoices (
    id SERIAL PRIMARY KEY,
    patient_id INT NOT NULL,
    total DECIMAL(12,2) NOT NULL DEFAULT 0,
    status VARCHAR(20) NOT NULL DEFAULT 'pending'
        CHECK (status IN ('pending', 'paid', 'cancelled', 'partial')),
    created_at TIMESTAMP NOT NULL DEFAULT now()
);

CREATE TABLE invoice_details (
    id SERIAL PRIMARY KEY,
    invoice_id INT NOT NULL REFERENCES invoices(id) ON DELETE CASCADE,
    concept VARCHAR(200) NOT NULL,
    amount DECIMAL(12,2) NOT NULL
);

CREATE TABLE payments (
    id SERIAL PRIMARY KEY,
    invoice_id INT NOT NULL REFERENCES invoices(id),
    payment_method_id INT NOT NULL REFERENCES payment_methods(id),
    amount DECIMAL(12,2) NOT NULL,
    paid_at TIMESTAMP NOT NULL DEFAULT now()
);

-- =========== REPORTES ===========

CREATE TABLE reports (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    created_by INT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT now()
);

CREATE TABLE report_exports (
    id SERIAL PRIMARY KEY,
    report_id INT NOT NULL REFERENCES reports(id),
    format VARCHAR(10) NOT NULL CHECK (format IN ('pdf', 'xlsx', 'csv')),
    file_url VARCHAR(255) NOT NULL,
    exported_at TIMESTAMP NOT NULL DEFAULT now()
);

-- =========================================================
-- Indices recomendados
-- =========================================================

CREATE INDEX idx_invoices_patient_id ON invoices(patient_id);
CREATE INDEX idx_invoice_details_invoice_id ON invoice_details(invoice_id);
CREATE INDEX idx_payments_invoice_id ON payments(invoice_id);
CREATE INDEX idx_authorizations_patient_id ON authorizations(patient_id);
CREATE INDEX idx_authorizations_eps_id ON authorizations(eps_id);
CREATE INDEX idx_cities_department_id ON cities(department_id);
CREATE INDEX idx_departments_country_id ON departments(country_id);

-- =========================================================
-- Datos iniciales de referencia (catalogos)
-- =========================================================

INSERT INTO document_types (name) VALUES
    ('Cedula de Ciudadania'),
    ('Tarjeta de Identidad'),
    ('Cedula de Extranjeria'),
    ('Pasaporte'),
    ('Registro Civil');

INSERT INTO genders (name) VALUES
    ('Masculino'),
    ('Femenino'),
    ('Otro');

INSERT INTO blood_types (name) VALUES
    ('O+'), ('O-'), ('A+'), ('A-'), ('B+'), ('B-'), ('AB+'), ('AB-');

INSERT INTO marital_status (name) VALUES
    ('Soltero(a)'),
    ('Casado(a)'),
    ('Union libre'),
    ('Divorciado(a)'),
    ('Viudo(a)');

INSERT INTO payment_methods (name) VALUES
    ('Efectivo'),
    ('Tarjeta de credito'),
    ('Tarjeta debito'),
    ('Transferencia bancaria'),
    ('PSE');

INSERT INTO countries (name) VALUES ('Colombia');

CREATE OR REPLACE FUNCTION set_pharmacy_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$;

CREATE TABLE medicine_categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE pharmaceutical_laboratories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL UNIQUE
);

CREATE TABLE medicines (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    medicine_category_id INT REFERENCES medicine_categories(id),
    laboratory_id INT REFERENCES pharmaceutical_laboratories(id),
    created_at TIMESTAMP NOT NULL DEFAULT now()
);

CREATE TABLE medicine_presentations (
    id SERIAL PRIMARY KEY,
    medicine_id INT NOT NULL REFERENCES medicines(id) ON DELETE CASCADE,
    presentation VARCHAR(80) NOT NULL,
    concentration VARCHAR(50)
);

CREATE TABLE medicine_batches (
    id SERIAL PRIMARY KEY,
    medicine_id INT NOT NULL REFERENCES medicines(id) ON DELETE CASCADE,
    batch_number VARCHAR(50) NOT NULL,
    expiration_date DATE NOT NULL,
    CONSTRAINT uq_medicine_batches UNIQUE (medicine_id, batch_number)
);

CREATE TABLE inventory (
    id SERIAL PRIMARY KEY,
    medicine_batch_id INT NOT NULL REFERENCES medicine_batches(id) ON DELETE CASCADE,
    quantity INT NOT NULL DEFAULT 0 CHECK (quantity >= 0),
    updated_at TIMESTAMP NOT NULL DEFAULT now()
);

CREATE TABLE inventory_movements (
    id SERIAL PRIMARY KEY,
    inventory_id INT NOT NULL REFERENCES inventory(id) ON DELETE CASCADE,
    movement_type VARCHAR(20) NOT NULL CHECK (movement_type IN ('entrada', 'salida', 'ajuste')),
    quantity INT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT now()
);

CREATE TABLE medication_orders (
    id SERIAL PRIMARY KEY,
    medical_record_id INT NOT NULL,
    medicine_id INT NOT NULL REFERENCES medicines(id),
    dosage VARCHAR(150) NOT NULL,
    ordered_at TIMESTAMP NOT NULL DEFAULT now()
);

CREATE TABLE medication_schedule (
    id SERIAL PRIMARY KEY,
    medication_order_id INT NOT NULL REFERENCES medication_orders(id) ON DELETE CASCADE,
    scheduled_time TIMESTAMP NOT NULL
);

CREATE TABLE medication_administration (
    id SERIAL PRIMARY KEY,
    medication_schedule_id INT NOT NULL REFERENCES medication_schedule(id) ON DELETE CASCADE,
    administered_by INT NOT NULL,
    administered_at TIMESTAMP NOT NULL DEFAULT now()
);

CREATE TRIGGER trg_inventory_updated_at
    BEFORE UPDATE ON inventory
    FOR EACH ROW EXECUTE FUNCTION set_pharmacy_updated_at();

CREATE INDEX idx_medicines_category_id ON medicines(medicine_category_id);
CREATE INDEX idx_medicine_presentations_medicine_id ON medicine_presentations(medicine_id);
CREATE INDEX idx_medicine_batches_medicine_id ON medicine_batches(medicine_id);
CREATE INDEX idx_medicine_batches_expiration ON medicine_batches(expiration_date);
CREATE INDEX idx_inventory_batch_id ON inventory(medicine_batch_id);
CREATE INDEX idx_inventory_movements_inventory_id ON inventory_movements(inventory_id);
CREATE INDEX idx_medication_orders_medical_record_id ON medication_orders(medical_record_id);
CREATE INDEX idx_medication_schedule_order_id ON medication_schedule(medication_order_id);
CREATE INDEX idx_medication_administration_schedule_id ON medication_administration(medication_schedule_id);

INSERT INTO medicine_categories (name) VALUES
    ('Analgesicos'), ('Antibioticos'), ('Antiinflamatorios'), ('Antihipertensivos'),
    ('Antidiabeticos'), ('Antihistaminicos'), ('Gastrointestinales');

INSERT INTO pharmaceutical_laboratories (name) VALUES
    ('Laboratorios Baxter'), ('Genfar'), ('Tecnoquimicas'), ('MK'), ('Pfizer');
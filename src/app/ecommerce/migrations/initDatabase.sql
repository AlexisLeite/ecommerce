-- Search indices

CREATE EXTENSION IF NOT EXISTS pg_trgm;
CREATE EXTENSION IF NOT EXISTS unaccent;

CREATE OR REPLACE FUNCTION public.unaccent_immutable(text)
  RETURNS text
  LANGUAGE SQL IMMUTABLE
AS $$
  SELECT lower(unaccent($1));
$$;

ALTER TABLE "Product"
  ADD COLUMN name_norm text
    GENERATED ALWAYS AS ( lower(unaccent_immutable(name)) ) STORED;

CREATE INDEX product_name_trgm_idx
  ON "Product"
  USING GIN (name_norm gin_trgm_ops);


-- Some data

insert into "Role" (id, name, reg_date) values (1,'Administrator', NOW());
INSERT INTO "User" (
    id,
    email,
    "userLogin",
    "roleId",
    reg_date
) VALUES (
	1,
    'admin@example.com',
    'admin',
    1,         -- existing roleId
    NOW()
);

INSERT INTO "Product" (name, description, "creatorId", price, reg_date)
VALUES 
  ('Martillo 16oz', 'Martillo de acero con mango ergonómico y uña para clavos.', 1, 12.99, NOW()),
  ('Juego de destornilladores', 'Set magnético de precisión con 6 piezas.', 1, 9.49, NOW()),
  ('Taladro inalámbrico', 'Taladro 20V con batería de litio y cargador incluido.', 1, 79.99, NOW()),
  ('Cinta métrica 5m', 'Cinta métrica resistente con medidas en pulgadas y centímetros.', 1, 5.75, NOW()),
  ('Llave ajustable', 'Llave inglesa cromada de 8 pulgadas.', 1, 8.99, NOW()),
  ('Lijadora eléctrica', 'Lijadora de palma ideal para terminaciones en madera.', 1, 34.95, NOW()),
  ('Kit de rodillo para pintar', 'Incluye bandeja, mango y 2 repuestos de rodillo.', 1, 14.30, NOW()),
  ('Tubo PVC 1"', 'Tubo de PVC de 1 pulgada (2 metros), apto para plomería.', 1, 3.25, NOW()),
  ('Tornillos para madera (100 uds)', 'Tornillos zincados 3.5x25mm para madera.', 1, 4.10, NOW()),
  ('Tarugos plásticos (50 uds)', 'Tarugos de plástico para fijaciones en pared.', 1, 2.20, NOW()),
  ('Alargue 5m', 'Cable alargador reforzado con protección contra sobretensión.', 1, 17.80, NOW()),
  ('Escalera de 6 peldaños', 'Escalera de aluminio plegable de uso doméstico.', 1, 49.99, NOW()),
  ('Caja de herramientas', 'Caja plástica con compartimentos y asa.', 1, 15.60, NOW()),
  ('Nivel de burbuja', 'Nivel de 30 cm con burbujas horizontal y vertical.', 1, 6.90, NOW()),
  ('Guantes de trabajo', 'Guantes recubiertos en látex para protección general.', 1, 3.85, NOW());
INSERT INTO "Product" (name, description, "creatorId", price, reg_date) VALUES ('Claw Hammer', 'High-quality claw hammer ideal for hardware and construction tasks.', 1, 125.59, '2025-05-11T00:00:00Z');
INSERT INTO "Product" (name, description, "creatorId", price, reg_date) VALUES ('Claw Hammer Set', 'High-quality claw hammer set ideal for hardware and construction tasks.', 1, 352.88, '2025-05-11T00:00:00Z');
INSERT INTO "Product" (name, description, "creatorId", price, reg_date) VALUES ('Claw Hammer Kit', 'High-quality claw hammer kit ideal for hardware and construction tasks.', 1, 295.32, '2025-05-11T00:00:00Z');
INSERT INTO "Product" (name, description, "creatorId", price, reg_date) VALUES ('Ball Pein Hammer', 'High-quality ball pein hammer ideal for hardware and construction tasks.', 1, 260.92, '2025-05-11T00:00:00Z');
INSERT INTO "Product" (name, description, "creatorId", price, reg_date) VALUES ('Ball Pein Hammer Set', 'High-quality ball pein hammer set ideal for hardware and construction tasks.', 1, 446.42, '2025-05-11T00:00:00Z');
INSERT INTO "Product" (name, description, "creatorId", price, reg_date) VALUES ('Ball Pein Hammer Kit', 'High-quality ball pein hammer kit ideal for hardware and construction tasks.', 1, 341.63, '2025-05-11T00:00:00Z');
INSERT INTO "Product" (name, description, "creatorId", price, reg_date) VALUES ('Phillips Screwdriver', 'High-quality phillips screwdriver ideal for hardware and construction tasks.', 1, 491.73, '2025-05-11T00:00:00Z');
INSERT INTO "Product" (name, description, "creatorId", price, reg_date) VALUES ('Phillips Screwdriver Set', 'High-quality phillips screwdriver set ideal for hardware and construction tasks.', 1, 267.6, '2025-05-11T00:00:00Z');
INSERT INTO "Product" (name, description, "creatorId", price, reg_date) VALUES ('Phillips Screwdriver Kit', 'High-quality phillips screwdriver kit ideal for hardware and construction tasks.', 1, 23.64, '2025-05-11T00:00:00Z');
INSERT INTO "Product" (name, description, "creatorId", price, reg_date) VALUES ('Flathead Screwdriver', 'High-quality flathead screwdriver ideal for hardware and construction tasks.', 1, 437.93, '2025-05-11T00:00:00Z');
INSERT INTO "Product" (name, description, "creatorId", price, reg_date) VALUES ('Flathead Screwdriver Set', 'High-quality flathead screwdriver set ideal for hardware and construction tasks.', 1, 460.48, '2025-05-11T00:00:00Z');
INSERT INTO "Product" (name, description, "creatorId", price, reg_date) VALUES ('Flathead Screwdriver Kit', 'High-quality flathead screwdriver kit ideal for hardware and construction tasks.', 1, 21.2, '2025-05-11T00:00:00Z');
INSERT INTO "Product" (name, description, "creatorId", price, reg_date) VALUES ('Socket Wrench', 'High-quality socket wrench ideal for hardware and construction tasks.', 1, 477.54, '2025-05-11T00:00:00Z');
INSERT INTO "Product" (name, description, "creatorId", price, reg_date) VALUES ('Socket Wrench Set', 'High-quality socket wrench set ideal for hardware and construction tasks.', 1, 379.85, '2025-05-11T00:00:00Z');
INSERT INTO "Product" (name, description, "creatorId", price, reg_date) VALUES ('Socket Wrench Kit', 'High-quality socket wrench kit ideal for hardware and construction tasks.', 1, 225.34, '2025-05-11T00:00:00Z');
INSERT INTO "Product" (name, description, "creatorId", price, reg_date) VALUES ('Adjustable Wrench', 'High-quality adjustable wrench ideal for hardware and construction tasks.', 1, 434.5, '2025-05-11T00:00:00Z');
INSERT INTO "Product" (name, description, "creatorId", price, reg_date) VALUES ('Adjustable Wrench Set', 'High-quality adjustable wrench set ideal for hardware and construction tasks.', 1, 63.51, '2025-05-11T00:00:00Z');
INSERT INTO "Product" (name, description, "creatorId", price, reg_date) VALUES ('Adjustable Wrench Kit', 'High-quality adjustable wrench kit ideal for hardware and construction tasks.', 1, 218.21, '2025-05-11T00:00:00Z');
INSERT INTO "Product" (name, description, "creatorId", price, reg_date) VALUES ('Tape Measure', 'High-quality tape measure ideal for hardware and construction tasks.', 1, 17.75, '2025-05-11T00:00:00Z');
INSERT INTO "Product" (name, description, "creatorId", price, reg_date) VALUES ('Tape Measure Set', 'High-quality tape measure set ideal for hardware and construction tasks.', 1, 200.59, '2025-05-11T00:00:00Z');
INSERT INTO "Product" (name, description, "creatorId", price, reg_date) VALUES ('Tape Measure Kit', 'High-quality tape measure kit ideal for hardware and construction tasks.', 1, 212.9, '2025-05-11T00:00:00Z');
INSERT INTO "Product" (name, description, "creatorId", price, reg_date) VALUES ('Spirit Level', 'High-quality spirit level ideal for hardware and construction tasks.', 1, 273.73, '2025-05-11T00:00:00Z');
INSERT INTO "Product" (name, description, "creatorId", price, reg_date) VALUES ('Spirit Level Set', 'High-quality spirit level set ideal for hardware and construction tasks.', 1, 435.0, '2025-05-11T00:00:00Z');
INSERT INTO "Product" (name, description, "creatorId", price, reg_date) VALUES ('Spirit Level Kit', 'High-quality spirit level kit ideal for hardware and construction tasks.', 1, 321.14, '2025-05-11T00:00:00Z');
INSERT INTO "Product" (name, description, "creatorId", price, reg_date) VALUES ('Chisel', 'High-quality chisel ideal for hardware and construction tasks.', 1, 426.23, '2025-05-11T00:00:00Z');
INSERT INTO "Product" (name, description, "creatorId", price, reg_date) VALUES ('Chisel Set', 'High-quality chisel set ideal for hardware and construction tasks.', 1, 254.12, '2025-05-11T00:00:00Z');
INSERT INTO "Product" (name, description, "creatorId", price, reg_date) VALUES ('Chisel Kit', 'High-quality chisel kit ideal for hardware and construction tasks.', 1, 342.59, '2025-05-11T00:00:00Z');
INSERT INTO "Product" (name, description, "creatorId", price, reg_date) VALUES ('Utility Knife', 'High-quality utility knife ideal for hardware and construction tasks.', 1, 250.06, '2025-05-11T00:00:00Z');
INSERT INTO "Product" (name, description, "creatorId", price, reg_date) VALUES ('Utility Knife Set', 'High-quality utility knife set ideal for hardware and construction tasks.', 1, 323.94, '2025-05-11T00:00:00Z');
INSERT INTO "Product" (name, description, "creatorId", price, reg_date) VALUES ('Utility Knife Kit', 'High-quality utility knife kit ideal for hardware and construction tasks.', 1, 326.76, '2025-05-11T00:00:00Z');
INSERT INTO "Product" (name, description, "creatorId", price, reg_date) VALUES ('Pliers', 'High-quality pliers ideal for hardware and construction tasks.', 1, 262.61, '2025-05-11T00:00:00Z');
INSERT INTO "Product" (name, description, "creatorId", price, reg_date) VALUES ('Pliers Set', 'High-quality pliers set ideal for hardware and construction tasks.', 1, 192.74, '2025-05-11T00:00:00Z');
INSERT INTO "Product" (name, description, "creatorId", price, reg_date) VALUES ('Pliers Kit', 'High-quality pliers kit ideal for hardware and construction tasks.', 1, 169.82, '2025-05-11T00:00:00Z');
INSERT INTO "Product" (name, description, "creatorId", price, reg_date) VALUES ('Needle-Nose Pliers', 'High-quality needle-nose pliers ideal for hardware and construction tasks.', 1, 476.16, '2025-05-11T00:00:00Z');
INSERT INTO "Product" (name, description, "creatorId", price, reg_date) VALUES ('Needle-Nose Pliers Set', 'High-quality needle-nose pliers set ideal for hardware and construction tasks.', 1, 459.59, '2025-05-11T00:00:00Z');
INSERT INTO "Product" (name, description, "creatorId", price, reg_date) VALUES ('Needle-Nose Pliers Kit', 'High-quality needle-nose pliers kit ideal for hardware and construction tasks.', 1, 170.13, '2025-05-11T00:00:00Z');
INSERT INTO "Product" (name, description, "creatorId", price, reg_date) VALUES ('Locking Pliers', 'High-quality locking pliers ideal for hardware and construction tasks.', 1, 121.55, '2025-05-11T00:00:00Z');
INSERT INTO "Product" (name, description, "creatorId", price, reg_date) VALUES ('Locking Pliers Set', 'High-quality locking pliers set ideal for hardware and construction tasks.', 1, 311.72, '2025-05-11T00:00:00Z');
INSERT INTO "Product" (name, description, "creatorId", price, reg_date) VALUES ('Locking Pliers Kit', 'High-quality locking pliers kit ideal for hardware and construction tasks.', 1, 404.04, '2025-05-11T00:00:00Z');
INSERT INTO "Product" (name, description, "creatorId", price, reg_date) VALUES ('Wire Cutters', 'High-quality wire cutters ideal for hardware and construction tasks.', 1, 99.46, '2025-05-11T00:00:00Z');
INSERT INTO "Product" (name, description, "creatorId", price, reg_date) VALUES ('Wire Cutters Set', 'High-quality wire cutters set ideal for hardware and construction tasks.', 1, 284.78, '2025-05-11T00:00:00Z');
INSERT INTO "Product" (name, description, "creatorId", price, reg_date) VALUES ('Wire Cutters Kit', 'High-quality wire cutters kit ideal for hardware and construction tasks.', 1, 319.6, '2025-05-11T00:00:00Z');
INSERT INTO "Product" (name, description, "creatorId", price, reg_date) VALUES ('Wire Strippers', 'High-quality wire strippers ideal for hardware and construction tasks.', 1, 206.67, '2025-05-11T00:00:00Z');
INSERT INTO "Product" (name, description, "creatorId", price, reg_date) VALUES ('Wire Strippers Set', 'High-quality wire strippers set ideal for hardware and construction tasks.', 1, 284.31, '2025-05-11T00:00:00Z');
INSERT INTO "Product" (name, description, "creatorId", price, reg_date) VALUES ('Wire Strippers Kit', 'High-quality wire strippers kit ideal for hardware and construction tasks.', 1, 261.72, '2025-05-11T00:00:00Z');
INSERT INTO "Product" (name, description, "creatorId", price, reg_date) VALUES ('Electric Drill', 'High-quality electric drill ideal for hardware and construction tasks.', 1, 124.31, '2025-05-11T00:00:00Z');
INSERT INTO "Product" (name, description, "creatorId", price, reg_date) VALUES ('Electric Drill Set', 'High-quality electric drill set ideal for hardware and construction tasks.', 1, 272.15, '2025-05-11T00:00:00Z');
INSERT INTO "Product" (name, description, "creatorId", price, reg_date) VALUES ('Electric Drill Kit', 'High-quality electric drill kit ideal for hardware and construction tasks.', 1, 351.64, '2025-05-11T00:00:00Z');
INSERT INTO "Product" (name, description, "creatorId", price, reg_date) VALUES ('Cordless Drill', 'High-quality cordless drill ideal for hardware and construction tasks.', 1, 376.3, '2025-05-11T00:00:00Z');
INSERT INTO "Product" (name, description, "creatorId", price, reg_date) VALUES ('Cordless Drill Set', 'High-quality cordless drill set ideal for hardware and construction tasks.', 1, 212.81, '2025-05-11T00:00:00Z');
INSERT INTO "Product" (name, description, "creatorId", price, reg_date) VALUES ('Cordless Drill Kit', 'High-quality cordless drill kit ideal for hardware and construction tasks.', 1, 463.37, '2025-05-11T00:00:00Z');
INSERT INTO "Product" (name, description, "creatorId", price, reg_date) VALUES ('Drill Bit Set', 'High-quality drill bit set ideal for hardware and construction tasks.', 1, 261.17, '2025-05-11T00:00:00Z');
INSERT INTO "Product" (name, description, "creatorId", price, reg_date) VALUES ('Drill Bit Set Set', 'High-quality drill bit set set ideal for hardware and construction tasks.', 1, 331.0, '2025-05-11T00:00:00Z');
INSERT INTO "Product" (name, description, "creatorId", price, reg_date) VALUES ('Drill Bit Set Kit', 'High-quality drill bit set kit ideal for hardware and construction tasks.', 1, 67.43, '2025-05-11T00:00:00Z');
INSERT INTO "Product" (name, description, "creatorId", price, reg_date) VALUES ('Circular Saw', 'High-quality circular saw ideal for hardware and construction tasks.', 1, 396.65, '2025-05-11T00:00:00Z');
INSERT INTO "Product" (name, description, "creatorId", price, reg_date) VALUES ('Circular Saw Set', 'High-quality circular saw set ideal for hardware and construction tasks.', 1, 469.97, '2025-05-11T00:00:00Z');
INSERT INTO "Product" (name, description, "creatorId", price, reg_date) VALUES ('Circular Saw Kit', 'High-quality circular saw kit ideal for hardware and construction tasks.', 1, 384.97, '2025-05-11T00:00:00Z');
INSERT INTO "Product" (name, description, "creatorId", price, reg_date) VALUES ('Jigsaw', 'High-quality jigsaw ideal for hardware and construction tasks.', 1, 72.59, '2025-05-11T00:00:00Z');
INSERT INTO "Product" (name, description, "creatorId", price, reg_date) VALUES ('Jigsaw Set', 'High-quality jigsaw set ideal for hardware and construction tasks.', 1, 221.05, '2025-05-11T00:00:00Z');
INSERT INTO "Product" (name, description, "creatorId", price, reg_date) VALUES ('Jigsaw Kit', 'High-quality jigsaw kit ideal for hardware and construction tasks.', 1, 420.24, '2025-05-11T00:00:00Z');
INSERT INTO "Product" (name, description, "creatorId", price, reg_date) VALUES ('Reciprocating Saw', 'High-quality reciprocating saw ideal for hardware and construction tasks.', 1, 126.07, '2025-05-11T00:00:00Z');
INSERT INTO "Product" (name, description, "creatorId", price, reg_date) VALUES ('Reciprocating Saw Set', 'High-quality reciprocating saw set ideal for hardware and construction tasks.', 1, 201.74, '2025-05-11T00:00:00Z');
INSERT INTO "Product" (name, description, "creatorId", price, reg_date) VALUES ('Reciprocating Saw Kit', 'High-quality reciprocating saw kit ideal for hardware and construction tasks.', 1, 313.54, '2025-05-11T00:00:00Z');
INSERT INTO "Product" (name, description, "creatorId", price, reg_date) VALUES ('Table Saw', 'High-quality table saw ideal for hardware and construction tasks.', 1, 119.81, '2025-05-11T00:00:00Z');
INSERT INTO "Product" (name, description, "creatorId", price, reg_date) VALUES ('Table Saw Set', 'High-quality table saw set ideal for hardware and construction tasks.', 1, 267.42, '2025-05-11T00:00:00Z');
INSERT INTO "Product" (name, description, "creatorId", price, reg_date) VALUES ('Table Saw Kit', 'High-quality table saw kit ideal for hardware and construction tasks.', 1, 345.28, '2025-05-11T00:00:00Z');
INSERT INTO "Product" (name, description, "creatorId", price, reg_date) VALUES ('Miter Saw', 'High-quality miter saw ideal for hardware and construction tasks.', 1, 443.42, '2025-05-11T00:00:00Z');
INSERT INTO "Product" (name, description, "creatorId", price, reg_date) VALUES ('Miter Saw Set', 'High-quality miter saw set ideal for hardware and construction tasks.', 1, 53.46, '2025-05-11T00:00:00Z');
INSERT INTO "Product" (name, description, "creatorId", price, reg_date) VALUES ('Miter Saw Kit', 'High-quality miter saw kit ideal for hardware and construction tasks.', 1, 408.32, '2025-05-11T00:00:00Z');
INSERT INTO "Product" (name, description, "creatorId", price, reg_date) VALUES ('Router', 'High-quality router ideal for hardware and construction tasks.', 1, 433.49, '2025-05-11T00:00:00Z');
INSERT INTO "Product" (name, description, "creatorId", price, reg_date) VALUES ('Router Set', 'High-quality router set ideal for hardware and construction tasks.', 1, 14.06, '2025-05-11T00:00:00Z');
INSERT INTO "Product" (name, description, "creatorId", price, reg_date) VALUES ('Router Kit', 'High-quality router kit ideal for hardware and construction tasks.', 1, 387.61, '2025-05-11T00:00:00Z');
INSERT INTO "Product" (name, description, "creatorId", price, reg_date) VALUES ('Angle Grinder', 'High-quality angle grinder ideal for hardware and construction tasks.', 1, 271.5, '2025-05-11T00:00:00Z');
INSERT INTO "Product" (name, description, "creatorId", price, reg_date) VALUES ('Angle Grinder Set', 'High-quality angle grinder set ideal for hardware and construction tasks.', 1, 337.37, '2025-05-11T00:00:00Z');
INSERT INTO "Product" (name, description, "creatorId", price, reg_date) VALUES ('Angle Grinder Kit', 'High-quality angle grinder kit ideal for hardware and construction tasks.', 1, 388.98, '2025-05-11T00:00:00Z');
INSERT INTO "Product" (name, description, "creatorId", price, reg_date) VALUES ('Bench Grinder', 'High-quality bench grinder ideal for hardware and construction tasks.', 1, 131.1, '2025-05-11T00:00:00Z');
INSERT INTO "Product" (name, description, "creatorId", price, reg_date) VALUES ('Bench Grinder Set', 'High-quality bench grinder set ideal for hardware and construction tasks.', 1, 271.19, '2025-05-11T00:00:00Z');
INSERT INTO "Product" (name, description, "creatorId", price, reg_date) VALUES ('Bench Grinder Kit', 'High-quality bench grinder kit ideal for hardware and construction tasks.', 1, 226.24, '2025-05-11T00:00:00Z');
INSERT INTO "Product" (name, description, "creatorId", price, reg_date) VALUES ('Orbital Sander', 'High-quality orbital sander ideal for hardware and construction tasks.', 1, 180.33, '2025-05-11T00:00:00Z');
INSERT INTO "Product" (name, description, "creatorId", price, reg_date) VALUES ('Orbital Sander Set', 'High-quality orbital sander set ideal for hardware and construction tasks.', 1, 478.57, '2025-05-11T00:00:00Z');
INSERT INTO "Product" (name, description, "creatorId", price, reg_date) VALUES ('Orbital Sander Kit', 'High-quality orbital sander kit ideal for hardware and construction tasks.', 1, 313.14, '2025-05-11T00:00:00Z');
INSERT INTO "Product" (name, description, "creatorId", price, reg_date) VALUES ('Heat Gun', 'High-quality heat gun ideal for hardware and construction tasks.', 1, 415.13, '2025-05-11T00:00:00Z');
INSERT INTO "Product" (name, description, "creatorId", price, reg_date) VALUES ('Heat Gun Set', 'High-quality heat gun set ideal for hardware and construction tasks.', 1, 175.18, '2025-05-11T00:00:00Z');
INSERT INTO "Product" (name, description, "creatorId", price, reg_date) VALUES ('Heat Gun Kit', 'High-quality heat gun kit ideal for hardware and construction tasks.', 1, 434.88, '2025-05-11T00:00:00Z');
INSERT INTO "Product" (name, description, "creatorId", price, reg_date) VALUES ('Air Compressor', 'High-quality air compressor ideal for hardware and construction tasks.', 1, 49.26, '2025-05-11T00:00:00Z');
INSERT INTO "Product" (name, description, "creatorId", price, reg_date) VALUES ('Air Compressor Set', 'High-quality air compressor set ideal for hardware and construction tasks.', 1, 239.0, '2025-05-11T00:00:00Z');
INSERT INTO "Product" (name, description, "creatorId", price, reg_date) VALUES ('Air Compressor Kit', 'High-quality air compressor kit ideal for hardware and construction tasks.', 1, 79.69, '2025-05-11T00:00:00Z');
INSERT INTO "Product" (name, description, "creatorId", price, reg_date) VALUES ('Paint Sprayer', 'High-quality paint sprayer ideal for hardware and construction tasks.', 1, 65.3, '2025-05-11T00:00:00Z');
INSERT INTO "Product" (name, description, "creatorId", price, reg_date) VALUES ('Paint Sprayer Set', 'High-quality paint sprayer set ideal for hardware and construction tasks.', 1, 458.17, '2025-05-11T00:00:00Z');
INSERT INTO "Product" (name, description, "creatorId", price, reg_date) VALUES ('Paint Sprayer Kit', 'High-quality paint sprayer kit ideal for hardware and construction tasks.', 1, 102.57, '2025-05-11T00:00:00Z');
INSERT INTO "Product" (name, description, "creatorId", price, reg_date) VALUES ('Paint Roller', 'High-quality paint roller ideal for hardware and construction tasks.', 1, 262.17, '2025-05-11T00:00:00Z');
INSERT INTO "Product" (name, description, "creatorId", price, reg_date) VALUES ('Paint Roller Set', 'High-quality paint roller set ideal for hardware and construction tasks.', 1, 13.93, '2025-05-11T00:00:00Z');
INSERT INTO "Product" (name, description, "creatorId", price, reg_date) VALUES ('Paint Roller Kit', 'High-quality paint roller kit ideal for hardware and construction tasks.', 1, 395.18, '2025-05-11T00:00:00Z');
INSERT INTO "Product" (name, description, "creatorId", price, reg_date) VALUES ('Paint Brush', 'High-quality paint brush ideal for hardware and construction tasks.', 1, 234.55, '2025-05-11T00:00:00Z');
INSERT INTO "Product" (name, description, "creatorId", price, reg_date) VALUES ('Paint Brush Set', 'High-quality paint brush set ideal for hardware and construction tasks.', 1, 237.27, '2025-05-11T00:00:00Z');
INSERT INTO "Product" (name, description, "creatorId", price, reg_date) VALUES ('Paint Brush Kit', 'High-quality paint brush kit ideal for hardware and construction tasks.', 1, 80.27, '2025-05-11T00:00:00Z');
INSERT INTO "Product" (name, description, "creatorId", price, reg_date) VALUES ('Paint Tray', 'High-quality paint tray ideal for hardware and construction tasks.', 1, 440.7, '2025-05-11T00:00:00Z');
INSERT INTO "Product" (name, description, "creatorId", price, reg_date) VALUES ('Paint Tray Set', 'High-quality paint tray set ideal for hardware and construction tasks.', 1, 377.65, '2025-05-11T00:00:00Z');
INSERT INTO "Product" (name, description, "creatorId", price, reg_date) VALUES ('Paint Tray Kit', 'High-quality paint tray kit ideal for hardware and construction tasks.', 1, 148.27, '2025-05-11T00:00:00Z');
INSERT INTO "Product" (name, description, "creatorId", price, reg_date) VALUES ('Caulking Gun', 'High-quality caulking gun ideal for hardware and construction tasks.', 1, 495.76, '2025-05-11T00:00:00Z');
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

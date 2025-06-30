-- Inserts para la tabla categoria
INSERT INTO categoria (nombre) VALUES 
('Remeras'),
('Pantalones'),
('Camperas');

-- Inserts para la tabla usuario
INSERT INTO usuario (nombre, apellido, email, password, direccion, telefono, rol) VALUES 
('Sofía', 'Pérez', 'sofia@example.com', 'clave123', 'Av. Siempre Viva 123', '1134567890', 'cliente'),
('Juan', 'Martínez', 'juan@example.com', 'clave456', 'Calle Falsa 456', '1145678901', 'cliente'),
('Admin', 'Root', 'admin@example.com', 'admin123', 'Oficina Central', '1100000000', 'admin');

-- Inserts para la tabla producto (15 productos)
INSERT INTO producto (nombre, descripcion, precio, genero, id_categoria, imagen) VALUES
('Remera Básica Blanca', 'Remera de algodón 100% blanca', 3500.00, 'Unisex', 1, 'remera_blanca.jpg'),
('Remera Negra Oversize', 'Remera oversize negra con estampa', 4200.00, 'Unisex', 1, 'remera_negra.jpg'),
('Remera Manga Larga', 'Remera manga larga gris jaspeado', 4000.00, 'Unisex', 1, 'remera_larga.jpg'),
('Pantalón Jogger Negro', 'Pantalón jogger con bolsillos', 6500.00, 'Masculino', 2, 'jogger_negro.jpg'),
('Pantalón Cargo Verde', 'Pantalón cargo verde militar', 7000.00, 'Masculino', 2, 'cargo_verde.jpg'),
('Jeans Mom Fit', 'Jeans azul claro estilo mom fit', 7500.00, 'Femenino', 2, 'jeans_mom.jpg'),
('Campera de Jean', 'Campera clásica de jean celeste', 9800.00, 'Femenino', 3, 'campera_jean.jpg'),
('Campera Rompeviento', 'Rompeviento liviano impermeable', 8500.00, 'Unisex', 3, 'rompeviento.jpg'),
('Campera de Abrigo', 'Campera térmica de invierno', 12000.00, 'Unisex', 3, 'campera_abrigo.jpg'),
('Remera Rayada', 'Remera rayada blanco y negro', 3900.00, 'Unisex', 1, 'remera_rayas.jpg'),
('Remera Estampada', 'Remera con diseño gráfico original', 4100.00, 'Unisex', 1, 'remera_estampada.jpg'),
('Remera Crop Top', 'Remera corta ajustada', 3700.00, 'Femenino', 1, 'crop_top.jpg'),
('Pantalón Oxford', 'Pantalón negro estilo oxford', 7200.00, 'Femenino', 2, 'oxford.jpg'),
('Pantalón Recto Beige', 'Pantalón clásico color beige', 6800.00, 'Unisex', 2, 'recto_beige.jpg'),
('Jeans Rotos', 'Jeans azul con roturas', 7900.00, 'Masculino', 2, 'jeans_rotos.jpg');

-- Inserts para la tabla inventario (coherentes con productos)
INSERT INTO inventario (talle, color, stock, id_producto) VALUES
('M', 'Blanco', 25, 1),
('L', 'Negro', 18, 2),
('S', 'Gris Jaspeado', 12, 3),
('M', 'Negro', 20, 4),
('L', 'Verde Militar', 15, 5),
('S', 'Azul Claro', 10, 6),
('M', 'Celeste', 8, 7),
('L', 'Negro', 14, 8),
('M', 'Negro', 6, 9),
('S', 'Blanco con Rayas Negras', 22, 10),
('M', 'Negro con Estampa', 20, 11),
('XS', 'Rosa', 9, 12),
('M', 'Negro', 11, 13),
('L', 'Beige', 13, 14),
('M', 'Azul', 16, 15);

-- Inserts para la tabla pedido
INSERT INTO pedido (fecha_pedido, total, metodo_pago, estado, id_usuario) VALUES
('2025-06-01', 10500.00, 'Tarjeta', 1, 1),
('2025-06-05', 7300.00, 'Transferencia', 2, 2),
('2025-06-09', 14500.00, 'Efectivo', 1, 1);

-- Inserts para la tabla detalle_pedido
INSERT INTO detalle_pedido (cantidad, precio_unitario, id_pedido, id_inventario) VALUES
(2, 3500.00, 1, 1),
(1, 4200.00, 2, 2),
(1, 4000.00, 3, 3);

-- Inserts para la tabla favorito
INSERT INTO favorito (id_usuario, id_producto) VALUES
(1, 1),
(1, 2),
(2, 3);

-- Inserts para la tabla carrito
INSERT INTO carrito (id_inventario, id_usuario) VALUES
(1, 1),
(2, 2),
(3, 1);
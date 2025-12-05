CREATE DATABASE bikestore;
USE bikestore;

CREATE TABLE usuarios (
    id_usuario INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100),
    telefono BIGINT,
    direccion VARCHAR(100),
    correo VARCHAR(100),
    fecha_registro DATETIME DEFAULT CURRENT_TIMESTAMP,
    ciudad VARCHAR(100),
    rol ENUM("administrador", "cliente") DEFAULT "cliente",
    contrasena VARCHAR(255)
);

CREATE TABLE proveedor (
    id_proveedor INT PRIMARY KEY AUTO_INCREMENT,
    nombre_proveedor VARCHAR(100),
    cuenta_bancaria VARCHAR(100),
    telefono BIGINT,
    direccion VARCHAR(100),
    correo VARCHAR(100),
    estado ENUM("activo", "inactivo"),
    nit VARCHAR(100)
);

CREATE TABLE categoria (
    id_categoria INT PRIMARY KEY AUTO_INCREMENT,
    nombre_categoria VARCHAR(100)
);

CREATE TABLE productos (
    id_producto INT PRIMARY KEY AUTO_INCREMENT,
    descripcion VARCHAR(150),
    precio DECIMAL(10,2),
    color VARCHAR(50),
    marca VARCHAR(50),
    stock BIGINT,
    id_proveedor INT,
    id_categoria INT,
    FOREIGN KEY (id_proveedor) REFERENCES proveedor(id_proveedor),
    FOREIGN KEY (id_categoria) REFERENCES categoria(id_categoria)
);

CREATE TABLE pedido (
    id_pedido INT PRIMARY KEY AUTO_INCREMENT,
    fecha DATE,
    precio_unitario DECIMAL(10,2),
    descripcion VARCHAR(100),
    id_usuario INT,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario)
);

CREATE TABLE detalle_pedido (
    id_detalle INT PRIMARY KEY AUTO_INCREMENT,
    descripcion VARCHAR(100),
    precio_total DECIMAL(10,2),
    fecha DATETIME,
    estado ENUM("pendiente", "pagado", "cancelado"),
    id_pedido INT,
    id_producto INT,
    FOREIGN KEY (id_pedido) REFERENCES pedido(id_pedido),
    FOREIGN KEY (id_producto) REFERENCES productos(id_producto)
);

-- Cuenta de administrador --
-- Contraseña: 1
INSERT INTO usuarios (
    nombre,
    telefono,
    direccion,
    email,
    fecha_creacion,
    ciudad,
    rol,
    password
) VALUES (
    'administrador 1',
    '1',
    'calle 0',
    'admin@gmail.com',
    '2025-12-05 11:00:00',
    'palmira',
    'administrador',
    '$2b$10$iKw.rwRwlV6tngEhzAZHsO2bv8e.uKJzJ2MjH2YrG8VWbMK4qw7V6' 
);





-- INSERTS --

INSERT INTO usuarios (nombre, telefono, direccion, correo, ciudad, rol, contrasena) VALUES
('Carlos Pérez', 3001112222, 'Calle 10 #20-30', 'carlos@example.com', 'Bogotá', 'cliente', '$2b$10$I.d6TSGTN6noy8Xv3gNQFOKnp5cP8DAUkiAEfqksEOgtvt4tYXJja'),
('Laura Gómez', 3003334444, 'Cra 15 #45-12', 'laura@example.com', 'Medellín', 'cliente', '$2b$10$HnG59FZ.F605rn2xSOZbcOcbfVYhKqXGZ00RUrkSOeiEiOejs8XTy'),
('Admin Master', 3005556666, 'Av 6 #22-19', 'admin@example.com', 'Cali', 'administrador', '$2b$10$dRT475dvyxKBo40VuwTfkOYqT8p/8p1heetq9wv6cZT76DGGuPYri'),
('Jorge Ruiz', 3007778888, 'Calle 50 #12-44', 'jorge@example.com', 'Pereira', 'cliente', '$2b$10$79sgQ3DataRUdAL3p84y8u6PC00LgCYC2XaahJNiepyybww7UXha2'),
('María Londoño', 3009990000, 'Cra 32 #55-90', 'maria@example.com', 'Barranquilla', 'cliente', '$2b$10$qvCe7FCkn4tQKJAjXqfJsOTRdJw4eyu8coZCQySALsNFOwk7B8p2G');

 INSERT INTO proveedor (nombre_proveedor, cuenta_bancaria, telefono, direccion, correo, estado, nit) VALUES
('ProveBikes', '100200300', 3101112222, 'Zona Industrial 1', 'contacto@provebikes.com', 'activo', '900123001'),
('CyclingPro', '200300400', 3103334444, 'Zona Industrial 2', 'ventas@cyclingpro.com', 'activo', '901234002'),
('MegaParts', '300400500', 3105556666, 'Centro 33', 'info@megaparts.com', 'inactivo', '902345003'),
('UrbanRide', '400500600', 3107778888, 'Sector Norte 22', 'urbansales@urbanride.com', 'activo', '903456004'),
('BikeWorld', '500600700', 3109990000, 'Calle 80 #45', 'support@bikeworld.com', 'activo', '904567005');

INSERT INTO categoria (nombre_categoria) VALUES
('Montaña'),
('Ruta'),
('Híbrida'),
('Eléctrica'),
('Accesorios');

INSERT INTO productos (descripcion, precio, color, marca, stock, id_proveedor, id_categoria) VALUES
('Bicicleta MTB Rin 29', 1500000, 'Negro', 'Trek', 10, 1, 1),
('Bicicleta Ruta Carbono', 3500000, 'Rojo', 'Specialized', 5, 2, 2),
('Bicicleta Híbrida Urbana', 1200000, 'Gris', 'Giant', 8, 3, 3),
('Bicicleta Eléctrica Urbana', 4200000, 'Azul', 'Yamaha', 3, 4, 4),
('Casco MTB Profesional', 250000, 'Verde', 'Fox', 20, 5, 5);

INSERT INTO pedido (fecha, precio_unitario, descripcion, id_usuario) VALUES
('2025-01-10', 1500000, 'Compra bicicleta MTB', 1),
('2025-01-12', 3500000, 'Compra bicicleta ruta', 2),
('2025-01-15', 250000, 'Compra casco', 3),
('2025-01-18', 1200000, 'Compra híbrida urbana', 4),
('2025-01-20', 4200000, 'Compra bicicleta eléctrica', 5);

INSERT INTO detalle_pedido (descripcion, precio_total, fecha, estado, id_pedido, id_producto) VALUES
('Detalle MTB', 1500000, '2025-01-10 10:00:00', 'pagado', 1, 1),
('Detalle Ruta', 3500000, '2025-01-12 11:00:00', 'pagado', 2, 2),
('Detalle Casco', 250000, '2025-01-15 09:30:00', 'pagado', 3, 5),
('Detalle Híbrida', 1200000, '2025-01-18 14:20:00', 'pendiente', 4, 3),
('Detalle Eléctrica', 4200000, '2025-01-20 15:10:00', 'pendiente', 5, 4);


-- Contraseñas hasheadas y en texto plano --
/*
Contraseña: clave123
Hash:
$2b$10$I.d6TSGTN6noy8Xv3gNQFOKnp5cP8DAUkiAEfqksEOgtvt4tYXJja

2Laura Gómez

Contraseña: moto456
Hash:
$2b$10$HnG59FZ.F605rn2xSOZbcOcbfVYhKqXGZ00RUrkSOeiEiOejs8XTy

3Admin Master

Contraseña: admin789
Hash:
$2b$10$dRT475dvyxKBo40VuwTfkOYqT8p/8p1heetq9wv6cZT76DGGuPYri

4Jorge Ruiz

Contraseña: bike2024
Hash:
$2b$10$79sgQ3DataRUdAL3p84y8u6PC00LgCYC2XaahJNiepyybww7UXha2

5María Londoño

Contraseña: pass555
Hash:
$2b$10$qvCe7FCkn4tQKJAjXqfJsOTRdJw4eyu8coZCQySALsNFOwk7B8p2G 
*/
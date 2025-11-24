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

INSERT INTO usuarios (nombre, telefono, direccion, correo, ciudad, rol, contrasena)
VALUES
("Julian Torres", 3004567890, "Cra 10 #20-30", "julian@example.com", "Bogotá", "administrador", "pass1"),
("Maria Lopez", 3109876543, "Cl 45 #15-22", "maria@gmail.com", "Medellín", "cliente", "pass2"),
("Carlos Perez", 3152223344, "Av 9 #12-33", "carlos@hotmail.com", "Cali", "cliente", "pass3"),
("Sara Mendoza", 3124445566, "Cra 80 #55-40", "sara@example.com", "Barranquilla", "cliente", "pass4"),
("Luis Ramírez", 3201112233, "Cl 100 #25-20", "luis@mail.com", "Bogotá", "cliente", "pass5");

INSERT INTO proveedor (nombre_proveedor, cuenta_bancaria, telefono, direccion, correo, estado, nit)
VALUES
("CicloPro S.A", "123456789", 3101112233, "Zona Industrial 45", "contacto@ciclopro.com", "activo", "900123456"),
("Andes Bikes", "987654321", 3123334445, "Av Las Palmas 33", "ventas@andesbikes.com", "activo", "901987654"),
("BikeMaster", "456789123", 3158889991, "Cl 70 #40-55", "info@bikemaster.com", "activo", "902345678"),
("RuedaFácil", "741852963", 3002221110, "Cra 50 #101-22", "contacto@ruedafacil.com", "inactivo", "903456789"),
("ProPedal", "369258147", 3013332221, "Zona Franca 90", "pedidos@propedal.com", "activo", "904567890");

INSERT INTO categoria (nombre_categoria) VALUES
("Bicicletas"),
("Accesorios"),
("Repuestos"),
("Ropa Deportiva"),
("Seguridad");

INSERT INTO productos (descripcion, precio, color, marca, stock, id_proveedor, id_categoria)
VALUES
("Bicicleta MTB aluminio", 1200000, "Negro", "GW", 25, 1, 1),
("Casco profesional ruta", 250000, "Rojo", "Specialized", 40, 2, 5),
("Llantas MTB 29 x2.1", 150000, "Negro", "Maxxis", 60, 3, 3),
("Guantes deportivos gel", 45000, "Azul", "Shimano", 80, 4, 4),
("Porta caramañola aluminio", 30000, "Plateado", "Giant", 100, 5, 2);

INSERT INTO pedido (fecha, precio_unitario, descripcion, id_usuario)
VALUES
("2025-01-10", 1200000, "Compra bicicleta MTB", 1),
("2025-01-12", 250000, "Compra casco", 2),
("2025-01-15", 150000, "Compra llanta MTB", 3),
("2025-01-18", 45000, "Compra guantes", 4),
("2025-01-20", 30000, "Compra porta caramañola", 5);

INSERT INTO detalle_pedido (descripcion, precio_total, fecha, estado, id_pedido, id_producto)
VALUES
("Bicicleta MTB aluminio", 1200000, "2025-01-10 10:30:00", "pagado", 1, 1),
("Casco profesional ruta", 250000, "2025-01-12 11:00:00", "pendiente", 2, 2),
("Llanta MTB 29 x2.1", 150000, "2025-01-15 14:20:00", "pagado", 3, 3),
("Guantes deportivos gel", 45000, "2025-01-18 09:15:00", "cancelado", 4, 4),
("Porta caramañola aluminio", 30000, "2025-01-20 13:40:00", "pagado", 5, 5);
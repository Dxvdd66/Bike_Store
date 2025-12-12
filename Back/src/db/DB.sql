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
    rol ENUM("Administrador", "cliente") DEFAULT "cliente",
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

CREATE TABLE pedido_envio (
    id_envio INT AUTO_INCREMENT PRIMARY KEY,
    id_pedido INT,
    nombre VARCHAR(100),
    telefono VARCHAR(20),
    ciudad VARCHAR(100),
    direccion VARCHAR(150),
    creado_en DATETIME
);

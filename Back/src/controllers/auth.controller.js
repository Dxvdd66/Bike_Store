const db = require("../config/conexion_DB");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { exito, fallo } = require("../utils/respuesta");

exports.login = async (req, res) => {
    const { correo, contrasena } = req.body;

    // 1. Buscar usuario por correo
    const [[usuario]] = await db.query(
        "SELECT * FROM usuarios WHERE correo = ?",
        [correo]
    );

    if (!usuario) {
        return fallo(res, "Correo no encontrado", 404);
    }

    // 2. Comparar contraseñas
    const coincide = await bcrypt.compare(contrasena, usuario.contrasena);
    if (!coincide) {
        return fallo(res, "Contraseña incorrecta", 400);
    }

    // 3. Crear token
    const token = jwt.sign(
        {
            id_usuario: usuario.id_usuario,
            rol: usuario.rol,
            nombre: usuario.nombre
        },
        process.env.JWT_SECRET || "clave_secreta",
        { expiresIn: "8h" }
    );

    return exito(res, { token, usuario }, "Inicio de sesión exitoso");
};

exports.register = async (req, res) => {
    const { nombre, telefono, direccion, ciudad, correo, contrasena } = req.body;

    // Validar si el correo ya existe
    const [[dupe]] = await db.query(
        "SELECT id_usuario FROM usuarios WHERE correo = ?",
        [correo]
    );

    if (dupe) return fallo(res, "El correo ya está registrado", 400);

    // Encriptar contraseña
    const hash = await bcrypt.hash(contrasena, 10);

    // Crear usuario cliente
    const [result] = await db.query(
        `INSERT INTO usuarios 
         (nombre, telefono, direccion, correo, ciudad, rol, contrasena, fecha_registro)
         VALUES (?, ?, ?, ?, ?, 'Cliente', ?, NOW())`,
        [nombre, telefono, direccion, correo, ciudad, hash]
    );

    return exito(res, { id: result.insertId }, "Usuario registrado");
};

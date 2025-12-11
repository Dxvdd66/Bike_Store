const db = require("../config/conexion_DB");
const { exito, fallo } = require("../utils/respuesta");
const bcrypt = require("bcrypt");

// Obtener todos los usuarios
exports.getUsuarios = async (req, res) => {
    const [rows] = await db.query("SELECT * FROM usuarios");

    if (rows.length === 0) {
        return fallo(res, "No hay usuarios registrados", 404);
    }

    return exito(res, rows, "Usuarios obtenidos");
};


// Obtener un usuario por ID
exports.getUsuario = async (req, res) => {
    const { id } = req.params;

    const [rows] = await db.query("SELECT * FROM usuarios WHERE id_usuario = ?", [id]);

    if (rows.length === 0) {
        return fallo(res, "Usuario no encontrado", 404);
    }

    return exito(res, rows[0], "Usuario encontrado");
};


// Crear usuario (admin o público)
exports.createUsuario = async (req, res) => {
    const { nombre, telefono, direccion, correo, ciudad, contrasena, rol } = req.body;

    // Si viene de un usuario autenticado
    let rolFinal = "Cliente";
    if (req.usuario?.rol === "Administrador") {
        rolFinal = rol || "Cliente";
    }

    // Validación de duplicado
    const [[dupe]] = await db.query("SELECT id_usuario FROM usuarios WHERE correo = ?", [correo]);
    if (dupe) return fallo(res, "El correo ya está registrado", 400);

    const hash = await bcrypt.hash(contrasena, 10);

    const [result] = await db.query(
        `INSERT INTO usuarios (nombre, telefono, direccion, correo, ciudad, rol, contrasena, fecha_registro)
         VALUES (?, ?, ?, ?, ?, ?, ?, NOW())`,
        [nombre, telefono, direccion, correo, ciudad, rolFinal, hash]
    );

    return exito(res, { id: result.insertId }, "Usuario creado", 201);
};


// Actualizar usuario
exports.updateUsuario = async (req, res) => {
    const { id } = req.params;
    const { nombre, telefono, direccion, correo, ciudad, rol, contrasena } = req.body;

    const [[usuario]] = await db.query("SELECT contrasena FROM usuarios WHERE id_usuario = ?", [id]);
    if (!usuario) return fallo(res, "Usuario no encontrado", 404);

    let hash = usuario.contrasena;

    if (contrasena && contrasena.trim() !== "") {
        hash = await bcrypt.hash(contrasena, 10);
    }

    await db.query(
        `UPDATE usuarios 
        SET nombre=?, telefono=?, direccion=?, correo=?, ciudad=?, rol=?, contrasena=?
        WHERE id_usuario=?`,
        [nombre, telefono, direccion, correo, ciudad, rol, hash, id]
    );

    return exito(res, null, "Usuario actualizado");
};


// Eliminar usuario
exports.deleteUsuario = async (req, res) => {
    const { id } = req.params;

    const [result] = await db.query("DELETE FROM usuarios WHERE id_usuario = ?", [id]);

    if (result.affectedRows === 0) {
        return fallo(res, "Usuario no encontrado", 404);
    }

    return exito(res, null, "Usuario eliminado");
};

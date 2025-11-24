const db = require("../config/conexion_DB");
const { exito, fallo } = require("../utils/respuesta");

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

    const [rows] = await db.query(
    "SELECT * FROM usuarios WHERE id_usuario = ?",
    [id]
    );

    if (rows.length === 0) {
    return fallo(res, "Usuario no encontrado", 404);
    }

    return exito(res, rows[0], "Usuario encontrado");
};


// Crear usuario
exports.createUsuario = async (req, res) => {
    const { nombre, telefono, direccion, correo, ciudad, rol } = req.body;

    const [result] = await db.query(
    `INSERT INTO usuarios 
    (nombre, telefono, direccion, correo, ciudad, rol, contraseña) 
    VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [nombre, telefono, direccion, correo, ciudad, rol]
    );

    return exito(res, { id: result.insertId }, "Usuario creado", 201);
};


// Actualizar usuario
exports.updateUsuario = async (req, res) => {
    const { id } = req.params;
    const { nombre, telefono, direccion, correo, ciudad, rol } = req.body;

    const [result] = await db.query(
    `UPDATE usuarios SET nombre=?, telefono=?, direccion=?, correo=?, ciudad=?, rol=?, contraseña=?
    WHERE id_usuario=?`,
    [nombre, telefono, direccion, correo, ciudad, rol, id]
    );

    if (result.affectedRows === 0) {
    return fallo(res, "Usuario a actualizar no encontrado", 404);
    }

    return exito(res, null, "Usuario actualizado");
};


// Eliminar usuario
exports.deleteUsuario = async (req, res) => {
    const { id } = req.params;

    const [result] = await db.query(
    "DELETE FROM usuarios WHERE id_usuario = ?",
    [id]
    );

    if (result.affectedRows === 0) {
    return fallo(res, "Usuario a eliminar no encontrado", 404);
    }

    return exito(res, null, "Usuario eliminado");
};


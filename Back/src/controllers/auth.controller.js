const db = require("../config/conexion_DB");
const bcrypt = require("bcrypt");
const { exito, fallo } = require("../utils/respuesta");

exports.login = async (req, res) => {
    const { correo, contrasena } = req.body;

    const [rows] = await db.query(
        "SELECT * FROM usuarios WHERE correo = ?",
        [correo]
    );

    if (rows.length === 0) {
        return fallo(res, "Usuario no encontrado", 401);
    }

    const usuario = rows[0];

    // Comparar contraseñas
    const coincide = await bcrypt.compare(contrasena, usuario.contrasena);
    if (!coincide) {
        return fallo(res, "Contraseña incorrecta", 401);
    }

    return exito(res, {
        id: usuario.id_usuario,
        nombre: usuario.nombre,
        rol: usuario.rol
    }, "Login exitoso");
};

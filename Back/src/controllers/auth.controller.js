const db = require("../config/conexion_DB");
const bcrypt = require("bcrypt");
const { exito, fallo } = require("../utils/respuesta");

exports.login = async (req, res) => {
    const { correo, contrasena } = req.body;

    if (!correo || !contrasena) {
        return fallo(res, "Faltan datos", 400);
    }

    const [rows] = await db.query(
        "SELECT * FROM usuarios WHERE correo = ?",
        [correo]
    );

    if (rows.length === 0) {
        return fallo(res, "Correo o contraseña inválidos", 401);
    }

    const usuario = rows[0];

    const passwordOK = await bcrypt.compare(contrasena, usuario.contrasena);
    if (!passwordOK) {
        return fallo(res, "Correo o contraseña inválidos", 401);
    }

    const { contrasena: _, ...sinContrasena } = usuario;

    return exito(res, sinContrasena, "Login exitoso");
};


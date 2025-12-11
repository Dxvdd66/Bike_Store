module.exports = (req, res, next) => {
    if (!req.usuario) {
        return res.status(401).json({ ok: false, mensaje: "No autenticado" });
    }

    if (req.usuario.rol !== "Administrador") {
        return res.status(403).json({ ok: false, mensaje: "Acceso denegado (solo administradores)" });
    }

    next();
};

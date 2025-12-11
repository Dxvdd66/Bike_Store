const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    const token = req.headers["authorization"]?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ ok: false, mensaje: "Token no proporcionado" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "clave_secreta");
        req.usuario = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ ok: false, mensaje: "Token inválido" });
    }
};

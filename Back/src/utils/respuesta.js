function exito(res, data = null, mensaje = "Operacion exitosa", status = 200) {
    return res.status(status).json({
        ok: true,
        mensaje,
        data
    });
}

function fallo(res, mensaje = "Error intento del servidor", status = 500) {
    return res.status(status).json({
        ok: false,
        mensaje
    });
}

module.exports = { exito, fallo}

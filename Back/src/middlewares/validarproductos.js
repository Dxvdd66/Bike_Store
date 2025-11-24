function validarProducto(req, res, next) {
    const { descripcion, precio, color, marca, stock, id_proveedor, id_categoria } = req.body;

    if (!descripcion || !precio || !color || !marca || !stock || !id_proveedor || !id_categoria) {
        return res.status(400).json({
            mensaje: "Faltan campos obligatorios para crear el producto"
        });
    }

    next();
}

module.exports = validarProducto;

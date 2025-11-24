const db = require("../config/conexion_DB");
const { exito, fallo } = require("../utils/respuesta");

// Obtener todos los detalles
exports.getDetalles = async (req, res) => {
  const [rows] = await db.query("SELECT * FROM detalle_pedido");

    if (rows.length === 0) {
    return fallo(res, "No hay detalles de pedidos registrados", 404);
    }

    return exito(res, rows, "Detalles obtenidos");
};

// Obtener detalle por ID
exports.getDetalleById = async (req, res) => {
    const { id } = req.params;

    const [rows] = await db.query(
    "SELECT * FROM detalle_pedido WHERE id_detalle = ?",
    [id]
    );

    if (rows.length === 0) {
    return fallo(res, "Detalle no encontrado", 404);
    }

    return exito(res, rows[0], "Detalle obtenido");
};

// Crear detalle
exports.crearDetalle = async (req, res) => {
    const datos = req.body;

    const [result] = await db.query(
    "INSERT INTO detalle_pedido SET ?",
    [datos]
    );

    return exito(res, { id: result.insertId }, "Detalle creado", 201);
};

// Actualizar detalle
exports.actualizarDetalle = async (req, res) => {
    const { id } = req.params;
    const datos = req.body;

    const [result] = await db.query(
    "UPDATE detalle_pedido SET ? WHERE id_detalle = ?",
    [datos, id]
    );

    if (result.affectedRows === 0) {
    return fallo(res, "Detalle a actualizar no encontrado", 404);
    }

    return exito(res, null, "Detalle actualizado");
};

// Eliminar detalle
exports.eliminarDetalle = async (req, res) => {
    const { id } = req.params;

    const [result] = await db.query(
    "DELETE FROM detalle_pedido WHERE id_detalle = ?",
    [id]
    );

    if (result.affectedRows === 0) {
    return fallo(res, "Detalle a eliminar no encontrado", 404);
    }

    return exito(res, null, "Detalle eliminado");
};


const db = require("../config/conexion_DB");
const { exito, fallo } = require("../utils/respuesta");

// Obtener todos los pedidos
exports.getPedidos = async (req, res) => {
  const [rows] = await db.query("SELECT * FROM pedido");

    if (rows.length === 0) {
    return fallo(res, "No hay pedidos registrados", 404);
    }

    return exito(res, rows, "Pedidos obtenidos");
};

// Obtener un pedido por ID
exports.getPedidoById = async (req, res) => {
    const { id } = req.params;

    const [rows] = await db.query(
    "SELECT * FROM pedido WHERE id_pedido = ?",
    [id]
    );

    if (rows.length === 0) {
    return fallo(res, "Pedido no encontrado", 404);
    }

    return exito(res, rows[0], "Pedido obtenido");
};

// Crear pedido
exports.crearPedido = async (req, res) => {
    const datos = req.body;

    const [result] = await db.query(
    "INSERT INTO pedido SET ?",
    [datos]
    );

    return exito(res, { id: result.insertId }, "Pedido creado", 201);
};

// Actualizar pedido
exports.actualizarPedido = async (req, res) => {
    const { id } = req.params;
    const datos = req.body;

    const [result] = await db.query(
    "UPDATE pedido SET ? WHERE id_pedido = ?",
    [datos, id]
    );

    if (result.affectedRows === 0) {
    return fallo(res, "Pedido a actualizar no encontrado", 404);
    }

    return exito(res, null, "Pedido actualizado");
};

// Eliminar pedido
exports.eliminarPedido = async (req, res) => {
    const { id } = req.params;

    const [result] = await db.query(
    "DELETE FROM pedido WHERE id_pedido = ?",
    [id]
    );

    if (result.affectedRows === 0) {
    return fallo(res, "Pedido a eliminar no encontrado", 404);
    }

    return exito(res, null, "Pedido eliminado");
};

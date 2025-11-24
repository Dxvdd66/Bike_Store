const db = require("../config/conexion_DB");
const { exito, fallo } = require("../utils/respuesta");

// Obtener todos los proveedores
exports.getProveedores = async (req, res) => {
  const [rows] = await db.query("SELECT * FROM proveedor");

    if (rows.length === 0) {
    return fallo(res, "No hay proveedores registrados", 404);
    }

    return exito(res, rows, "Proveedores obtenidos");
};

// Obtener proveedor por ID
exports.getProveedorById = async (req, res) => {
    const { id } = req.params;

    const [rows] = await db.query(
    "SELECT * FROM proveedor WHERE id_proveedor = ?",
    [id]
    );

    if (rows.length === 0) {
    return fallo(res, "Proveedor no encontrado", 404);
    }

    return exito(res, rows[0], "Proveedor encontrado");
};

// Crear proveedor
exports.crearProveedor = async (req, res) => {
    const datos = req.body;

    const [result] = await db.query(
    "INSERT INTO proveedor SET ?",
    [datos]
    );

    return exito(res, { id: result.insertId }, "Proveedor creado", 201);
};

// Actualizar proveedor
exports.actualizarProveedor = async (req, res) => {
    const { id } = req.params;
    const datos = req.body;

    const [result] = await db.query(
    "UPDATE proveedor SET ? WHERE id_proveedor = ?",
    [datos, id]
    );

    if (result.affectedRows === 0) {
    return fallo(res, "Proveedor a actualizar no encontrado", 404);
    }

    return exito(res, null, "Proveedor actualizado");
};

// Eliminar proveedor
exports.eliminarProveedor = async (req, res) => {
    const { id } = req.params;

    const [result] = await db.query(
    "DELETE FROM proveedor WHERE id_proveedor = ?",
    [id]
    );

    if (result.affectedRows === 0) {
    return fallo(res, "Proveedor a eliminar no encontrado", 404);
    }

    return exito(res, null, "Proveedor eliminado");
};


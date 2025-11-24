const db = require("../config/conexion_DB");
const { exito, fallo } = require("../utils/respuesta");

// Obtener todas las categorías
exports.getCategorias = async (req, res, next) => {
    try {
    const [rows] = await db.query("SELECT * FROM categoria");

    if (rows.length === 0) {
    return fallo(res, "No hay categorías registradas", 404);
    }

    return exito(res, rows, "Categorías obtenidas");
    } catch (err) {
    next(err);
    }
};

// Obtener categoría por ID
exports.getCategoria = async (req, res, next) => {
    try {
    const { id } = req.params;

    const [rows] = await db.query(
      "SELECT * FROM categoria WHERE id_categoria = ?",
    [id]
    );

    if (rows.length === 0) {
    return fallo(res, "Categoría no encontrada", 404);
    }

    return exito(res, rows[0], "Categoría encontrada");
    } catch (err) {
    next(err);
    }
};

// Crear categoría
exports.createCategoria = async (req, res, next) => {
    try {
    const { nombre_categoria } = req.body;

    if (!nombre_categoria) {
    return fallo(res, "El nombre de la categoría es obligatorio", 400);
    }

    const [result] = await db.query(
    "INSERT INTO categoria (nombre_categoria) VALUES (?)",
    [nombre_categoria]
    );

    return exito(res, { id: result.insertId }, "Categoría creada", 201);
    } catch (err) {
    next(err);
    }
};

// Actualizar categoría
exports.updateCategoria = async (req, res, next) => {
    try {
    const { id } = req.params;
    const { nombre_categoria } = req.body;

    const [result] = await db.query(
    "UPDATE categoria SET nombre_categoria=? WHERE id_categoria=?",
    [nombre_categoria, id]
    );

    if (result.affectedRows === 0) {
    return fallo(res, "Categoría no encontrada para actualizar", 404);
    }

    return exito(res, null, "Categoría actualizada correctamente");
    } catch (err) {
    next(err);
    }
};

// Eliminar categoría
exports.deleteCategoria = async (req, res, next) => {
    try {
    const { id } = req.params;

    const [result] = await db.query(
    "DELETE FROM categoria WHERE id_categoria = ?",
    [id]
    );

    if (result.affectedRows === 0) {
    return fallo(res, "Categoría no encontrada para eliminar", 404);
    }

    return exito(res, null, "Categoría eliminada con éxito");
} catch (err) {
    next(err);
}
};

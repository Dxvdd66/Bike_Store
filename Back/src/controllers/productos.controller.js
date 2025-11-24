const db = require("../config/conexion_DB");
const { exito, fallo } = require("../utils/respuesta");

// Obtener todos los productos
exports.getProductos = async (req, res) => {
  const [rows] = await db.query("SELECT * FROM productos");

  if (rows.length === 0) {
    return fallo(res, "No hay productos registrados", 404);
  }

  return exito(res, rows, "Productos obtenidos");
};

// Obtener producto por ID
exports.getProductoById = async (req, res) => {
  const { id } = req.params;

  const [rows] = await db.query(
    "SELECT * FROM productos WHERE id_producto = ?",
    [id]
  );

  if (rows.length === 0) {
    return fallo(res, "Producto no encontrado", 404);
  }

  return exito(res, rows[0], "Producto encontrado");
};

// Crear producto
exports.crearProducto = async (req, res) => {
  const datos = req.body;

  // Si viene imagen, agregar filename
  if (req.file) {
    datos.imagen = req.file.filename;
  }

  const [result] = await db.query("INSERT INTO productos SET ?", [datos]);

  return exito(res, { id: result.insertId }, "Producto creado", 201);
};

// Actualizar producto
exports.actualizarProducto = async (req, res) => {
  const { id } = req.params;
  const datos = req.body;

  // Si viene imagen nueva
  if (req.file) {
    datos.imagen = req.file.filename;
  }

  const [result] = await db.query(
    "UPDATE productos SET ? WHERE id_producto = ?",
    [datos, id]
  );

  if (result.affectedRows === 0) {
    return fallo(res, "Producto a actualizar no encontrado", 404);
  }

  return exito(res, null, "Producto actualizado");
};

// Eliminar producto
exports.eliminarProducto = async (req, res) => {
  const { id } = req.params;

  const [result] = await db.query(
    "DELETE FROM productos WHERE id_producto = ?",
    [id]
  );

  if (result.affectedRows === 0) {
    return fallo(res, "Producto a eliminar no encontrado", 404);
  }

  return exito(res, null, "Producto eliminado");
};


const db = require("../config/conexion_DB");
const { exito, fallo } = require("../utils/respuesta");
const ImagenesController = require("./imagenes.controller");

// Obtener todos los productos
exports.getProductos = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT p.*, 
            c.nombre_categoria, 
            pr.nombre_proveedor
      FROM productos p
      LEFT JOIN categoria c ON p.id_categoria = c.id_categoria
      LEFT JOIN proveedor pr ON p.id_proveedor = pr.id_proveedor
    `);

    if (rows.length === 0) {
      return fallo(res, "No hay productos registrados", 404);
    }

    return exito(res, rows, "Productos obtenidos");
  } catch (error) {
    console.error("Error al obtener productos:", error);
    return fallo(res, "Error interno del servidor", 500);
  }
};


// Obtener producto por ID
exports.getProductoById = async (req, res) => {
  try {
    const { id } = req.params;

    const [rows] = await db.query(
      "SELECT * FROM productos WHERE id_producto = ?",
      [id]
    );

    if (rows.length === 0) {
      return fallo(res, "Producto no encontrado", 404);
    }

    return exito(res, rows[0], "Producto encontrado");
  } catch (error) {
    console.error("Error al obtener producto:", error);
    return fallo(res, "Error interno", 500);
  }
};


// Crear producto
// Crear producto (con base64 opcional)
exports.crearProducto = async (req, res) => {
  try {
    const { imagen, ...datos } = req.body; // separo la imagen

    // 1. Crear producto sin imagen
    const [result] = await db.query("INSERT INTO productos SET ?", [datos]);
    const id = result.insertId;

    // 2. Si viene imagen base64, guardarla
    if (imagen) {
      await ImagenesController.guardarImagen(
        "productos",
        "id_producto",
        id,
        imagen
      );
    }

    return exito(res, { id }, "Producto creado correctamente", 201);
  } catch (error) {
    console.error("Error al crear producto:", error);
    return fallo(res, "Error interno del servidor", 500);
  }
};


// Actualizar producto
// Actualizar producto (con base64 opcional)
exports.actualizarProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const { imagen, ...datos } = req.body;

    // Actualizar datos básicos
    const [result] = await db.query(
      "UPDATE productos SET ? WHERE id_producto = ?",
      [datos, id]
    );

    if (result.affectedRows === 0) {
      return fallo(res, "Producto no encontrado", 404);
    }

    // Si vino una nueva imagen Base64
    if (imagen) {
      await ImagenesController.guardarImagen(
        "productos",
        "id_producto",
        id,
        imagen
      );
    }

    return exito(res, null, "Producto actualizado");
  } catch (error) {
    console.error("Error al actualizar producto:", error);
    return fallo(res, "Error interno del servidor", 500);
  }
};


// Eliminar producto
exports.eliminarProducto = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await db.query(
      "DELETE FROM productos WHERE id_producto = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return fallo(res, "Producto a eliminar no encontrado", 404);
    }

    return exito(res, null, "Producto eliminado");

  } catch (error) {

    // Error de llave foránea (no se puede borrar)
    if (error.code === "ER_ROW_IS_REFERENCED_2") {
      return fallo(
        res,
        "No se puede eliminar el producto porque está asociado a pedidos.",
        400
      );
    }

    // Otros errores
    console.error("ERROR al eliminar producto:", error);
    return fallo(res, "Error interno al eliminar producto", 500);
  }
};

// Obtener categorias
exports.getCategorias = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM categoria");

    if (rows.length === 0) {
      return fallo(res, "No hay categorías registradas", 404);
    }

    return exito(res, rows, "Categorías obtenidas");
  } catch (error) {
    console.error("Error al obtener categorías:", error);
    return fallo(res, "Error interno del servidor", 500);
  }
};

// Obtener proveedores
exports.getProveedores = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT id_proveedor, nombre_proveedor FROM proveedor");

    if (rows.length === 0) {
      return fallo(res, "No hay proveedores registrados", 404);
    }

    return exito(res, rows, "Proveedores obtenidos");
  } catch (error) {
    console.error("Error al obtener proveedores:", error);
    return fallo(res, "Error interno del servidor", 500);
  }
};

const db = require("../config/conexion_DB");
const { exito, fallo } = require("../utils/respuesta");

// Obtener productos más vendidos (para gráfico)
exports.getProductosMasVendidos = async (req, res, next) => {
  try {
    const [rows] = await db.query(`
        SELECT 
            p.id_producto,
            p.descripcion AS producto,
            COALESCE(COUNT(dp.id_producto), 0) AS cantidad_vendida,
            COALESCE(SUM(dp.precio_total), 0) AS total_vendido
        FROM productos p
        LEFT JOIN detalle_pedido dp
            ON dp.id_producto = p.id_producto
        GROUP BY p.id_producto, p.descripcion
        ORDER BY cantidad_vendida DESC;

    `);

    if (rows.length === 0) {
      return fallo(res, "No hay productos registrados", 404);
    }

    return exito(res, rows, "Productos más vendidos obtenidos");
  } catch (err) {
    next(err);
  }
};

const db = require("../config/conexion_DB");
const { exito, fallo } = require("../utils/respuesta");

// Obtener productos más vendidos (para gráfico)
exports.getProductosMasVendidos = async (req, res, next) => {
    try {
        const [rows] = await db.query(
            `
            SELECT 
                p.descripcion AS producto,
                COUNT(dp.id_producto) AS cantidad_vendida,
                SUM(dp.precio_total) AS total_vendido
            FROM detalle_pedido dp
            INNER JOIN productos p ON dp.id_producto = p.id_producto
            WHERE dp.estado = 'pagado'
            GROUP BY p.id_producto, p.descripcion
            ORDER BY cantidad_vendida DESC;
            `
        );

        if (rows.length === 0) {
            return fallo(res, "No hay ventas registradas", 404);
        }

        return exito(res, rows, "Productos más vendidos obtenidos");
    } catch (err) {
        next(err);
    }
};

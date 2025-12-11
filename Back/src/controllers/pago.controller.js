// src/controllers/pago.controller.js
const db = require("../config/conexion_DB");

exports.registrarPedido = async (req, res) => {
  let connection;
  try {
    // Obtener una conexión del pool
    connection = await db.getConnection();
    await connection.beginTransaction();

    const { nombre, telefono, ciudad, direccion, productos, id_usuario } = req.body;

    if (!productos || productos.length === 0) {
      return res.status(400).json({ success: false, msg: "No hay productos en el carrito" });
    }

    if (!id_usuario) {
      return res.status(400).json({ success: false, msg: "Usuario no identificado" });
    }

    // 1️⃣ Insertar pedido con precio inicial 0
    const [pedidoResult] = await connection.query(
      "INSERT INTO pedido (fecha, precio_unitario, descripcion, id_usuario) VALUES (NOW(), 0, '', ?)",
      [id_usuario]
    );

    const id_pedido = pedidoResult.insertId;

    // 2️⃣ Insertar envío
    await connection.query(
      "INSERT INTO pedido_envio (id_pedido, nombre, telefono, ciudad, direccion, creado_en) VALUES (?, ?, ?, ?, ?, NOW())",
      [id_pedido, nombre, telefono, ciudad, direccion]
    );

    let totalPedido = 0;

    // 3️⃣ Insertar detalle y actualizar stock
    for (const item of productos) {
      const precio_unitario = item.precio_unitario || 0;
      const cantidad = item.cantidad || 1;
      const precio_total = precio_unitario * cantidad;

      totalPedido += precio_total;

        await connection.query(
        "INSERT INTO detalle_pedido (descripcion, precio_total, fecha, id_pedido, id_producto) VALUES (?, ?, NOW(), ?, ?)",
        [item.descripcion || "", precio_total, id_pedido, item.id_producto]
        );


      // Actualizar stock
      const [stockUpdate] = await connection.query(
        "UPDATE productos SET stock = stock - ? WHERE id_producto = ? AND stock >= ?",
        [cantidad, item.id_producto, cantidad]
      );

      if (stockUpdate.affectedRows === 0) {
        throw new Error(`No hay suficiente stock para el producto ID ${item.id_producto}`);
      }
    }

    // 4️⃣ Actualizar precio total del pedido
    await connection.query(
      "UPDATE pedido SET precio_unitario = ? WHERE id_pedido = ?",
      [totalPedido, id_pedido]
    );

    await connection.commit();

    res.json({ success: true, id_pedido, total: totalPedido, msg: "Pedido registrado correctamente" });
  } catch (error) {
    if (connection) await connection.rollback();
    console.error("Error al registrar pedido:", error.message);
    res.status(500).json({ success: false, msg: "Error al registrar pedido", error: error.message });
  } finally {
    if (connection) connection.release();
  }
};

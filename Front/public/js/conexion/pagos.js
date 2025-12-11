// ================================
// CONEXIÓN AL BACKEND - PAGOS
// ================================
const API_PAGOS = "http://localhost:3000/api/pagos";

/**
 * Registrar pedido en la base de datos
 * @param {Object} data { id_pedido, nombre, telefono, ciudad, direccion }
 */
export async function registrarPedidoAPI(data) {
    const res = await fetch(`${API_PAGOS}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });

    const json = await res.json();

    if (!res.ok) {
        throw new Error(json.msg || "Error al registrar el pedido");
    }

    return json;
}

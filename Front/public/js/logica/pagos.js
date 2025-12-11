import { registrarPedidoAPI } from "../conexion/pagos.js";
import { getCart, renderCart } from "./carrito.js";

// ===============================
// VALIDAR LOGIN ANTES DE PAGAR
// ===============================

document.addEventListener("click", (e) => {
    if (e.target.id === "btnPagar") {

        const token = localStorage.getItem("token");

        if (!token) {
            alert("⚠️ Debes iniciar sesión antes de pagar");

            abrirModal("modalLogin");
            return;
        }

        abrirModal("modalPago");
    }
});


// ===============================
// FORMULARIO DE PAGO
// ===============================

const formPago = document.getElementById("formPago");

if (formPago) {
    formPago.addEventListener("submit", async (e) => {
        e.preventDefault();

        const nombre = document.getElementById("pagoNombre").value;
        const telefono = parseInt(document.getElementById("pagoTelefono").value);
        const ciudad = document.getElementById("pagoCiudad").value;
        const direccion = document.getElementById("pagoDireccion").value;

        // 🔹 Obtener usuario logueado
        const usuario = JSON.parse(localStorage.getItem("usuario") || "{}");

        if (!usuario.id_usuario) {
            alert("⚠️ No se encontró usuario logueado.");
            abrirModal("modalLogin");
            return;
        }

        // 🔹 Obtener el carrito
        const cart = getCart();

        const payload = {
            nombre,
            telefono,
            ciudad,
            direccion,
            id_usuario: usuario.id_usuario, // ✅ ahora está definido
            productos: cart.map(item => ({
                id_producto: item.id,
                cantidad: item.cantidad,
                precio_unitario: item.precio
            }))
        };

        try {
            await registrarPedidoAPI(payload);

            alert("✅ Pedido realizado correctamente");

            localStorage.removeItem("carrito");
            cerrarModal("modalPago");
            cerrarModal("modalCarrito");
            renderCart();

        } catch (error) {
            console.error("❌ Error al procesar pago:", error.message);
            alert("❌ No se pudo procesar el pedido");
        }
    });
}

// carritoVista.js
import { aumentarCantidad, disminuirCantidad, eliminarProducto } from "../carrito.js";

document.addEventListener("DOMContentLoaded", () => {

    const contenedor = document.getElementById("contenedor-carrito");
    const totalTexto = document.getElementById("total-pagar");
    const mensajeDiv = document.getElementById("mensaje-carrito");

    function renderizarCarrito() {
        let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

        contenedor.innerHTML = "";
        let total = 0;

        if (carrito.length === 0) {
            contenedor.innerHTML = "<p>El carrito está vacío.</p>";
            totalTexto.textContent = "$0";
            return;
        }

        carrito.forEach(item => {
            const fila = document.createElement("div");
            fila.classList.add("item-carrito");

            fila.innerHTML = `
                <img src="${item.img}" class="img-carrito">
                <div class="info">
                    <h3>${item.nombre}</h3>
                    <p>Precio: $${item.precio}</p>
                    <div class="item-cant">
                        <button class="btn-cant btn-disminuir">-</button>
                        <span>${item.cantidad}</span>
                        <button class="btn-cant btn-aumentar">+</button>
                    </div>
                    <p class="subtotal">Subtotal: $${item.precio * item.cantidad}</p>
                    <button class="item-eliminar">Eliminar</button>
                </div>
            `;

            // Botones
            fila.querySelector(".btn-aumentar").addEventListener("click", () => {
                aumentarCantidad(item.id);
                renderizarCarrito();
            });

            fila.querySelector(".btn-disminuir").addEventListener("click", () => {
                disminuirCantidad(item.id);
                renderizarCarrito();
            });

            fila.querySelector(".item-eliminar").addEventListener("click", () => {
                eliminarProducto(item.id);
                renderizarCarrito();
            });

            total += item.precio * item.cantidad;
            contenedor.appendChild(fila);
        });

        totalTexto.textContent = "$" + total;
    }

    // Escuchar evento para mostrar mensaje de producto añadido
    document.addEventListener("productoAnadido", (e) => {
        if (!mensajeDiv) return;

        mensajeDiv.textContent = `¡Añadiste ${e.detail.nombre} al carrito!`;
        mensajeDiv.style.display = "block";

        setTimeout(() => {
            mensajeDiv.style.display = "none";
        }, 2000);
    });

    // Primera renderización
    renderizarCarrito();
});

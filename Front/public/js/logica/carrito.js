document.addEventListener("DOMContentLoaded", () => {
    const contenedor = document.getElementById("contenedor-carrito");
    const totalTexto = document.getElementById("total-pagar");

    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    if (carrito.length === 0) {
        contenedor.innerHTML = "<p>El carrito está vacío.</p>";
        totalTexto.textContent = "$0";
        return;
    }

    contenedor.innerHTML = "";
    let total = 0;

    carrito.forEach(item => {
        const fila = document.createElement("div");
        fila.classList.add("item-carrito");

        fila.innerHTML = `
            <img src="${item.img}" class="img-carrito">

            <div class="info">
                <h3>${item.nombre}</h3>
                <p>Precio: $${item.precio}</p>
                <p>Cantidad: ${item.cantidad}</p>
                <p class="subtotal">Subtotal: $${item.precio * item.cantidad}</p>
            </div>
        `;

        total += item.precio * item.cantidad;
        contenedor.appendChild(fila);
    });

    totalTexto.textContent = "$" + total;
});


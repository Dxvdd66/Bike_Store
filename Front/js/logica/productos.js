import { obtenerProductos } from "../conexion/apiProductos.js";

const contenedor = document.getElementById("contenedor-productos");

async function cargarProductos() {
    const productos = await obtenerProductos();

    if (productos.length === 0) {
        contenedor.innerHTML = "<p>No hay productos disponibles.</p>";
        return;
    }

    productos.forEach(producto => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <h3>${producto.nombre}</h3>
            <p>${producto.descripcion || "Sin descripción"}</p>
            <p class="precio">$${producto.precio}</p>
        `;

        contenedor.appendChild(card);
    });
}

cargarProductos();

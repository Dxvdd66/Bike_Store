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
            <img src="${producto.imagen}" alt="${producto.nombre}" class="img-producto">

            <h3>${producto.descripcion}</h3>
            <p class="precio">$${producto.precio}</p>
        `;

        contenedor.appendChild(card);
    });
}

cargarProductos();
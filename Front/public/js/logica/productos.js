// public/js/logica/productos.js
import { obtenerProductos } from "../conexion/apiProductos.js";

const contenedor = document.getElementById("contenedor-productos");

async function cargarProductos() {
    const productos = await obtenerProductos();

    if (!contenedor) {
        console.error("No se encontró #contenedor-productos en el DOM");
        return;
    }

    if (!productos || productos.length === 0) {
        contenedor.innerHTML = "<p>No hay productos disponibles.</p>";
        return;
    }

    contenedor.innerHTML = ""; // limpiar antes de renderizar

    productos.forEach(producto => {
        const card = document.createElement("div");
        card.classList.add("card");

        // crea el HTML base sin onclick inline
        card.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.descripcion}" class="img-producto">
            <h3>${producto.descripcion}</h3>
            <p class="precio">$${producto.precio}</p>
        `;

        // crear botón y asignar evento con closure que llama a addToCart
        const btn = document.createElement("button");
        btn.className = "btn-nav btn-add";
        btn.textContent = "Añadir al carrito";

        btn.addEventListener("click", () => {
            // normalizamos el objeto que vamos a guardar
            const prodParaCarrito = {
                id: producto.id_producto,
                nombre: producto.descripcion,
                precio: Number(producto.precio),
                imagen: producto.imagen
            };

            // opcional: debug
            console.log("Añadiendo al carrito:", prodParaCarrito);

            addToCart(prodParaCarrito);
        });

        card.appendChild(btn);
        contenedor.appendChild(card);
    });
}

cargarProductos();


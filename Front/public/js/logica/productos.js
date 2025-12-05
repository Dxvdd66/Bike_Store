<<<<<<< Updated upstream
=======
// productos.js
>>>>>>> Stashed changes
import { obtenerProductos } from "../conexion/apiProductos.js";
import { addToCart } from "../carrito.js";

<<<<<<< Updated upstream
const contenedor = document.getElementById("contenedor-productos");

async function cargarProductos() {
    const productos = await obtenerProductos();

    if (productos.length === 0) {
        contenedor.innerHTML = "<p>No hay productos disponibles.</p>";
=======
let productosCache = [];
const contenedorId = "contenedor-productos";

function debounce(fn, wait = 300) {
    let t;
    return (...args) => {
        clearTimeout(t);
        t = setTimeout(() => fn(...args), wait);
    };
}

async function inicializar() {
    if (document.readyState === "loading") {
        await new Promise(res => document.addEventListener("DOMContentLoaded", res, { once: true }));
    }

    const contenedor = document.getElementById(contenedorId);
    if (!contenedor) return;

    const inputBusqueda =
        document.getElementById("input-busqueda") ||
        document.querySelector(".input-busqueda");

    try {
        productosCache = await obtenerProductos();
        if (!Array.isArray(productosCache)) productosCache = [];
    } catch (err) {
        console.error("Error al obtener productos:", err);
        productosCache = [];
    }

    renderizarProductos(productosCache, contenedor);

    if (inputBusqueda) {
        const onInput = debounce((e) => {
            const texto = String(e.target.value || "").trim();
            filtrarYRenderizar(texto, contenedor);
        }, 250);

        inputBusqueda.addEventListener("input", onInput);
        inputBusqueda.addEventListener("search", onInput);
    }
}

function renderizarProductos(productos, contenedor) {
    contenedor.innerHTML = "";

    if (!productos || productos.length === 0) {
        contenedor.innerHTML = "<h1>Producto no encontrado.</h1>";
>>>>>>> Stashed changes
        return;
    }

    productos.forEach(producto => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
<<<<<<< Updated upstream
            <img src="${producto.imagen}" alt="${producto.nombre}" class="img-producto">

=======
            <img src="${producto.imagen}" alt="${producto.descripcion}" class="img-producto">
>>>>>>> Stashed changes
            <h3>${producto.descripcion}</h3>
            <p class="precio">$${producto.precio}</p>
        `;

<<<<<<< Updated upstream
=======
        const btn = document.createElement("button");
        btn.className = "btn-nav btn-add";
        btn.textContent = "Añadir al carrito";

        btn.addEventListener("click", () => {
            const prodParaCarrito = {
                id: producto.id_producto, 
                nombre: producto.descripcion,
                precio: Number(producto.precio),
                imagen: producto.imagen
            };
            addToCart(prodParaCarrito);
        });

        card.appendChild(btn);
>>>>>>> Stashed changes
        contenedor.appendChild(card);
    });
}

<<<<<<< Updated upstream
cargarProductos();
=======
function filtrarYRenderizar(filtro, contenedor) {
    if (!filtro) {
        renderizarProductos(productosCache, contenedor);
        return;
    }

    const productosFiltrados = productosCache.filter(prod =>
        (prod.descripcion || "").toLowerCase().includes(filtro.toLowerCase())
        || (String(prod.id_producto || "")).includes(filtro)
    );

    renderizarProductos(productosFiltrados, contenedor);
}

// Ejecutar inicialización
inicializar();
>>>>>>> Stashed changes

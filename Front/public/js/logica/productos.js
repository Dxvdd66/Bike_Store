// public/js/logica/productos.js
import { obtenerProductos } from "../conexion/apiProductos.js";
import { addToCart } from "./carrito.js";


let productosCache = []; // cache para no pedir siempre al backend
const contenedorId = "contenedor-productos";

function debounce(fn, wait = 300) {
    let t;
    return (...args) => {
        clearTimeout(t);
        t = setTimeout(() => fn(...args), wait);
    };
}

async function inicializar() {
    // Esperar por el DOM
    if (document.readyState === "loading") {
        await new Promise(res => document.addEventListener("DOMContentLoaded", res, { once: true }));
    }

    const contenedor = document.getElementById(contenedorId);
    if (!contenedor) {
        console.error(`[productos.js] No se encontró #${contenedorId} en el DOM.`);
        return;
    }

    // Buscar input por id o por clase (soporte ambas opciones)
    const inputBusqueda =
        document.getElementById("input-busqueda") ||
        document.querySelector(".input-busqueda");

    if (!inputBusqueda) {
        console.warn("[productos.js] No se encontró input de búsqueda (id='input-busqueda' o class='input-busqueda'). El buscador no estará disponible.");
    }

    // Cargar productos (una sola vez). Control de errores incluido.
    try {
        productosCache = await obtenerProductos();
        if (!Array.isArray(productosCache)) {
            console.error("[productos.js] obtenerProductos() no devolvió un array.", productosCache);
            productosCache = [];
        }
    } catch (err) {
        console.error("[productos.js] Error al obtener productos:", err);
        productosCache = [];
    }

    // Render inicial (sin filtro)
    renderizarProductos(productosCache, contenedor);

    // Si existe el input, attach event con debounce
    if (inputBusqueda) {
        const onInput = debounce((e) => {
            const texto = String(e.target.value || "").trim();
            filtrarYRenderizar(texto, contenedor);
        }, 250);

        inputBusqueda.addEventListener("input", onInput);
        // Si quieres que el input vacio recargue todo, deja esto:
        inputBusqueda.addEventListener("search", onInput); // por si el navegador soporta evento search
    }
}

function renderizarProductos(productos, contenedor) {
    contenedor.innerHTML = "";

    if (!productos || productos.length === 0) {
        contenedor.innerHTML = "<h1>Producto no encontrado!.</h1>";
        return;
    }

    productos.forEach(producto => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.descripcion}" class="img-producto">
            <h3>${producto.descripcion}</h3>
            <p class="precio">$${producto.precio}</p>
        `;

        const btn = document.createElement("button");
        btn.className = "btn-nav btn-add";

        if (producto.stock > 0) {
            btn.textContent = "Añadir al carrito";
            btn.addEventListener("click", () => {
                const prodParaCarrito = {
                    id: producto.id_producto,
                    nombre: producto.descripcion,
                    precio: Number(producto.precio),
                    imagen: producto.imagen,
                    cantidad: 1
                };

                addToCart(prodParaCarrito);
                abrirModal("modalCarrito");
            });
        } else {
            btn.textContent = "Agotado";
            btn.disabled = true; // ❌ Deshabilitar botón si no hay stock
            btn.classList.add("btn-disabled"); // Opcional: puedes darle estilo
        }

        card.appendChild(btn);
        contenedor.appendChild(card);
    });
}


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

// arrancar
inicializar();
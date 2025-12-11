export {};

const CART_KEY = "carrito";

export function getCart() {
    return JSON.parse(localStorage.getItem(CART_KEY) || "[]");
}

export function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

export function addToCart(producto) {
    const cart = getCart();

    const existente = cart.find(p => p.id === producto.id);

    if (existente) {
        existente.cantidad += 1;
    } else {
        producto.cantidad = 1;
        cart.push(producto);
    }

    saveCart(cart);
}

function actualizarCantidad(id, delta) {
    const cart = getCart();
    const item = cart.find(p => p.id === id);

    if (!item) return;

    item.cantidad += delta;

    if (item.cantidad < 1) {
        const idx = cart.indexOf(item);
        cart.splice(idx, 1);
    }

    saveCart(cart);
    renderCart();
}

function eliminarProducto(id) {
    const cart = getCart().filter(p => p.id !== id);
    saveCart(cart);
    renderCart();
}

function calcularTotal(cart) {
    return cart.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
}

export function renderCart() {
    const cart = getCart();

    const lista = document.getElementById("lista-carrito");
    const totalSpan = document.getElementById("total-carrito");

    if (!lista) return;

    lista.innerHTML = "";

    cart.forEach(item => {
        const div = document.createElement("div");

        div.className = "item-carrito";

        div.innerHTML = `
            <img src="${item.imagen}" width="50">

            <span class="nombre">${item.nombre}</span>

            <div class="cantidad">
                <button class="btn-cant" data-id="${item.id}" data-op="-">-</button>
                <span>${item.cantidad}</span>
                <button class="btn-cant" data-id="${item.id}" data-op="+">+</button>
            </div>

            <span class="precio">$${item.precio * item.cantidad}</span>

            <button class="btn-eliminar" data-id="${item.id}">🗑</button>
        `;

        lista.appendChild(div);
    });

    if (totalSpan) {
        totalSpan.textContent = calcularTotal(cart);
    }

    // ✅ ACTIVAR / DESACTIVAR BOTÓN PAGAR
    const btnPagar = document.getElementById("btnPagar");

    if (btnPagar) {
        btnPagar.disabled = cart.length === 0; // habilita solo si hay productos
    }

    // listeners de botones
    document.querySelectorAll(".btn-cant").forEach(btn => {
        btn.addEventListener("click", () => {
            const id = Number(btn.dataset.id);
            const op = btn.dataset.op === "+" ? 1 : -1;
            actualizarCantidad(id, op);
        });
    });

    document.querySelectorAll(".btn-eliminar").forEach(btn => {
        btn.addEventListener("click", () => {
            eliminarProducto(Number(btn.dataset.id));
        });
    });
}


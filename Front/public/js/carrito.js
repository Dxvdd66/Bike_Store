// carrito.js

export function addToCart(producto) {
    console.log("addToCart ejecutado:", producto);

    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    const index = carrito.findIndex(item => item.id === producto.id);

    if (index !== -1) {
        carrito[index].cantidad++;
    } else {
        carrito.push({
            id: producto.id,
            nombre: producto.nombre,
            precio: producto.precio,
            img: producto.imagen,
            cantidad: 1
        });
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));

    // Disparar evento personalizado para avisar que se añadió producto
    const event = new CustomEvent("productoAnadido", { detail: producto });
    document.dispatchEvent(event);
}

// Función para aumentar cantidad
export function aumentarCantidad(id) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const index = carrito.findIndex(item => item.id === id);
    if (index !== -1) {
        carrito[index].cantidad++;
        localStorage.setItem("carrito", JSON.stringify(carrito));
    }
}

// Función para disminuir cantidad
export function disminuirCantidad(id) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const index = carrito.findIndex(item => item.id === id);
    if (index !== -1) {
        carrito[index].cantidad--;
        if (carrito[index].cantidad <= 0) {
            carrito.splice(index, 1); // elimina si llega a 0
        }
        localStorage.setItem("carrito", JSON.stringify(carrito));
    }
}

// Función para eliminar producto
export function eliminarProducto(id) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito = carrito.filter(item => item.id !== id);
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

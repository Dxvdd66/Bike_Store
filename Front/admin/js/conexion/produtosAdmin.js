const API_PRODUCTOS = "http://localhost:3000/api/productos";

export async function obtenerProductos() {
    try {
        const res = await fetch(API_PRODUCTOS);
        const data = await res.json();

        if (!res.ok) throw new Error(data.mensaje);

        return data.data;
    } catch (error) {
        console.error("Error API productos:", error);
        return [];
    }
}

// Crear producto
export async function crearProducto(producto) {
    try {
        const res = await fetch(API_PRODUCTOS, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(producto),
        });

        return await res.json();
    } catch (error) {
        console.error("Error creando producto:", error);
    }
}

// Actualizar producto
export async function actualizarProducto(id, producto) {
    try {
        const res = await fetch(`${API_PRODUCTOS}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(producto),
        });

        return await res.json();
    } catch (error) {
        console.error("Error actualizando producto:", error);
    }
}

// Eliminar producto
export async function eliminarProducto(id) {
    try {
        const res = await fetch(`${API_PRODUCTOS}/${id}`, {
            method: "DELETE",
        });

        return await res.json();
    } catch (error) {
        console.error("Error eliminando producto:", error);
    }
}

export async function obtenerCategorias() {
    try {
        const res = await fetch(`${API_PRODUCTOS}/categorias`);
        const data = await res.json();

        if (!res.ok) throw new Error(data.mensaje);

        return data.data; // lista de categorías
    } catch (error) {
        console.error("Error API categorías:", error);
        return [];
    }
}

export async function obtenerProveedores() {
    try {
        const res = await fetch(`${API_PRODUCTOS}/proveedores`);
        const data = await res.json();

        if (!res.ok) throw new Error(data.mensaje);

        return data.data;
    } catch (error) {
        console.error("Error API proveedores:", error);
        return [];
    }
}

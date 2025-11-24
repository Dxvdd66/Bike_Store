const API_PRODUCTOS = "http://localhost:3000/api/productos";

export async function obtenerProductos() {
    try {
        const res = await fetch(API_PRODUCTOS);
        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.mensaje || "Error al obtener productos");
        }

        return data.data; // backend devuelve { data: [...] }
    } catch (error) {
        console.error("Error API productos:", error);
        return [];
    }
}

const API_URL = "http://localhost:3000/api/productos";

export async function obtenerProductos() {
    try {
        const res = await fetch(API_URL);
        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.mensaje || "Error al obtener productos");
        }

        return data.data; // tu backend usa data.data
    } catch (error) {
        console.error("Error API:", error);
        return [];
    }
}
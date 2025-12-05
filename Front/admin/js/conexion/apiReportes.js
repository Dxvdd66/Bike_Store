const API_REPORTE_PRODUCTOS = "http://localhost:3000/api/reportes/productos-mas-vendidos";

export async function obtenerProductosMasVendidos() {
    try {
        const res = await fetch(API_REPORTE_PRODUCTOS);
        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.mensaje || "Error al obtener productos más vendidos");
        }

        return data.data; // el backend responde con { data }
    } catch (error) {
        console.error("Error API reporte productos vendidos:", error);
        return [];
    }
}

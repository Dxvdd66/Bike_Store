const API_USUARIOS = "http://localhost:3000/api/usuarios";

export async function obtenerUsuarios() {
    try {
        const res = await fetch(API_USUARIOS);
        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.mensaje || "Error al obtener usuarios");
        }

        return data.data; // tu backend devuelve { data: [...] }
    } catch (error) {
        console.error("Error API usuarios:", error);
        return [];
    }
}

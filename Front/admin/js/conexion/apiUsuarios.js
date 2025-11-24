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

// Crear usuario
export async function crearUsuario(data) {
    try {
        const res = await fetch(API_USUARIOS, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        return await res.json();
    } catch (error) {
        console.error("Error creando usuario:", error);
    }
}

// Actualizar usuario
export async function editarUsuario(id, data) {
    try {
        const res = await fetch(`${API_USUARIOS}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        return await res.json();
    } catch (error) {
        console.error("Error editando usuario:", error);
    }
}

// Eliminar usuario
export async function eliminarUsuario(id) {
    try {
        const res = await fetch(`${API_USUARIOS}/${id}`, {
            method: "DELETE"
        });

        return await res.json();
    } catch (error) {
        console.error("Error eliminando usuario:", error);
    }
}

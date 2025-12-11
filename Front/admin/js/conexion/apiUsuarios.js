const API_USUARIOS = "http://localhost:3000/api/usuarios";

function getHeaders() {
    const token = localStorage.getItem("token");

    return {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
    };
}

// Obtener usuarios
export async function obtenerUsuarios() {
    try {
        const res = await fetch(API_USUARIOS, {
            headers: getHeaders()
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.mensaje || "Error al obtener usuarios");
        }

        return data.data;
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
            headers: getHeaders(),
            body: JSON.stringify(data)
        });

        return await res.json();
    } catch (error) {
        console.error("Error creando usuario:", error);
    }
}

// Editar usuario
export async function editarUsuario(id, data) {
    try {
        const res = await fetch(`${API_USUARIOS}/${id}`, {
            method: "PUT",
            headers: getHeaders(),
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
            method: "DELETE",
            headers: getHeaders()
        });

        return await res.json();
    } catch (error) {
        console.error("Error eliminando usuario:", error);
    }
}

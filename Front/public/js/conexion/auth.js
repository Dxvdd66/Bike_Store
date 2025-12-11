// ================================
// CONEXIÓN AL BACKEND - AUTH
// ================================
const API_AUTH = "http://localhost:3000/api/auth";

export async function registrarUsuarioAPI(data) {
    const res = await fetch(`${API_AUTH}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });

    const json = await res.json();

    if (!res.ok) throw new Error(json.mensaje || "Error en el registro");

    return json;
}


export async function loginUsuarioAPI(correo, contrasena) {
    try {
        const res = await fetch(`${API_AUTH}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ correo, contrasena })
        });

        const json = await res.json();

        if (!res.ok) throw new Error(json.message || "Credenciales incorrectas");

        return json;
    } catch (err) {
        console.error("⚠ Error loginUsuarioAPI:", err.message);
        throw err;
    }
}

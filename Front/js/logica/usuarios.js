import { obtenerUsuarios } from "../conexion/apiUsuarios.js";

const tablaBody = document.getElementById("tabla-usuarios");

async function cargarUsuarios() {
    const usuarios = await obtenerUsuarios();

    if (usuarios.length === 0) {
        tablaBody.innerHTML = `
            <tr>
                <td colspan="7" style="text-align:center;">
                    No hay usuarios registrados.
                </td>
            </tr>
        `;
        return;
    }

    usuarios.forEach(usuario => {
        const fila = document.createElement("tr");

        fila.innerHTML = `
            <td>${usuario.id_usuario}</td>
            <td>${usuario.nombre}</td>
            <td>${usuario.telefono}</td>
            <td>${usuario.direccion}</td>
            <td>${usuario.correo}</td>
            <td>${usuario.ciudad || "—"}</td>
            <td>${usuario.rol}</td>
        `;

        tablaBody.appendChild(fila);
    });
}

cargarUsuarios();

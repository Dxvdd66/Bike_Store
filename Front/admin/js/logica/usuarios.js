import { 
    obtenerUsuarios, 
    crearUsuario, 
    editarUsuario, 
    eliminarUsuario 
} from "../conexion/apiUsuarios.js";

const tablaBody = document.getElementById("tabla-usuarios");

const modalCrear = document.getElementById("modal-crear");
const modalEditar = document.getElementById("modal-editar");

const formCrear = document.getElementById("form-crear-usuario");
const formEditar = document.getElementById("form-editar-usuario");

// Abrir / cerrar modales
window.abrirModalCrear = () => modalCrear.style.display = "flex";
window.cerrarModalCrear = () => modalCrear.style.display = "none";

window.abrirModalEditar = (usuario) => {
    modalEditar.style.display = "flex";

    formEditar.id_usuario.value = usuario.id_usuario;
    formEditar.nombre.value = usuario.nombre;
    formEditar.telefono.value = usuario.telefono;
    formEditar.direccion.value = usuario.direccion;
    formEditar.correo.value = usuario.correo;
    formEditar.ciudad.value = usuario.ciudad;
    formEditar.rol.value = usuario.rol;
};

window.cerrarModalEditar = () => modalEditar.style.display = "none";

// Cargar usuarios
async function cargarUsuarios() {
    tablaBody.innerHTML = "";
    const usuarios = await obtenerUsuarios();

    usuarios.forEach(usuario => {
        const fila = document.createElement("tr");

        fila.innerHTML = `
            <td>${usuario.id_usuario}</td>
            <td>${usuario.nombre}</td>
            <td>${usuario.telefono}</td>
            <td>${usuario.direccion}</td>
            <td>${usuario.correo}</td>
            <td>${usuario.ciudad}</td>
            <td>${usuario.rol}</td>
            <td>
                <button class="btn azul" onclick='abrirModalEditar(${JSON.stringify(usuario)})'>Editar</button>
                <button class="btn rojo" onclick="confirmarEliminar(${usuario.id_usuario})">Eliminar</button>
            </td>
        `;

        tablaBody.appendChild(fila);
    });
}

cargarUsuarios();

// Crear usuario
formCrear.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(formCrear));

    await crearUsuario(data);

    cerrarModalCrear();
    formCrear.reset();
    cargarUsuarios();
});

// Editar usuario
formEditar.addEventListener("submit", async (e) => {
    e.preventDefault();

    const id = formEditar.id_usuario.value;
    const data = Object.fromEntries(new FormData(formEditar));

    if (!data.contrasena || data.contrasena.trim() === "") {
        delete data.contrasena; // evita enviar campo vacío
    }

    await editarUsuario(id, data);

    cerrarModalEditar();
    cargarUsuarios();
});


// Eliminar
window.confirmarEliminar = async (id) => {
    if (confirm("¿Seguro que deseas eliminar este usuario?")) {
        await eliminarUsuario(id);
        cargarUsuarios();
    }
};

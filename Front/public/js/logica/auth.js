import { registrarUsuarioAPI, loginUsuarioAPI } from "../conexion/auth.js";
import { actualizarNavbar } from "./sesionUI.js";


// =======================
// LOGIN
// =======================
document.getElementById("formLogin")?.addEventListener("submit", async e => {
    e.preventDefault();

    const email = loginEmail.value.trim();
    const pass = loginPassword.value.trim();

    if (!email || !pass) {
        alert("Complete todos los campos.");
        return;
    }

    try {
        const res = await loginUsuarioAPI(email, pass);

        // Guardar token y usuario
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("usuario", JSON.stringify(res.data.usuario));

        // Cerrar modal
        cerrarModal("modalLogin");

        // Actualizar navbar
        actualizarNavbar();

        // 🔥 Redirección según rol
        const usuario = res.data.usuario;

        if (usuario.rol === "Administrador") {
            window.location.href = "/Front/admin/productos.html";

        } else {
            window.location.href = "/Front/public/productos.html";

        }

    } catch (err) {
        alert("Error: " + err.message);
    }
});


// =======================
// REGISTRO
// =======================
document.getElementById("formRegistro")?.addEventListener("submit", async e => {
    e.preventDefault();

    const data = {
        nombre: regNombre.value.trim(),
        telefono: regTelefono.value.trim(),
        direccion: regDireccion.value.trim(),
        ciudad: regCiudad.value.trim(),
        correo: regCorreo.value.trim(),
        contrasena: regContrasena.value.trim()
    };

    try {
        await registrarUsuarioAPI(data);
        alert("Usuario registrado correctamente");
        cerrarModal("modalRegistro");

    } catch (err) {
        alert("Error: " + err.message);
    }
});

document.addEventListener("DOMContentLoaded", () => {
    actualizarNavbar();
});

export function actualizarNavbar() {

    const user = JSON.parse(localStorage.getItem("usuario") || "null");

    const btnLogin = document.getElementById("btnLogin");
    const usuarioNombre = document.getElementById("usuarioNombre");
    const btnLogout = document.getElementById("btnLogout");

    if (!btnLogin || !usuarioNombre || !btnLogout) return;

    if (user) {
        btnLogin.style.display = "none";
        usuarioNombre.style.display = "inline-block";
        usuarioNombre.textContent = `👤 ${user.nombre}`;
        btnLogout.style.display = "inline-block";
    } else {
        btnLogin.style.display = "inline-block";
        usuarioNombre.style.display = "none";
        btnLogout.style.display = "none";
    }
}

document.getElementById("btnLogout")?.addEventListener("click", () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");

    actualizarNavbar();  // ✅ actualiza sin recargar

    alert("Sesión cerrada correctamente.");
});

document.getElementById("btnLogout")?.addEventListener("click", () => {

    // Borrar datos de sesión
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");

    // Redirigir al usuario a página pública
    window.location.href = "/Front/public/productos.html";
});

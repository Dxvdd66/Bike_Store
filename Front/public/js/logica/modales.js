window.abrirModal = function(id) {
    const m = document.getElementById(id);
    if (!m) return;

    m.style.display = "flex";

    // si es carrito → actualizar
    if (id === "modalCarrito") {
        import("./carrito.js").then(m => {
            m.renderCart();
        });
    }
}

window.cerrarModal = function(id) {
    const m = document.getElementById(id);
    if (m) m.style.display = "none";
}

// cerrar con X
document.querySelectorAll(".modal-cerrar").forEach(btn => {
    btn.addEventListener("click", () => {
        window.cerrarModal(btn.dataset.close);
    });
});

// cerrar tocando afuera
document.querySelectorAll(".modal").forEach(modal => {
    modal.addEventListener("click", e => {
        if (e.target === modal) modal.style.display = "none";
    });
});

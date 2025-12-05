// public/js/auth.js
const API_USUARIOS = "http://localhost:3000/api/usuarios";
const API_LOGIN = "http://localhost:3000/api/auth/login"; // ajusta si tu ruta es /api/login

// elementos
const modal = document.getElementById("modal-auth");
const btnOpen = document.getElementById("btn-open-auth");
const btnClose = document.getElementById("close-modal");

const tabLogin = document.getElementById("tab-login");
const tabRegister = document.getElementById("tab-register");
const formLogin = document.getElementById("form-login");
const formRegister = document.getElementById("form-register");

// abrir / cerrar modal
btnOpen.addEventListener("click", () => {
  modal.classList.remove("hidden");
  showLogin();
});
btnClose.addEventListener("click", () => modal.classList.add("hidden"));
modal.addEventListener("click", (e) => {
  if (e.target === modal) modal.classList.add("hidden");
});

// tabs
tabLogin.addEventListener("click", showLogin);
tabRegister.addEventListener("click", showRegister);

function showLogin() {
  tabLogin.classList.add("active");
  tabRegister.classList.remove("active");
  formLogin.classList.add("active");
  formRegister.classList.remove("active");
}

function showRegister() {
  tabRegister.classList.add("active");
  tabLogin.classList.remove("active");
  formRegister.classList.add("active");
  formLogin.classList.remove("active");
}

// -------- REGISTRO ----------
formRegister.addEventListener("submit", async (e) => {
  e.preventDefault();

  const payload = {
    nombre: document.getElementById("reg-nombre").value.trim(),
    telefono: document.getElementById("reg-telefono").value.trim(),
    direccion: document.getElementById("reg-direccion").value.trim(),
    correo: document.getElementById("reg-correo").value.trim(),
    ciudad: document.getElementById("reg-ciudad").value.trim(),
    rol: document.getElementById("reg-rol").value || "cliente",
    contrasena: document.getElementById("reg-contrasena").value
  };

  // validaciones básicas
  if (!payload.nombre || !payload.correo || !payload.contrasena) {
    return alert("Completa los campos obligatorios");
  }

  try {
    const res = await fetch(API_USUARIOS, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("Error registro:", data);
      return alert(data.mensaje || data.msg || "Error al registrar usuario");
    }

    alert("Registro exitoso. Ya puedes iniciar sesión.");
    formRegister.reset();
    showLogin();

  } catch (err) {
    console.error("Error fetch registro:", err);
    alert("No se pudo conectar con el servidor");
  }
});

// -------- LOGIN ----------
formLogin.addEventListener("submit", async (e) => {
  e.preventDefault();

  const payload = {
    correo: document.getElementById("login-correo").value.trim(),
    contrasena: document.getElementById("login-contrasena").value
  };

  try {
    const res = await fetch(API_LOGIN, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const data = await res.json();

    if (!res.ok) {
      return alert(data.mensaje || "Credenciales incorrectas");
    }

    // CORREGIDO:
    const usuario = data.data;

    localStorage.setItem("usuario", JSON.stringify(usuario));

    // redirección por rol (corrige la ruta según tu estructura)
    if (usuario.rol === "administrador") {
      window.location.href = "../admin/usuarios.html";
    } else {
      window.location.href = "../../productos.html";
    }

  } catch (err) {
    alert("No se pudo conectar con el servidor");
  }
});

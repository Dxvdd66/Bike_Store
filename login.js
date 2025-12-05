// login.js

const form = document.getElementById("form-login");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const correo = document.getElementById("correo").value;
    const contrasena = document.getElementById("contraseña").value;

    if (!correo || !contrasena) {
        alert("Por favor ingresa correo y contraseña");
        return;
    }

    try {
        const response = await fetch("http://localhost:3000/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ correo, contrasena })
        });

        const data = await response.json();

        if (!response.ok) {
            alert(data.msg || "Error al iniciar sesión");
            return;
        }

        // Guardar el usuario en localStorage
        localStorage.setItem("usuario", JSON.stringify(data.data));

        // Redirigir según rol
        if (data.data.rol === "administrador") {
            window.location.href = "./admin/usuarios.html";
        } else {
            window.location.href = "./public/productos.html";
        }

    } catch (error) {
        console.error("Error al iniciar sesión:", error);
        alert("No se pudo conectar con el servidor");
    }
});

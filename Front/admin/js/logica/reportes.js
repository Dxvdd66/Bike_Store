const user = JSON.parse(localStorage.getItem("usuario"));
const token = localStorage.getItem("token");

if (!token || !user || user.rol !== "Administrador") {
    window.location.href = "/Front/public/productos.html";
}

import { obtenerProductosMasVendidos } from "../conexion/apiReportes.js";

const tablaHead = document.getElementById("tabla-head");
const tablaBody = document.getElementById("tabla-body");

async function cargarReporte() {
    const datos = await obtenerProductosMasVendidos();

    if (!datos.length) {
        tablaHead.innerHTML = "<tr><th>No hay datos</th></tr>";
        tablaBody.innerHTML = "";
        return;
    }

    // Crear encabezado dinámico
    tablaHead.innerHTML = `
        <tr>
            ${Object.keys(datos[0]).map(col => `<th>${col}</th>`).join("")}
        </tr>
    `;

    // Crear filas
    tablaBody.innerHTML = datos.map(row => `
        <tr>
            ${Object.values(row).map(v => `<td>${v}</td>`).join("")}
        </tr>
    `).join("");
}

cargarReporte();

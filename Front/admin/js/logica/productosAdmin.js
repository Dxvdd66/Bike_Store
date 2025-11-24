import { obtenerProductos } from "../conexion/produtosAdmin.js";

const tablaBody = document.getElementById("tabla-productos");

async function cargarProductos() {
    const productos = await obtenerProductos();

    if (productos.length === 0) {
        tablaBody.innerHTML = `
            <tr>
                <td colspan="9" style="text-align:center;">
                    No hay productos registrados.
                </td>
            </tr>
        `;
        return;
    }

    productos.forEach(producto => {
        const fila = document.createElement("tr");

        fila.innerHTML = `
            <td>${producto.id_producto}</td>
            <td>${producto.descripcion}</td>
            <td>$${producto.precio}</td>
            <td>${producto.color}</td>
            <td>${producto.marca}</td>
            <td>${producto.stock}</td>
            <td>${producto.id_proveedor}</td>
            <td>${producto.id_categoria}</td>
        `;

        tablaBody.appendChild(fila);
    });
}

cargarProductos();

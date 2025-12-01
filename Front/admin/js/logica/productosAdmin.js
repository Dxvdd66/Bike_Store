import { 
    obtenerProductos,
    eliminarProducto,
    actualizarProducto,
    crearProducto,
    obtenerCategorias,
    obtenerProveedores
} from "../conexion/produtosAdmin.js";

const tablaBody = document.getElementById("tabla-productos");
const modalCrear = document.getElementById("modal-crear");
const formCrear = document.getElementById("form-crear");
const btnAgregar = document.getElementById("btn-agregar");

function convertirBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}


// Cargar tabla
async function cargarProductos() {
    tablaBody.innerHTML = ""; // limpiar antes

    const productos = await obtenerProductos();

    if (productos.length === 0) {
        tablaBody.innerHTML = `
            <tr>
                <td colspan="10" style="text-align:center;">
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
            <td>${producto.nombre_proveedor}</td>
            <td>${producto.nombre_categoria}</td>

            <td>
                <button class="btn-editar" data-id="${producto.id_producto}">Editar</button>
            </td>

            <td>
                <button class="btn-eliminar" data-id="${producto.id_producto}">Eliminar</button>
            </td>
        `;

        tablaBody.appendChild(fila);
    });

    agregarEventos();
}

// Eventos de editar y eliminar
function agregarEventos() {
    document.querySelectorAll(".btn-eliminar").forEach(btn => {
        btn.addEventListener("click", async () => {
            const id = btn.dataset.id;

            if (!confirm("¿Eliminar este producto?")) return;

            await eliminarProducto(id);
            cargarProductos();
        });
    });

    document.querySelectorAll(".btn-editar").forEach(btn => {
        btn.addEventListener("click", () => abrirModalEditar(btn.dataset.id));
    });
}

cargarProductos();


// --- FORMULARIO MODAL DE EDICIÓN ---

const modal = document.getElementById("modal");
const form = document.getElementById("form-producto");

async function abrirModalEditar(id) {
    modal.style.display = "flex";

    await cargarCategoriasSelect()
    await cargarProveedoresSelect();

    // Cargar datos
    const productos = await obtenerProductos();
    const p = productos.find(x => x.id_producto == id);

    // Llenar formulario
    form.id_producto.value = p.id_producto;
    form.descripcion.value = p.descripcion;
    form.precio.value = p.precio;
    form.color.value = p.color;
    form.marca.value = p.marca;
    form.stock.value = p.stock;
    form.id_proveedor.value = p.id_proveedor;
    form.id_categoria.value = p.id_categoria;
}

// Guardar edición
form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const id = form.id_producto.value;

    const archivo = document.getElementById("imagen-editar").files[0];
    let imagenBase64 = null;

    if (archivo) {
        imagenBase64 = await convertirBase64(archivo);
    }

    const producto = {
        descripcion: form.descripcion.value,
        precio: form.precio.value,
        color: form.color.value,
        marca: form.marca.value,
        stock: form.stock.value,
        id_proveedor: form.id_proveedor.value,
        id_categoria: form.id_categoria.value,
        imagen: imagenBase64 // 👈 SOLO si selecciona una nueva imagen
    };

    await actualizarProducto(id, producto);

    modal.style.display = "none";
    cargarProductos();
});


btnAgregar.addEventListener("click", () => {
    modalCrear.style.display = "flex";
    formCrear.reset();
    cargarCategoriasSelect();
    cargarProveedoresSelect();
});

formCrear.addEventListener("submit", async (e) => {
    e.preventDefault();

    const archivo = document.getElementById("imagen-crear").files[0];
    let imagenBase64 = null;

    if (archivo) {
        imagenBase64 = await convertirBase64(archivo);
    }

    const nuevoProducto = {
        descripcion: formCrear.descripcion.value,
        precio: formCrear.precio.value,
        color: formCrear.color.value,
        marca: formCrear.marca.value,
        stock: formCrear.stock.value,
        id_proveedor: formCrear.id_proveedor.value,
        id_categoria: formCrear.id_categoria.value,
        imagen: imagenBase64  // 👈 SE ENVÍA AL BACKEND
    };

    await crearProducto(nuevoProducto);

    modalCrear.style.display = "none";
    cargarProductos();
});



// Cerrar modal CREAR
document.querySelector(".cerrar-crear")
    .addEventListener("click", () => {
        modalCrear.style.display = "none";
    });

// Cerrar modal EDITAR
document.querySelector(".cerrar-editar")
    .addEventListener("click", () => {
        modal.style.display = "none";
    });


async function cargarCategoriasSelect() {
    const categorias = await obtenerCategorias();

    const selectCrear = document.getElementById("categoria-crear");
    const selectEditar = document.getElementById("categoria-editar");

    selectCrear.innerHTML = `<option value="">Seleccione</option>`;
    selectEditar.innerHTML = `<option value="">Seleccione</option>`;

    categorias.forEach(cat => {
        const opt1 = document.createElement("option");
        opt1.value = cat.id_categoria;
        opt1.textContent = cat.nombre_categoria;
        selectCrear.appendChild(opt1);

        const opt2 = document.createElement("option");
        opt2.value = cat.id_categoria;
        opt2.textContent = cat.nombre_categoria;
        selectEditar.appendChild(opt2);
    });
}

async function cargarProveedoresSelect() {
    const proveedores = await obtenerProveedores();

    const selectCrear = document.getElementById("proveedor-crear");
    const selectEditar = document.getElementById("proveedor-editar");

    selectCrear.innerHTML = `<option value="">Seleccione</option>`;
    selectEditar.innerHTML = `<option value="">Seleccione</option>`;

    proveedores.forEach(p => {
        const opt1 = document.createElement("option");
        opt1.value = p.id_proveedor;
        opt1.textContent = p.nombre_proveedor;
        selectCrear.appendChild(opt1);

        const opt2 = document.createElement("option");
        opt2.value = p.id_proveedor;
        opt2.textContent = p.nombre_proveedor;
        selectEditar.appendChild(opt2);
    });
}

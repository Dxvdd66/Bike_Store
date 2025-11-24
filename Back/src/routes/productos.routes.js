const express = require("express");
const router = express.Router();
const errorControl = require("../middlewares/errorControl");

const validarProducto = require("../middlewares/validarproductos.js");

const {
    getProductos,
    getProductoById,
    crearProducto,
    actualizarProducto,
    eliminarProducto,
    getCategorias,
    getProveedores
} = require("../controllers/productos.controller.js");

router.get("/", errorControl(getProductos));
router.get("/categorias", errorControl(getCategorias));
router.get("/proveedores", errorControl(getProveedores));
router.get("/:id", errorControl(getProductoById));
router.post("/", validarProducto, errorControl(crearProducto));
router.put("/:id", validarProducto, errorControl(actualizarProducto));
router.delete("/:id", errorControl(eliminarProducto));


module.exports = router;


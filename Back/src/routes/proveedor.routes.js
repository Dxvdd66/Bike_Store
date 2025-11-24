const express = require('express');
const router = express.Router();
const errorControl = require("../middlewares/errorControl");

const {
    getProveedores,
    getProveedorById,
    crearProveedor,
    actualizarProveedor,
    eliminarProveedor
} = require("../controllers/proveedor.controller");

router.get("/", errorControl(getProveedores));
router.get("/:id", errorControl(getProveedorById));
router.post("/", errorControl(crearProveedor));
router.put("/:id", errorControl(actualizarProveedor));
router.delete("/:id", errorControl(eliminarProveedor));

module.exports = router;

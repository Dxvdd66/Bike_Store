const express = require('express');
const router = express.Router();
const errorControl = require("../middlewares/errorControl");

const {
    getDetalles,
    getDetalleById,
    crearDetalle,
    actualizarDetalle,
    eliminarDetalle
} = require("../controllers/detalle.controller");

router.get("/", errorControl(getDetalles));
router.get("/:id", errorControl(getDetalleById));
router.post("/", errorControl(crearDetalle));
router.put("/:id", errorControl(actualizarDetalle));
router.delete("/:id", errorControl(eliminarDetalle));

module.exports = router;


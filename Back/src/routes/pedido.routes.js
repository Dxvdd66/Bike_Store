const express = require('express');
const router = express.Router();
const errorControl = require("../middlewares/errorControl");

const {
    getPedidos,
    getPedidoById,
    crearPedido,
    actualizarPedido,
    eliminarPedido
} = require("../controllers/pedido.controller");

router.get("/", errorControl(getPedidos));
router.get("/:id", errorControl(getPedidoById));
router.post("/", errorControl(crearPedido));
router.put("/:id", errorControl(actualizarPedido));
router.delete("/:id", errorControl(eliminarPedido));

module.exports = router;


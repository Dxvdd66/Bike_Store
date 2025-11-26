const express = require("express");
const router = express.Router();

const { getProductosMasVendidos } = require("../controllers/reportes.controller");

// Ruta
router.get("/", getProductosMasVendidos);

module.exports = router;

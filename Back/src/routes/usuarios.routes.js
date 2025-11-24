const express = require("express");
const router = express.Router();
const errorControl = require("../middlewares/errorControl");

const {
    getUsuarios,
    getUsuario,
    createUsuario,
    updateUsuario,
    deleteUsuario
} = require("../controllers/usuarios.controller");

router.get("/", errorControl(getUsuarios));
router.get("/:id", errorControl(getUsuario));
router.post("/", errorControl(createUsuario));
router.put("/:id", errorControl(updateUsuario));
router.delete("/:id", errorControl(deleteUsuario));

module.exports = router;

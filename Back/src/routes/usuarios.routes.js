const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth");
const authAdmin = require("../middlewares/authAdmin");
const errorControl = require("../middlewares/errorControl");

const {
    getUsuarios,
    getUsuario,
    createUsuario,
    updateUsuario,
    deleteUsuario
} = require("../controllers/usuarios.controller");

// ADMIN
router.get("/", auth, authAdmin, errorControl(getUsuarios));
router.get("/:id", auth, authAdmin, errorControl(getUsuario));
router.post("/", auth, authAdmin, errorControl(createUsuario));
router.put("/:id", auth, authAdmin, errorControl(updateUsuario));
router.delete("/:id", auth, authAdmin, errorControl(deleteUsuario));

module.exports = router;

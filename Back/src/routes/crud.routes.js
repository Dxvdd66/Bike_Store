const express = require('express');
const router = express.Router();

// Importar todas las rutas según tu carpeta
const categoriaRoutes = require('./categoria.routes');
const detallePedidoRoutes = require('./detalle_pedido.routes');
const pedidoRoutes = require('./pedido.routes');
const productosRoutes = require('./productos.routes');
const proveedorRoutes = require('./proveedor.routes');
const usuariosRoutes = require('./usuarios.routes');

// Asignarlas con prefijos
router.use('/categorias', categoriaRoutes);
router.use('/detalle-pedido', detallePedidoRoutes);
router.use('/pedidos', pedidoRoutes);
router.use('/productos', productosRoutes);
router.use('/proveedores', proveedorRoutes);
router.use('/usuarios', usuariosRoutes);

module.exports = router;

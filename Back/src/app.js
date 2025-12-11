const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

// =======================
// MIDDLEWARES
// =======================
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// =======================
// RUTAS DE API
// =======================
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/categoria', require('./routes/categoria.routes'));
app.use('/api/detalle_pedido', require('./routes/detalle_pedido.routes'));
app.use('/api/proveedor', require('./routes/proveedor.routes'));
app.use('/api/usuarios', require('./routes/usuarios.routes'));
app.use('/api/productos', require('./routes/productos.routes.js'));
app.use('/api/pagos', require('./routes/pago.routes.js'));
app.use('/api/pedido', require('./routes/pedido.routes'));
app.use('/api/reportes/productos-mas-vendidos', require('./routes/reportes.routes'));

// =======================
// SERVIR ARCHIVOS ESTÁTICOS
// =======================
app.use(express.static(path.join(__dirname, '../Front/public')));

// =======================
// SPA / REDIRECCIÓN POR DEFECTO
// =======================
app.get(/^(?!\/api).*/, (req, res) => {
    res.sendFile(path.join(__dirname, '../Front/public/index.html'));
});


// =======================
// MIDDLEWARE GLOBAL DE ERRORES
// =======================
app.use((err, req, res, next) => {
    console.error("❌ Error:", err);
    res.status(500).json({ error: err.message });
});

module.exports = app;

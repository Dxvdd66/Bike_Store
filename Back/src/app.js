const express = require('express');
const cors = require('cors');
const router = express.Router();

// Importar rutas normales
const crudRoutes = require('./routes/crud.routes.js');

const app = express();

// Middlewares globales
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Montar rutas normales
app.use('/api', crudRoutes);

// Middleware global de errores
app.use((err, req, res, next) => {
    console.error("❌ Error:", err);
    res.status(500).json({ error: err.message });
});


app.use('/api/categoria', require('./routes/categoria.routes.js'));
app.use('/api/detalle_pedido', require('./routes/detalle_pedido.routes.js'));
app.use('/api/proveedor', require('./routes/proveedor.routes.js'));
app.use('/api/usuarios', require('./routes/usuarios.routes.js'));
app.use('/api/productos', require('./routes/productos.routes.js'));
app.use('/api/pedido', require('./routes/pedido.routes.js'));
app.use('/api/reportes/productos-mas-vendidos', require('./routes/reportes.routes.js'));






module.exports = app;

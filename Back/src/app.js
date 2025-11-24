const express = require('express');
const cors = require('cors');

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

module.exports = app;


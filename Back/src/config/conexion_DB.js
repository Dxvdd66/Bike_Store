// config/conexion_DB.js
const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'bikestore'
}).promise(); // <-- ESTA ES LA CLAVE


db.connect(err => {
    if (err) throw err;
    console.log("DB conectada");
});

module.exports = db;

module.exports = db;


// config/conexion_DB.js
const mysql = require('mysql2/promise');

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'bikestore',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = db;

const Usuarios = connection.define("usuarios", {
    id_usuario: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre: DataTypes.STRING,
    telefono: DataTypes.INTEGER,
    direccion: DataTypes.STRING,
    correo: DataTypes.STRING,
    fecha_registro: DataTypes.DATE,
    ciudad: DataTypes.STRING,
    rol: DataTypes.ENUM("administrador", "cliente"),
    contraseña: DataTypes.STRING  
});

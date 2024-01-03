// Importar Sequelize y la instancia de la base de datos desde el archivo de conexión
import Sequelize from "sequelize";
import { db } from "../database/conexion.js";

// Definir el modelo 'usuarios'
const usuarios = db.define("usuarios", {
    // Columna 'id'
    id_user: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    // Columna 'usuario'
    username: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    // Columna 'contraseña'
    password: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    
});

// Exportar el modelo 'adopcionesMascotas'
export { usuarios };

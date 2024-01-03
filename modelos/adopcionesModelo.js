// Importar Sequelize y la instancia de la base de datos desde el archivo de conexión
import Sequelize from "sequelize";
import { db } from "../database/conexion.js";

// Definir el modelo 'adopcionesMascotas'
const adopcionesMascotas = db.define("datos_adopciones", {
    // Columna 'id'
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    // Columna 'nombre'
    nombre: {
        type: Sequelize.STRING,
        allowNull: true
    },
    // Columna 'telefono'
    telefono: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    // Columna 'id_mascota'
    id_mascota: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
});

// Exportar el modelo 'adopcionesMascotas'
export { adopcionesMascotas };

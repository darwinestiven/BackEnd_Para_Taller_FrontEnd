// Importar express para crear el enrutador
import express from "express";
// Se importan las funciones controladoras desde el archivo mascotasController.js.
import { crear, buscarId, buscar, actualizar, eliminar, crearAdopcion, autenticarUsuario } from "../controladores/mascotasController.js";

 
// Crear un enrutador de express
const routerMascotas = express.Router();

// Ruta de bienvenida para la API de mascotas
routerMascotas.get("/", (req, res) => {
    res.send("Bienvenido a Mascotas");
});

// Ruta para crear una nueva mascota
routerMascotas.post("/crear", (req, res) => {
    crear(req, res);
});

// Ruta para crear una nueva adopción de mascota
routerMascotas.post("/adopcion/crear", (req, res) => {
    crearAdopcion(req, res);
});

// Ruta para buscar una mascota por ID
routerMascotas.get("/buscar/:id", (req, res) => {
    buscarId(req, res);
});

// Ruta para buscar todas las mascotas
routerMascotas.get("/buscar", (req, res) => {
    buscar(req, res);
});

// Ruta para actualizar una mascota por ID
routerMascotas.put("/actualizar/:id", (req, res) => {
    actualizar(req, res);
});

// Ruta para eliminar una mascota por ID
routerMascotas.delete("/eliminar/:id", (req, res) => {
    eliminar(req, res);
});

//Ruta login
routerMascotas.post("/login", async (req, res) => {
    try {
        // Intenta autenticar al usuario al llamar a la función 'autenticarUsuario'
        await autenticarUsuario(req, res);
    } catch (error) {
        // Manejar errores: Si hay algún error, imprímelo en la consola y devuelve una respuesta de error interno del servidor
        console.error("Error en el servidor:", error);
        res.status(500).json({ success: false, message: "Error interno del servidor" });
    }
});


// Exportar el enrutador para su uso en otros archivos
export { routerMascotas };


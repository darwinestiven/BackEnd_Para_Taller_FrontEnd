// Importar los módulos y dependencias necesarios
import { mascotas } from "../modelos/mascotasModelo.js";
import { adopcionesMascotas } from "../modelos/adopcionesModelo.js";

// Crear un nuevo recurso
const crear = (req, res) => {
    // Validar si el campo 'nombre' está proporcionado
    if (!req.body.nombre) {
        res.status(400).json({
            mensaje: "El nombre no puede estar vacío."
        });
        return;
    }

    // Preparar el conjunto de datos con la información del cuerpo de la solicitud
    const dataset = {
        nombre: req.body.nombre,
        edad: req.body.edad,
        imagen: req.body.imagen,
        raza: req.body.raza,
        descripcion1: req.body.descripcion1,
        descripcion2: req.body.descripcion2
    };

    // Utilizar Sequelize para crear el recurso en la tabla 'mascotas'
    mascotas.create(dataset)
        .then((resultado) => {
            res.status(200).json({
                tipo: "success",
                mensaje: "Registro creado correctamente"
            });
        })
        .catch((err) => {
            res.status(500).json({
                tipo: "error",
                mensaje: `Error al crear el registro ::: ${err}`
            });
        });
};

// Crear adopción
const crearAdopcion = (req, res) => {
    // Validar si los campos 'nombre' y 'telefono' están proporcionados
    if (!req.body.nombre || !req.body.telefono) {
        res.status(400).json({
            mensaje: "El nombre o el teléfono no pueden estar vacíos."
        });
        return;
    }

    // Preparar el conjunto de datos con la información del cuerpo de la solicitud
    const dataset = {
        id_mascota: req.body.id_mascota,
        nombre: req.body.nombre,
        telefono: req.body.telefono,
    };

    // Utilizar Sequelize para crear el recurso en la tabla 'adopcionesMascotas'
    adopcionesMascotas.create(dataset)
        .then((resultado) => {
            res.status(200).json({
                tipo: "success",
                mensaje: "Registro creado correctamente"
            });
        })
        .catch((err) => {
            res.status(500).json({
                tipo: "error",
                mensaje: `Error al crear el registro ::: ${err}`
            });
        });
};

// Buscar un recurso por ID
const buscarId = (req, res) => {
    const id = req.params.id;

    // Validar si se proporciona el 'id'
    if (id == null) {
        res.status(203).json({
            mensaje: `El id no puede estar vacío`
        });
        return;
    }

    // Utilizar Sequelize para buscar el recurso en la tabla 'mascotas' por clave primaria
    mascotas.findByPk(id)
        .then((resultado) => {
            res.status(200).json(resultado);
        })
        .catch((err) => {
            res.status(500).json({
                mensaje: `Registro no encontrado ::: ${err}`
            });
        });
};

// Buscar todos los recursos
const buscar = (req, res) => {
    // Utilizar Sequelize para buscar todos los recursos en la tabla 'mascotas'
    mascotas.findAll()
        .then((resultado) => {
            res.status(200).json(resultado);
        })
        .catch((err) => {
            res.status(500).json({
                mensaje: `No se encontraron registros ::: ${err}`
            });
        });
};

// Actualizar un recurso
const actualizar = (req, res) => {
    const id = req.params.id;

    // Validar si se proporciona el 'id'
    if (id == null) {
        return res.status(203).json({
            mensaje: `El id no puede estar vacío`
        });
    }

    // Utilizar Sequelize para verificar si el registro existe antes de intentar actualizar
    mascotas.findByPk(id)
        .then((registroExistente) => {
            // Verificar si el registro existe
            if (!registroExistente) {
                return res.status(404).json({
                    mensaje: "Registro no encontrado"
                });
            }

            // Proceder con la actualización
            if (!req.body.nombre && !req.body.edad) {
                return res.status(400).json({
                    mensaje: "No se encontraron datos para actualizar"
                });
            }

            // Extraer datos del cuerpo de la solicitud o utilizar valores existentes
            const nombre = req.body.nombre || registroExistente.nombre;
            const edad = req.body.edad || registroExistente.edad;
            const raza = req.body.raza || registroExistente.raza;
            const imagen = req.body.imagen || registroExistente.imagen;
            const descripcion1 = req.body.descripcion1 || registroExistente.descripcion1;
            const descripcion2 = req.body.descripcion2 || registroExistente.descripcion2;

            // Utilizar Sequelize para actualizar el registro en la tabla 'mascotas'
            mascotas.update({ nombre, edad, raza, imagen, descripcion1, descripcion2 }, { where: { id } })
                .then(() => {
                    res.status(200).json({
                        tipo: "success",
                        mensaje: "Registro actualizado correctamente"
                    });
                })
                .catch((err) => {
                    res.status(500).json({
                        tipo: "error",
                        mensaje: `Error al actualizar el registro ::: ${err}`
                    });
                });
        })
        .catch((err) => {
            res.status(500).json({
                mensaje: `Error al verificar la existencia del registro ::: ${err}`
            });
        });
};

// Eliminar un recurso
const eliminar = (req, res) => {
    const id = req.params.id;

    // Validar si se proporciona el 'id'
    if (id == null) {
        res.status(203).json({
            mensaje: `El id no puede estar vacío`
        });
        return;
    }

    // Utilizar Sequelize para eliminar el registro de la tabla 'mascotas'
    mascotas.destroy({ where: { id } })
        .then((resultado) => {
            res.status(200).json({
                tipo: "success",
                mensaje: `Registro eliminado`
            });
        })
        .catch((err) => {
            res.status(500).json({
                tipo: "error",
                mensaje: `Error al eliminar el registro ::: ${err}`
            });
        });
};

// Exportar las funciones del controlador
export { crear, buscarId, buscar, actualizar, eliminar, crearAdopcion };

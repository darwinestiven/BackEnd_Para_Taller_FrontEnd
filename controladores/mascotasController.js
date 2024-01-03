// Importar los módulos y dependencias necesarios
import { Op } from "sequelize";//consultas de Sequelize.
import { mascotas } from "../modelos/mascotasModelo.js";
import { adopcionesMascotas } from "../modelos/adopcionesModelo.js";
import { usuarios } from "../modelos/usuariosModelo.js";



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
    const terminoBusqueda = req.query.termino;
    console.log(terminoBusqueda)

    // Verificar si se proporciona un término de búsqueda
    if (!terminoBusqueda) {
        // Si no se proporciona, realizar la búsqueda normal de todos los recursos
        mascotas.findAll()
            .then((resultado) => {
                res.status(200).json(resultado);
            })
            .catch((err) => {
                res.status(500).json({
                    mensaje: `No se encontraron registros ::: ${err}`
                });
            });
    } else {
        // Si se proporciona un término de búsqueda, realizar la búsqueda filtrada
        mascotas.findAll({
            where: {
                // Puedes ajustar estas condiciones según tus necesidades
                [Op.or]: [
                    { nombre: { [Op.like]: `%${terminoBusqueda}%` } },
                    { raza: { [Op.like]: `%${terminoBusqueda}%` } },
                ]
            }
        })
            .then((resultado) => {
                res.status(200).json(resultado);
            })
            .catch((err) => {
                res.status(500).json({
                    mensaje: `No se encontraron registros con el término de búsqueda ::: ${err}`
                });
            });
    }
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


const autenticarUsuario = async (req, res) => {
    // Obtener el nombre de usuario y contraseña del cuerpo de la solicitud
    const { username, password } = req.body;
    console.log(username);
    console.log(password);

    try {
        // Buscar un usuario en la base de datos que coincida con el nombre de usuario y la contraseña proporcionados
        const usuarioEncontrado = await usuarios.findOne({ where: { username, password } });
        console.log(usuarioEncontrado);

        if (usuarioEncontrado) {
            // Autenticación exitosa: El usuario existe en la base de datos con las credenciales proporcionadas
            res.status(200).json({ success: true });
        } else {
            // Credenciales incorrectas: El usuario no fue encontrado con las credenciales proporcionadas
            res.status(401).json({ success: false, mensaje: "Credenciales incorrectas" });
        }
    } catch (error) {
        // Manejar errores: En caso de error durante la búsqueda en la base de datos
        console.error("Error en autenticarUsuario:", error);
        res.status(500).json({ success: false, mensaje: "Error interno del servidor" });
    }
};



// Exportar las funciones del controlador
export { crear, buscarId, buscar, actualizar, eliminar, crearAdopcion, autenticarUsuario };

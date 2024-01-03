import Sequelize from "sequelize";

const db = new Sequelize("mascotas","mascotas","12345",{
    dialect: "mysql",
    host: "localhost"
});

export {db}
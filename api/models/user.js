const Sequelize = require("sequelize");
const connection = require("../connection");

const User = connection.define('users', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    phone: {
        type: Sequelize.STRING,
        allowNull: false
    },
    level: {
        type: Sequelize.INTEGER,
        allowNull: false,
        default: 0
    },
    status: {
        type: Sequelize.INTEGER,
        allowNull: false,
        default: 0
    }
});

(async () => {
    try {
        // const resultado = await connection.sync({force:true});
        const resultado = await connection.sync();
        console.log("Sincronizando banco: ", resultado);
    } catch (error) {
        console.log("Erro:", error.message);
    }
})()

module.exports = User;
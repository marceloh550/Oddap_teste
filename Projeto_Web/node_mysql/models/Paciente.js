const Sequelize = require('sequelize');
const db = require('./db');

const paciente = db.define('paciente', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    idade: {
        type: Sequelize.STRING,
        allowNull: false
    },
    cidade: {
        type: Sequelize.STRING,
        allowNull: false
    },
    estado: {
        type: Sequelize.TEXT,
        allowNull: false
    }
});

//Criar a tabela no BD
paciente.sync();

//Verificar se há alguma diferença na tabela, realiza a alteração
//paciente.sync({ alter: true });

module.exports = paciente;
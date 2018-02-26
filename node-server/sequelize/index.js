const Sequelize = require('sequelize');
const { database, username, password, options } = require('../config').sequelizeConfig;

const sequelize = new Sequelize(database, username, password, options)

module.exports = sequelize
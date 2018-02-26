const Sequelize = require('sequelize');
const sequelizeConfig = require('../config/index').sequelizeConfig;

// console.log(...sequelizeConfig, '...sequelizeConfig')
// const sequelize = new Sequelize(...sequelizeConfig)
const sequelize = new Sequelize(sequelizeConfig.database, sequelizeConfig.username, sequelizeConfig.password, sequelizeConfig.options)

module.exports = sequelize
const Sequelize = require('sequelize');
const sequelize = require('../sequelize')

const studentModel = sequelize.define('student', {
  name: {
    type: Sequelize.STRING
  },
  age: {
    type: Sequelize.STRING
  },
  createdAt: {
    type: Sequelize.BIGINT
  },
  updatedAt: {
    type: Sequelize.BIGINT
  }
})

module.exports = studentModel
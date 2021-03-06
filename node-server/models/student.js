const Sequelize = require('sequelize');
const db = require('../db');

const Student = db.defineModel('student', {
  name: {
    type: Sequelize.STRING(50)
  },
  sno: {
    type: Sequelize.STRING(50)
  },
  sex: {
    type: Sequelize.BIGINT(2)
  },
  age: {
    type: Sequelize.STRING(50)
  },
  class: {
    type: Sequelize.STRING(100)
  },
  academy: {
    type: Sequelize.STRING(100)
  },
  grade: {
    type: Sequelize.STRING(10)
  },
  level: {
    type: Sequelize.STRING(15)
  },
  major: {
    type: Sequelize.STRING(200)
  },
  address: {
    type: Sequelize.STRING(500)
  },
  tel: {
    type: Sequelize.STRING(20)
  },
  qq: {
    type: Sequelize.STRING(50)
  },
  password: {
    type: Sequelize.STRING(100)
  },
  nation: {
    type: Sequelize.STRING(50)
  },
  duration: {
    type: Sequelize.STRING(10)
  },
  gradeId: {
    type: Sequelize.INTEGER
  },
  academyId: {
    type: Sequelize.INTEGER
  },
  classId: {
    type: Sequelize.INTEGER
  }
}, {
  timestamps: false
})

module.exports = Student
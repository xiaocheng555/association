/*
 * File: student-position.js
 * File Created: 2018-03-19 12:42:33 pm
 * Author: zhanghuancheng555 (1052745517@qq.com)
 * Copyright: 2017 - 2018 Your Company, Your Company
 * -----
 * Last Modified: 2018-03-21 11:44:22 pm
 * Modified By: zhanghuancheng555 (1052745517@qq.com>)
 */

const Sequelize = require('sequelize');
const db = require('../db');

const StudentPosition = db.defineModel('student_position', {
  name: {
    type: Sequelize.STRING(100)
  },
  positionId: {
    type: Sequelize.INTEGER
  },
  associationId: {
    type: Sequelize.INTEGER
  },
  departmentId: {
    type: Sequelize.INTEGER
  },
  isTired: {
    type: Sequelize.TINYINT(4)
  }
})

module.exports = StudentPosition
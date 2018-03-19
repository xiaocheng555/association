/*
 * File: student-association.js
 * File Created: 2018-03-19 12:42:33 pm
 * Author: zhanghuancheng555 (1052745517@qq.com)
 * Copyright: 2017 - 2018 Your Company, Your Company
 * -----
 * Last Modified: 2018-03-19 11:06:09 pm
 * Modified By: zhanghuancheng555 (1052745517@qq.com>)
 */

const Sequelize = require('sequelize');
const db = require('../db');

const StudentAssociation = db.defineModel('student_association', {
  name: {
    type: Sequelize.STRING(100)
  },
  association_id: {
    type: Sequelize.INTEGER
  },
  student_id: {
    type: Sequelize.INTEGER
  },
  join_status: {
    type: Sequelize.BIGINT(2)
  }
})

module.exports = StudentAssociation
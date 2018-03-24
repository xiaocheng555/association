/*
 * File: student-association.js
 * File Created: 2018-03-19 12:42:33 pm
 * Author: zhanghuancheng555 (1052745517@qq.com)
 * Copyright: 2017 - 2018 Your Company, Your Company
 * -----
 * Last Modified: 2018-03-24 8:38:44 pm
 * Modified By: zhanghuancheng555 (1052745517@qq.com>)
 */

const Sequelize = require('sequelize');
const db = require('../db');

const StudentAssociation = db.defineModel('student_association', {
  name: {
    type: Sequelize.STRING(100)
  },
  associationId: {
    type: Sequelize.INTEGER
  },
  studentId: {
    type: Sequelize.INTEGER
  },
  // 加入社团的状态，0为等待审批，1为已经加入，2-任命部门职位，3为部门退任，-1为审批不通过
  joinStatus: {
    type: Sequelize.BIGINT(2)
  }
})

module.exports = StudentAssociation
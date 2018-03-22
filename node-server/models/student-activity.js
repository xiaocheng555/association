/*
 * File: student-activity.js
 * File Created: 2018-03-19 12:40:28 pm
 * Author: zhanghuancheng555 (1052745517@qq.com)
 * Copyright: 2017 - 2018 Your Company, Your Company
 * -----
 * Last Modified: 2018-03-21 11:43:57 pm
 * Modified By: zhanghuancheng555 (1052745517@qq.com>)
 */

const Sequelize = require('sequelize');
const db = require('../db');

const StudentActivity = db.defineModel('student_activity', {
  name: {
    type: Sequelize.STRING(100)
  },
  studentId: {
    type: Sequelize.INTEGER
  },
  activityId: {
    type: Sequelize.INTEGER
  }
})

module.exports = StudentActivity
/*
 * File: leave-message.js
 * File Created: 2018-03-19 12:40:30 pm
 * Author: zhanghuancheng555 (1052745517@qq.com)
 * Copyright: 2017 - 2018 Your Company, Your Company
 * -----
 * Last Modified: 2018-03-21 11:43:42 pm
 * Modified By: zhanghuancheng555 (1052745517@qq.com>)
 */

const Sequelize = require('sequelize');
const db = require('../db');

const LeaveMessage = db.defineModel('leave_message', {
  content: {
    type: Sequelize.TEXT('long')
  },
  studentId: {
    type: Sequelize.INTEGER
  },
  associationId: {
    type: Sequelize.INTEGER
  }
})

module.exports = LeaveMessage
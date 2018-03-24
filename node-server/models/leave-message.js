/*
 * File: leave-message.js
 * File Created: 2018-03-19 12:40:30 pm
 * Author: zhanghuancheng555 (1052745517@qq.com)
 * Copyright: 2017 - 2018 Your Company, Your Company
 * -----
 * Last Modified: 2018-03-24 4:48:20 pm
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
  adminId: {
    type: Sequelize.INTEGER
  },
  activityId: {
    type: Sequelize.INTEGER
  },
  replyId: {
    type: Sequelize.INTEGER
  }
})

module.exports = LeaveMessage
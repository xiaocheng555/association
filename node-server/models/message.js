/*
 * File: message.js
 * File Created: 2018-03-19 12:40:30 pm
 * Author: zhanghuancheng555 (1052745517@qq.com)
 * Copyright: 2017 - 2018 Your Company, Your Company
 * -----
 * Last Modified: 2018-03-19 11:03:51 pm
 * Modified By: zhanghuancheng555 (1052745517@qq.com>)
 */

const Sequelize = require('sequelize');
const db = require('../db');

const Message = db.defineModel('message', {
  name: {
    type: Sequelize.STRING(100)
  },
  type: {
    type: Sequelize.BIGINT(2)
  },
  message_id: {
    type: Sequelize.INTEGER
  }
})

module.exports = Message
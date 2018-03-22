/*
 * File: notice.js
 * File Created: 2018-03-19 12:40:30 pm
 * Author: zhanghuancheng555 (1052745517@qq.com)
 * Copyright: 2017 - 2018 Your Company, Your Company
 * -----
 * Last Modified: 2018-03-22 3:16:32 am
 * Modified By: zhanghuancheng555 (1052745517@qq.com>)
 */

const Sequelize = require('sequelize');
const db = require('../db');

const Notice = db.defineModel('notice', {
  name: {
    type: Sequelize.STRING(100)
  },
  content: {
    type: Sequelize.STRING
  },
  adminId: {
    type: Sequelize.INTEGER
  },
  associationId: {
    type: Sequelize.INTEGER
  }
})

module.exports = Notice
/*
 * File: department.js
 * File Created: 2018-03-19 12:40:29 pm
 * Author: zhanghuancheng555 (1052745517@qq.com)
 * Copyright: 2017 - 2018 Your Company, Your Company
 * -----
 * Last Modified: 2018-03-21 11:43:31 pm
 * Modified By: zhanghuancheng555 (1052745517@qq.com>)
 */

const Sequelize = require('sequelize');
const db = require('../db');

const Department = db.defineModel('department', {
  name: {
    type: Sequelize.STRING(100)
  },
  introduce: {
    type: Sequelize.TEXT('long')
  },
  associationId: {
    type: Sequelize.INTEGER
  }
})

module.exports = Department
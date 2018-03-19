/*
 * File: position.js
 * File Created: 2018-03-19 12:40:31 pm
 * Author: zhanghuancheng555 (1052745517@qq.com)
 * Copyright: 2017 - 2018 Your Company, Your Company
 * -----
 * Last Modified: 2018-03-19 11:04:52 pm
 * Modified By: zhanghuancheng555 (1052745517@qq.com>)
 */

const Sequelize = require('sequelize');
const db = require('../db');

const Position = db.defineModel('position', {
  name: {
    type: Sequelize.STRING(100)
  },
  seq: {
    type: Sequelize.BIGINT(2)
  }
})

module.exports = Position
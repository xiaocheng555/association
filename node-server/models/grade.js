/*
 * File: grade.js
 * File Created: 2018-03-19 12:40:29 pm
 * Author: zhanghuancheng555 (1052745517@qq.com)
 * Copyright: 2017 - 2018 Your Company, Your Company
 * -----
 * Last Modified: 2018-03-19 11:00:45 pm
 * Modified By: zhanghuancheng555 (1052745517@qq.com>)
 */

const Sequelize = require('sequelize');
const db = require('../db');

const Grade = db.defineModel('grade', {
  name: {
    type: Sequelize.STRING(10)
  }
}, {
    timestamps: false
})

module.exports = Grade
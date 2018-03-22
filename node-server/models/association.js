/*
 * File: association.js
 * File Created: 2018-03-19 12:40:30 pm
 * Author: zhanghuancheng555 (1052745517@qq.com)
 * Copyright: 2017 - 2018 Your Company, Your Company
 * -----
 * Last Modified: 2018-03-21 11:43:20 pm
 * Modified By: zhanghuancheng555 (1052745517@qq.com>)
 */

const Sequelize = require('sequelize');
const db = require('../db');

const Association = db.defineModel('association', {
  name: {
    type: Sequelize.STRING(100)
  },
  introduction: {
    type: Sequelize.TEXT('long')
  },
  isDelete: {
    type: Sequelize.TINYINT(2)
  }
})

module.exports = Association
/*
 * File: admin.js
 * File Created: 2018-03-18 7:55:00 pm
 * Author: zhanghuancheng555 (1052745517@qq.com)
 * Copyright: 2017 - 2018 Your Company, Your Company
 * -----
 * Last Modified: 2018-03-19 11:08:12 pm
 * Modified By: zhanghuancheng555 (1052745517@qq.com>)
 */

const Sequelize = require('sequelize');
const db = require('../db');

const Admin = db.defineModel('admin', {
  name: {
    type: Sequelize.STRING(100)
  },
  username: {
    type: Sequelize.STRING(100)
  },
  password: {
    type: Sequelize.STRING(100)
  },
  is_system: {
    type: Sequelize.TINYINT(2)
  },
  association_id: {
    type: Sequelize.INTEGER
  },
})

module.exports = Admin
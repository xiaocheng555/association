/*
 * File: activity.js
 * File Created: 2018-03-19 12:40:29 pm
 * Author: zhanghuancheng555 (1052745517@qq.com)
 * Copyright: 2017 - 2018 Your Company, Your Company
 * -----
 * Last Modified: 2018-03-19 11:08:23 pm
 * Modified By: zhanghuancheng555 (1052745517@qq.com>)
 */

const Sequelize = require('sequelize');
const db = require('../db');

const Activity = db.defineModel('activity', {
  name: {
    type: Sequelize.STRING(100)
  },
  content: {
    type: Sequelize.TEXT('long')
  },
  startTime: {
    type: Sequelize.DATE
  },
  endTime: {
    type: Sequelize.DATE
  },
  score: {
    type: Sequelize.DECIMAL(4, 2)
  },
  director: {
    type: Sequelize.STRING(50)
  },
  directorTel: {
    type: Sequelize.STRING(20)
  },
  approve_advise: {
    type: Sequelize.STRING(2000)
  },
  confirm_type: {
    type: Sequelize.STRING(4)
  },
  approveType: {
    type: Sequelize.TINYINT(4)
  },
  is_delete: {
    type: Sequelize.TINYINT(4)
  },
  admin_id: {
    type: Sequelize.INTEGER
  }
})

module.exports = Activity
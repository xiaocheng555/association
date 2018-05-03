/*
 * File: activity.js
 * File Created: 2018-03-19 12:40:29 pm
 * Author: zhanghuancheng555 (1052745517@qq.com)
 * Copyright: 2017 - 2018 Your Company, Your Company
 * -----
 * Last Modified: 2018-05-03 4:43:21 pm
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
  // 审批意见
  approveAdvise: {
    type: Sequelize.STRING(2000)
  },
  // 确定名单类型：0为名单未提交，1为名单提交，2为名单确定成功，-1为名单确定失败
  confirmType: {
    type: Sequelize.STRING(4)
  },
  // 审批类型：0为待审批，1为审批通过，-1为审批驳回
  approveType: {
    type: Sequelize.TINYINT(4)
  },
  isDelete: {
    type: Sequelize.TINYINT(4)
  },
  adminId: {
    type: Sequelize.INTEGER
  },
  associationId: {
    type: Sequelize.INTEGER
  }
})

module.exports = Activity
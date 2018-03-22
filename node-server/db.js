/*
 * File: db.js
 * File Created: 2018-03-18 8:19:52 pm
 * Author: zhanghuancheng555 (1052745517@qq.com)
 * Copyright: 2017 - 2018 Your Company, Your Company
 * -----
 * Last Modified: 2018-03-22 3:19:43 am
 * Modified By: zhanghuancheng555 (1052745517@qq.com>)
 */

const Sequelize = require('sequelize');
const { database, username, password, options } = require('./config').db;
const { toUnderscore } = require('./ulits/common')

const seqInstance = new Sequelize(database, username, password, options);
const db = {
  sequelize: seqInstance
};

/* 
 * db.defineModel方法：对seqInstance.defined 进行扩展
 * 作用: 模型自动添加id, createdAt, updatedAt 字段，给驼峰命名的字段添加field属性
*/
db.defineModel = function (name, attributes, options) {
  let attrs = attributes;
  let defaultArr = {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    }
  };
  // 如果选项禁用时间戳
  if (options && !options.timestamps) {

  } else {
    defaultArr.createdAt = {
      type: Sequelize.DATE,
      get () {
        let createdTime = this.getDataValue('createdAt')
        return createdTime ? createdTime.getTime() : null
      }
    };
    defaultArr.updatedAt = {
      type: Sequelize.DATE,
      get () {
        return this.getDataValue('updatedAt').getTime()
      }
    };
  }
  attrs = Object.assign(defaultArr, attrs);
  // attrs属性如果使用了驼峰命名，则添加field字段，将驼峰命名的字段与数据库下划线命名的字段映射
  // 如：createdAt: {}  变为=>  createdAt: { field: 'created_at' }
  for (let arr in attrs) {
    if (/([A-Z])/g.test(arr)) {
      attrs[arr]['field'] = toUnderscore(arr).toLocaleLowerCase();
    }
  }
  return seqInstance.define(name, attrs, options);
}

module.exports = db
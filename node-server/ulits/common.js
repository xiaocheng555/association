/*
 * File: common.js
 * File Created: 2018-03-19 12:22:38 pm
 * Author: zhanghuancheng555 (1052745517@qq.com)
 * Copyright: 2017 - 2018 Your Company, Your Company
 * -----
 * Last Modified: 2018-03-19 12:26:54 pm
 * Modified By: zhanghuancheng555 (1052745517@qq.com>)
 */

 /* 
 * 将驼峰字符串转为下划线字符串
 */
function toUnderscore (str) {
  return str.replace(/([A-Z])/g, '_$1').toLocaleLowerCase()
}

module.exports = {
  toUnderscore
}
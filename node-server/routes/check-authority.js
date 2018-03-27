/*
 * File: verify-token.js
 * File Created: 2018-03-21 9:24:31 am
 * Author: zhanghuancheng555 (1052745517@qq.com)
 * Copyright: 2017 - 2018 Your Company, Your Company
 * -----
 * Last Modified: 2018-03-27 8:11:25 pm
 * Modified By: zhanghuancheng555 (1052745517@qq.com>)
 */
const jwt = require('jsonwebtoken');
const { privateKey } = require('../config')

/* 
 * 统一处理接口权限
*/
module.exports = function (req, res, next) {
  let token = req.headers.accesstoken
  if (token) {
    // 验证token有效性
    jwt.verify(token, privateKey, function (err, decoded) {
      if (err) {
        return res.json({
          errorCode: 10003,
          message: 'token失效'
        })
      } else {
        res.json({
          errorCode: 0,
          data: {
            message: 'token生效'
          }
        })
        next();
      }
    })
  } else {
    next();    
  }
}
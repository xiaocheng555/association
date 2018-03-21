/*
 * File: student.js
 * File Created: 2018-02-26 1:08:14 pm
 * Author: zhanghuancheng555 (1052745517@qq.com)
 * Copyright: 2017 - 2018 Your Company, Your Company
 * -----
 * Last Modified: 2018-03-21 8:54:36 am
 * Modified By: zhanghuancheng555 (1052745517@qq.com>)
 */

const jwt = require('jsonwebtoken');
const StudentModel = require('../models/student')
const { privateKey } = require('../config')

exports.student = function (req, res) {
  StudentModel.findById(1).then(data => {
    res.json(data)
  })
}

/* 
 * 学生登录
*/
exports.login = function (req, res) {
  let usersno = req.body.user
  let password = req.body.password
  StudentModel.findOne({ 
    where: { id: '1' }
  }).then(student => {
    if (!student) {
      return res.json({
        errorCode: 1000,
        message: '学生不存在'
      })
    }
    if (student.password === password) {
      let token = jwt.sign({ sid: student.id }, privateKey, {
        expiresIn: 30
      });
      return res.json({
        errorCode: 0,
        data: {
          id: student.id,
          token: token,
          name: student.name
        }
      })
    } else {
      return res.json({
        errorCode: 1001,
        message: '密码输入不正确'
      })
    }
  })
}
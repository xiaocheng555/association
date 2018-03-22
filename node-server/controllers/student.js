/*
 * File: student.js
 * File Created: 2018-02-26 1:08:14 pm
 * Author: zhanghuancheng555 (1052745517@qq.com)
 * Copyright: 2017 - 2018 Your Company, Your Company
 * -----
 * Last Modified: 2018-03-22 10:55:26 am
 * Modified By: zhanghuancheng555 (1052745517@qq.com>)
 */

const jwt = require('jsonwebtoken');
const Student = require('../models/student')
const { privateKey } = require('../config')

exports.student = function (req, res) {
  Student.findById(1).then(data => {
    res.json(data)
  })
}

/* 
 * 学生登录
*/
exports.login = async function (req, res) {
  let usersno = req.body.user
  let password = req.body.password
  const studentData = await Student.findOne({ 
    where: { sno: usersno }
  })
  // 如果学生不存在
  if (!studentData) {
    return res.json({
      errorCode: 1000,
      message: '学生不存在'
    })
  }
  // 如果学生密码验证成功
  if (studentData.password === password) {
    let token = jwt.sign({ sid: studentData.id }, privateKey, {
      expiresIn: 30
    });
    return res.json({
      errorCode: 0,
      data: {
        id: studentData.id,
        token: token,
        name: studentData.name
      }
    })
  } else {
    return res.json({
      errorCode: 1001,
      message: '密码输入不正确'
    })
  }
}
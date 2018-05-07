/*
 * File: student.js
 * File Created: 2018-02-26 1:08:14 pm
 * Author: zhanghuancheng555 (1052745517@qq.com)
 * Copyright: 2017 - 2018 Your Company, Your Company
 * -----
 * Last Modified: 2018-05-06 11:22:23 pm
 * Modified By: zhanghuancheng555 (1052745517@qq.com>)
 */

const jwt = require('jsonwebtoken');
const { Student, Class, Academy, Grade } = require('../models')
const { privateKey } = require('../config')
const pagination = require('../ulits/pagination.js')

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
  let accessToken
  // 如果学生密码验证成功
  if (studentData.password === password) {
    accessToken = jwt.sign({ sid: studentData.id }, privateKey, {
      expiresIn: 30
    });
    studentData.password = undefined
    return res.json({
      errorCode: 0,
      data: {
        id: studentData.id,
        name: studentData.name,
        sno: studentData.sno,
        sex: studentData.sex,
        age: studentData.age,
        class: studentData.class,
        academy: studentData.academy,
        grade: studentData.grade,
        level: studentData.level,
        major: studentData.major,
        address: studentData.address,
        tel: studentData.tel,
        qq: studentData.qq,
        nation: studentData.nation,
        duration: studentData.duration,
        accessToken
      }
    })
  } else {
    return res.json({
      errorCode: 1001,
      message: '密码输入不正确'
    })
  }
}

/* 
 * 获取学生筛选信息
*/
exports.filterInfo = async function (req, res) {
  let gradeList = await Grade.findAll()
  let academyList = await Academy.findAll()
  let classList = await Class.findAll()
  res.json({
    errorCode: 0,
    data: {
      gradeList,
      academyList,
      classList
    }
  })
}

/* 
 * 搜索学生
*/
exports.search = async function (req, res) {
  let sno = req.query.sno
  let resData = await pagination(req, Student, {
    where: {
      sno: sno
    }
  })
  if (resData.list.length > 0) {
    resData.list.forEach((item, index) => {
      resData.list[index].password = undefined
    })
  }
  res.json({
    errorCode: 0,
    data: resData
  })
}


/* 
 * 学生详情
*/
exports.detail = async function (req, res) {
  let studentId = req.query.studentId
  try {
    let resData = await Student.findOne({
      where: {
        id: studentId
      }
    })
    res.json({
      errorCode: 0,
      data: resData
    })
  } catch (err) {
    res.json({
      errorCode: 1002,
      message: '获取学生失败'
    })
  }
}

/* 
 * 学生详情
*/
exports.changePassword = async function (req, res) {
  let studentId = req.body.studentId
  let oldPassword = req.body.oldPassword
  let newPassword = req.body.newPassword
  let student = await Student.findOne({
    where: {
      id: studentId
    }
  })
  if (student.password !== oldPassword) {
    return res.json({
      errorCode: 1003,
      message: '密码输入错误'
    })
  }
  student.password = newPassword
  try {
    student.save()  
    res.json({
      errorCode: 0,
      message: '修改密码成功'
    })
  } catch (error) {
    res.json({
      errorCode: 2003,
      data: '修改密码成功失败'
    })
  }
}
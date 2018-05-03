/*
 * File: admin.js
 * File Created: 2018-03-18 7:45:20 pm
 * Author: zhanghuancheng555 (1052745517@qq.com)
 * Copyright: 2017 - 2018 Your Company, Your Company
 * -----
 * Last Modified: 2018-05-02 3:47:30 pm
 * Modified By: zhanghuancheng555 (1052745517@qq.com>)
 */

const jwt = require('jsonwebtoken');
const pagination = require('../ulits/pagination.js')
const { privateKey } = require('../config')
const { Admin, Association } = require('../models')

/* 
 * 添加社团管理员
*/
exports.create = function (req, res, next) {
  let name = req.body.name
  let username = req.body.username.toString().trim()
  let password = req.body.password.toString().trim()
  let associationId = req.body.associationId
  // 验证帐号、密码不为空
  if (!password && !username) {
    res.json({
      errorCode: 3000,
      message: '帐号和密码不能为空'
    })
  }
  // 帐号查重
  Admin.findOne({
    where: {
      username: username
    }
  }).then(data => {
    if (data) {
      res.json({
        errorCode: 3001,
        message: '帐号已存在'
      })
    }
  })
  // 创建帐号
  Admin.create({
    name,
    username,
    password,
    isSystem: 0,
    associationId
  }).then(data => {
    res.json({
      errorCode: 0,
      message: '管理员保存成功'
    })
  }).catch(error => {
    res.json({
      errorCode: 3002,
      message: error
    })
  })
}

/* 
 * 删除管理员
*/
exports.destroy = function (req, res, next) {
  let id = req.body.id
  Admin.destroy({
    where: {
      id: id
    }
  }).then(data => {
    if (data > 0) {
      res.json({
        errorCode: 0,
        message: '管理员删除成功'
      })
    } else {
      res.json({
        errorCode: 3003,
        message: '管理员不存在'
      })
    }
  }).catch(error => {
    res.json({
      errorCode: 3004,
      message: '管理员删除失败'
    })
  })
}

/* 
 * 更新管理员
*/
exports.update = function (req, res, next) {
  let id = req.body.id
  let name = req.body.name
  let password = req.body.password
  Admin.update({
    name,
    password
  }, {
    where: {
      id: id
    }
  }).then(data => {
    res.json({
      errorCode: 0,
      message: '管理员更新成功'
    })
  }).catch(error => {
    res.json({
      errorCode: 3005,
      message: error
    })
  })
}

/* 
 * 获取管理员详情
*/
exports.detail = function (req, res) {
  Admin.findById(1, {
    include: [Association]
  }).then(data => {
    res.json({
      errorCode: 0,
      data: data
    })
  })
}

/* 
 * 获取管理员列表
*/
exports.list = async function (req, res, next) {
  // 分页
  pagination(req, Admin, {
    include: [{
      model: Association
    }]
  }).then(data => {
    data.list.forEach((item, index) => {
      data.list[index] = {
        name: item.name,
        username: item.username,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
        association: item.association ? {
          name: item.association.name
        } : null
      }
    })
    res.json({
      errorCode: 0,
      data: data
    })
  }).catch(error => {
    res.json({
      errorCode: 2003,
      message: error
    })
  })
}

/* 
 * 管理员登录
*/
exports.login = async function (req, res) {
  let username = req.body.username
  let password = req.body.password
  const adminData = await Admin.findOne({
    where: { username: username }
  })
  // 如果管理员不存在
  if (!adminData) {
    return res.json({
      errorCode: 2004,
      message: '管理员不存在'
    })
  }
  // 如果管理员密码验证成功
  if (adminData.password === password) {
    let token = jwt.sign({ sid: adminData.id }, privateKey, {
      expiresIn: 30
    });
    return res.json({
      errorCode: 0,
      data: {
        createdAt: adminData.createdAt,
        updatedAt: adminData.updatedAt,
        id: adminData.id,
        name: adminData.name,
        username: adminData.username,
        isSystem: Boolean(adminData.isSystem),
        associationId: adminData.associationId
      }
    })
  } else {
    return res.json({
      errorCode: 2005,
      message: '密码输入不正确'
    })
  }
}
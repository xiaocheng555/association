/*
 * File: association.js
 * File Created: 2018-03-22 2:43:03 pm
 * Author: zhanghuancheng555 (1052745517@qq.com)
 * Copyright: 2017 - 2018 Your Company, Your Company
 * -----
 * Last Modified: 2018-03-22 6:03:12 pm
 * Modified By: zhanghuancheng555 (1052745517@qq.com>)
 */

const { Admin, Association } = require('../models')
const pagination = require('../ulits/pagination.js')

/* 
 * 添加社团
*/
// exports.create = async function (req, res, next) {
//   // let assoName = req.body.associationName
//   // let adminName = req.body.adminName.toString().trim()
//   // let username = req.body.username.toString().trim()
//   // let password = req.body.password.toString().trim()
//   // // 验证帐号、密码不为空
//   // if (!password && !username) {
//   //   res.json({
//   //     errorCode: 3100,
//   //     message: '帐号和密码不能为空'
//   //   })
//   // }
//   // // 社团查重
//   // const oldAssociation = await Association.findOne({
//   //   where: {
//   //     name: assoName
//   //   }
//   // })
//   // if (oldAssociation) {
//   //   res.json({
//   //     errorCode: 3101,
//   //     message: '社团已存在'
//   //   })
//   // }
//   // // 管理员查重
//   // const oldAdmin = await Admin.findOne({
//   //   where: {
//   //     username: username
//   //   }
//   // })
//   // if (oldAdmin) {
//   //   res.json({
//   //     errorCode: 3102,
//   //     message: '管理员帐号已存在'
//   //   })
//   // }
//   // // 创建社团
//   // const newAssociation = await Association.create({ 
//   //   name: assoName 
//   // })
//   // let associationId = newAssociation.id
//   // // 创建社团的管理员
//   // const newAdmin = await Admin.create({
//   //   adminName,
//   //   username,
//   //   password,
//   //   associationId
//   // })
//   // if (newAdmin) {
//   //   res.json({
//   //     errorCode: 0,
//   //     data: newAdmin
//   //   })
//   // } else {
//   //   res.json({
//   //     errorCode: 3103,
//   //     message: '创建社团失败'
//   //   })
//   // }
// }

/* 
 * 删除社团
*/
exports.destroy = function (req, res, next) {
  let id = req.body.id
  Association.destroy({
    where: {
      id: id
    }
  }).then(data => {
    if (data > 0) {
      res.json({
        errorCode: 0,
        message: '社团删除成功'
      })
    } else {
      res.json({
        errorCode: 3103,
        message: '社团不存在'
      })
    }
  }).catch(error => {
    res.json({
      errorCode: 3104,
      message: '社团删除失败'
    })
  })
}

/* 
 * 更新社团
*/
exports.save = async function (req, res, next) {
  let id = req.body.id
  let association = await Association.findById(id)
  if (!association) {
    res.json({
      errorCode: 3105,
      message: '找不到该社团'
    })
  }
  association.introduction = req.body.introduction
  await association.save()
  res.json({
    errorCode: 0,
    message: '社团更新成功'
  })
}

/* 
 * 获取社团详情
*/
exports.detail = function (req, res) {
  let id = req.query.id
  Association.findById(id).then(data => {
    res.json({
      errorCode: 0,
      data: data
    })
  })
}

/* 
 * 获取社团列表
*/
exports.list = function (req, res, next) {
  // 分页
  pagination(req, Association).then(data => {
    res.json({
      errorCode: 0,
      data: data
    })
  }).catch(error => {
    res.json({
      errorCode: 2106,
      message: '获取社团列表失败'
    })
  })
}
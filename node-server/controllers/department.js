/*
 * File: department.js
 * File Created: 2018-03-22 6:35:02 pm
 * Author: zhanghuancheng555 (1052745517@qq.com)
 * Copyright: 2017 - 2018 Your Company, Your Company
 * -----
 * Last Modified: 2018-03-22 7:07:49 pm
 * Modified By: zhanghuancheng555 (1052745517@qq.com>)
 */

const { Department } = require('../models')
const pagination = require('../ulits/pagination.js')

/* 
 * 添加一条公告
*/
exports.create = function (req, res, next) {
  let name = req.body.name || null
  let content = req.body.content || null
  let adminId = req.body.adminId || null
  let associationId = req.body.associationId || null
  Department.create({
    name: name,
    content: content,
    adminId: adminId,
    associationId: associationId
  }).then(data => {
    res.json({
      errorCode: 0,
      message: '公告保存成功'
    })
  }).catch(error => {
    res.json({
      errorCode: 2000,
      message: error
    })
  })
}

/* 
* 删除部门
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
        message: '部门删除成功'
      })
    } else {
      res.json({
        errorCode: 3103,
        message: '部门不存在'
      })
    }
  }).catch(error => {
    res.json({
      errorCode: 3104,
      message: '部门删除失败'
    })
  })
}

/* 
 * 更新部门
*/
exports.save = async function (req, res, next) {
  let id = req.body.id
  let association = await Association.findById(id)
  if (!association) {
    res.json({
      errorCode: 3105,
      message: '找不到该部门'
    })
  }
  association.introduction = req.body.introduction
  await association.save()
  res.json({
    errorCode: 0,
    message: '部门更新成功'
  })
}

/* 
 * 获取部门详情
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
 * 获取部门列表
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
      message: '获取部门列表失败'
    })
  })
}
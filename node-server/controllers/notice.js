/*
 * File: notice.js
 * File Created: 2018-03-21 12:32:53 pm
 * Author: zhanghuancheng555 (1052745517@qq.com)
 * Copyright: 2017 - 2018 Your Company, Your Company
 * -----
 * Last Modified: 2018-05-03 6:36:05 pm
 * Modified By: zhanghuancheng555 (1052745517@qq.com>)
 */

const { Notice, Association, Admin } = require('../models')
const pagination = require('../ulits/pagination.js')

/* 
 * 添加一条公告
*/
exports.create = function (req, res, next) {
  let name = req.body.name || null
  let content = req.body.content || null
  let adminId = req.body.adminId || null
  let associationId = req.body.associationId || null
  Notice.create({
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
 * 删除一条公告
*/
exports.destroy = function (req, res, next) {
  let id = req.body.id
  Notice.destroy({
    where: {
      id: id
    }
  }).then(data => {
    res.json({
      errorCode: 0,
      message: '公告删除成功'
    })
  }).catch(error => {
    res.json({
      errorCode: 2001,
      message: error
    })
  })
}

/* 
 * 更新一条公告
*/
exports.update = function (req, res, next) {
  let id = req.body.id
  let name = req.body.name || null
  let content = req.body.content || null
  Notice.update({
    name: name,
    content: content
  }, {
    where: {
      id: id
    }
  }).then(data => {
    res.json({
      errorCode: 0,
      message: '公告更新成功'
    })
  }).catch(error => {
    res.json({
      errorCode: 2002,
      message: error
    })
  })
}

/* 
 * 获取公告详情
*/
exports.detail = async function (req, res, next) {
  let id = req.query.id
  Notice.findOne({
    include: [{ 
      model: Admin, 
      include: [Association]
    }],
    where: {
      id: id
    }
  }).then(data => {
    let resData = {
      name: data.name,
      content: data.content,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      principal: data.association ? item.association.name : '系统'
    }
    res.json({
      errorCode: 0,
      data: resData
    })
  }).catch(error => {
    res.json({
      errorCode: 2003,
      message: error
    })
  })
}

/* 
 * 获取公告列表
*/
exports.list = async function (req, res, next) {
  let associationId = req.query.associationId
  let adminId = req.query.adminId
  let where = {}
  if (typeof associationId !== 'undefined') {
    where.associationId = associationId
  }
  if (typeof adminId !== 'undefined') {
    where.adminId = adminId
  }
  // 分页
  pagination(req, Notice, {
    include: [
      { model: Admin },
      { model: Association }
    ],
    where: where
  }).then(data => {
    data.list.forEach((item, index) => {
      data.list[index] = {
        id: item.id,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
        name: item.name,
        // 发布者
        principal: item.association ? item.association.name : '系统'
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
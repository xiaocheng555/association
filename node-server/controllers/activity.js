/*
 * File: activity.js
 * File Created: 2018-03-22 9:10:39 am
 * Author: zhanghuancheng555 (1052745517@qq.com)
 * Copyright: 2017 - 2018 Your Company, Your Company
 * -----
 * Last Modified: 2018-03-22 1:20:26 pm
 * Modified By: zhanghuancheng555 (1052745517@qq.com>)
 */

const Op = require('sequelize').Op;
const { Activity, Association, Admin } = require('../models')
const pagination = require('../ulits/pagination.js')

/* 
 * 添加一条活动
*/
exports.create = function (req, res, next) {
  let name = req.body.name
  let content = req.body.content
  let startTime = req.body.startTime
  let endTime = req.body.endTime
  let score = req.body.score
  let director = req.body.director
  let directorTel = req.body.directorTel
  // 0-待审批
  let approveType = 0
  // 0-名单未提交
  let confirmType = 0
  let adminId = req.body.adminId
  let associationId = req.body.associationId
  Activity.create({
    name,
    content,
    startTime,
    endTime,
    score,
    director,
    directorTel,
    approveType,
    confirmType,
    adminId,
    associationId
  }).then(data => {
    res.json({
      errorCode: 0,
      message: '活动保存成功'
    })
  }).catch(error => {
    res.json({
      errorCode: 2100,
      message: error
    })
  })
}

/* 
 * 删除一条活动
*/
exports.destroy = function (req, res, next) {
  let id = req.body.id
  Activity.destroy({
    where: {
      id: id
    }
  }).then(data => {
    res.json({
      errorCode: 0,
      message: '活动删除成功'
    })
  }).catch(error => {
    res.json({
      errorCode: 2101,
      message: error
    })
  })
}

/* 
 * 更新一条活动
*/
exports.update = function (req, res, next) {
  let id = req.body.id
  let name = req.body.name
  let content = req.body.content
  let startTime = req.body.startTime
  let endTime = req.body.endTime
  let score = req.body.score
  let director = req.body.director
  let directorTel = req.body.directorTel
  let approveType = req.body.approveType
  let confirmType = req.body.confirmType
  let adminId = req.body.adminId
  Activity.update({
    name,
    content,
    startTime,
    endTime,
    score,
    director,
    directorTel,
    directorTel,
    approveType,
    confirmType,
    adminId
  }, {
      where: {
        id: id
      }
    }).then(data => {
      res.json({
        errorCode: 0,
        message: '活动更新成功'
      })
    }).catch(error => {
      res.json({
        errorCode: 2102,
        message: error
      })
    })
}

/* 
 * 获取活动详情
*/
exports.detail = async function (req, res, next) {
  let id = req.query.id
  Activity.findOne({
    include: [{
      model: Admin,
      include: [Association]
    }],
    where: {
      id: id
      // isDelete != 1
      // isDelete: {
      //   [Op.ne]: 1
      // }
    }
  }).then(data => {
    let resData = null
    if (data) {
      resData = {
        name: data.name,
        content: data.content,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
        admin: data.admin ? {
          name: data.admin.name,
          isSystem: data.admin.isSystem,
        } : null,
        association: data.association ? {
          name: data.association.name
        } : null
      }
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
 * 获取活动列表
*/
exports.list = async function (req, res, next) {
  let associationId = req.query.associationId
  // 分页
  pagination(req, Activity, {
    include: [{
      model: Admin,
      include: [{
        model: Association,
        where: {
          id: associationId
        }
      }]
    }]
  }).then(data => {
    data.list.forEach((item, index) => {
      data.list[index] = {
        name: item.name,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
        admin: item.admin ? {
          name: item.admin.name,
          isSystem: item.admin.isSystem,
        } : null,
        association: item.association ? {
          name: item.association.name
        } : null
      }
      item = null
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
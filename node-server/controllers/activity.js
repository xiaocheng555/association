/*
 * File: activity.js
 * File Created: 2018-03-22 9:10:39 am
 * Author: zhanghuancheng555 (1052745517@qq.com)
 * Copyright: 2017 - 2018 Your Company, Your Company
 * -----
 * Last Modified: 2018-03-24 8:56:36 pm
 * Modified By: zhanghuancheng555 (1052745517@qq.com>)
 */

const Op = require('sequelize').Op
const { Activity, Association, Admin, Student } = require('../models')
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
 * 通过设置isDelete为1，进行假删除，保留原来数据
*/
exports.destroy = async function (req, res, next) {
  let id = req.body.id
  let activity = await Activity.findById(id)
  if (!activity) {
    return res.json({
      errorCode: 2108,
      message: '活动不存在'
    })
  }
  // 假删除, isDelete: 1为删除，0为未删除
  activity.isDelete = 1
  await activity.save()
  res.json({
    errorCode: 0,
    message: '活动删除成功'
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
      id: id,
      isDelete: {
        [Op.ne]: 1
      }
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
    }],
    where: {
      isDelete: {
        [Op.or]: {
          [Op.ne]: 1,
          [Op.eq]: null
        }
      }
    }
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

/* 
 * 审批活动
*/
exports.approve = async function (req, res, next) {
  let id = res.boyd.id
  let activity = await Activity.findById(id)  
  if (!activity) {
    return res.json({
      errorCode: 2108,
      message: '活动不存在'
    })
  }
  try {
    // 审批类型：0为待审批，1为审批通过，-1为审批驳回
    activity.approveType = res.boyd.approveType
    await activity.save()
    res.json({
      errorCode: 0,
      data: '活动审批成功'
    })
  } catch (err) {
    res.json({
      errorCode: 0,
      message: '活动审批失败'
    })
  }
}

/* 
 * 确定活动名单
*/
exports.confirmStudentJoinList = async function (req, res, next) {
  let id = res.boyd.id
  let activity = await Activity.findById(id)
  if (!activity) {
    return res.json({
      errorCode: 2108,
      message: '活动不存在'
    })
  }
  try {
    // 确定名单类型：0为名单未提交，1为名单提交，2为名单确定成功，-1为名单确定失败
    activity.confirmType = res.boyd.confirmType
    await activity.save()
    res.json({
      errorCode: 0,
      data: '提交成功'
    })
  } catch (err) {
    res.json({
      errorCode: 0,
      message: '提交失败'
    })
  }
}

/* 
 * 参与活动的学生名单
*/
exports.studentJoinList = async function (req, res, next) {
  let activityId = req.query.activityId
  // 分页
  let resData = await pagination(req, Student, {
    include: [{
      model: Activity,
      where: {
        id: activityId
      },
      through: {}
      // through: {
      //   where: {
      //     id: 5
      //   }
      // }
    }]
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
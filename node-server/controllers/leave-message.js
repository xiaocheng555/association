/*
 * File: leave-message.js
 * File Created: 2018-03-23 7:31:00 pm
 * Author: zhanghuancheng555 (1052745517@qq.com)
 * Copyright: 2017 - 2018 Your Company, Your Company
 * -----
 * Last Modified: 2018-03-24 7:57:40 pm
 * Modified By: zhanghuancheng555 (1052745517@qq.com>)
 */


const { LeaveMessage, Student, Admin, Activity } = require('../models')
const pagination = require('../ulits/pagination.js')

/* 
* 添加一条留言
*/
exports.create = function (req, res, next) {
  let content = req.body.content || null
  let activityId = req.body.activityId
  let studentId = req.body.studentId
  if (!activityId || !studentId) {
    res.json({
      errorCode: 4000,
      message: 'activityId或studentId参数不为空'
    })
  }
  LeaveMessage.create({
    activityId,
    studentId,
    content
  }).then(data => {
    res.json({
      errorCode: 0,
      message: '留言保存成功'
    })
  }).catch(error => {
    res.json({
      errorCode: 2000,
      message: '留言添加失败'
    })
  })
}

/* 
 * 删除一条留言
*/
exports.destroy = function (req, res, next) {
  let id = req.body.id
  LeaveMessage.destroy({
    where: {
      id: id
    }
  }).then(data => {
    res.json({
      errorCode: 0,
      message: '留言删除成功'
    })
  }).catch(error => {
    res.json({
      errorCode: 2001,
      message: '留言删除失败'
    })
  })
}

/* 
 * 获取留言列表
*/
exports.list = async function (req, res, next) {
  let activityId = req.query.activityId
  // 分页
  pagination(req, LeaveMessage, {
    where: {
      activityId: activityId
    },
    include: [Student, Admin]
  }).then(data => {
    // data.list.forEach((item, index) => {
    //   data.list[index] = {
    //     createdAt: item.createdAt,
    //     updatedAt: item.updatedAt,
    //     name: item.name,
    //     admin: item.admin ? {
    //       name: item.admin.name,
    //       isSystem: item.admin.isSystem,
    //     } : null,
    //     association: item.association ? {
    //       name: item.association.name
    //     } : null
    //   }
    // })
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
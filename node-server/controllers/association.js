/*
 * File: association.js
 * File Created: 2018-03-22 2:43:03 pm
 * Author: zhanghuancheng555 (1052745517@qq.com)
 * Copyright: 2017 - 2018 Your Company, Your Company
 * -----
 * Last Modified: 2018-05-07 3:29:41 pm
 * Modified By: zhanghuancheng555 (1052745517@qq.com>)
 */

const Op = require('sequelize').Op
const { Admin, Association, Student, StudentAssociation } = require('../models')
const pagination = require('../ulits/pagination.js')

/* 
 * 添加社团
*/
exports.create = async function (req, res, next) {
  let assoName = req.body.associationName
  // 社团查重
  const oldAssociation = await Association.findOne({
    where: {
      name: assoName,
      isDelete: {
        [Op.or]: {
          [Op.ne]: 1,
          [Op.eq]: null
        }
      }
    }
  })
  if (oldAssociation) {
    return res.json({
      errorCode: 3101,
      message: '社团已存在'
    })
  }
  try {
    const newAssociation = await Association.create({ 
      name: assoName 
    })
    res.json({
      errorCode: 0,
      data: '创建社团成功'
    })
  } catch (error) {
    res.json({
      errorCode: 3103,
      message: '创建社团失败'
    })
  }
}

/* 
 * 删除社团
 * 通过设置isDelete为1，进行假删除，保留原来数据
*/
exports.destroy = async function (req, res, next) {
  let id = req.body.associationId
  // 假删除
  let association = await Association.findById(id)
  if (!association) {
    return res.json({
      errorCode: 3107,
      message: '社团不存在'
    })
  }
  // isDelete: 1为删除，0为未删除
  association.isDelete = 1
  await association.save()
  res.json({
    errorCode: 0,
    message: '社团删除成功'
  })
}

/* 
 * 更新社团
*/
exports.save = async function (req, res, next) {
  let id = req.body.associationId
  let associationName = req.body.associationName
  // 社团查重
  if (associationName) {
    const oldAssociation = await Association.findOne({
      where: {
        name: associationName,
        isDelete: {
          [Op.or]: {
            [Op.ne]: 1,
            [Op.eq]: null
          }
        }
      }
    })
    if (oldAssociation) {
      return res.json({
        errorCode: 3101,
        message: '社团已存在'
      })
    }
  }
  let association = await Association.findById(id)
  if (!association) {
    res.json({
      errorCode: 3105,
      message: '找不到该社团'
    })
  }
  association.name = associationName
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
  pagination(req, Association, {
    where: {
      isDelete: {
        [Op.or]: {
          [Op.ne]: 1,
          [Op.eq]: null
        }
      }
    }
  }).then(data => {
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

/* 
 * 学生加入社团
*/
exports.studentJoin = async function (req, res, next) {
  let associationId = req.body.associationId
  let studentIds = req.body.studentIds
  // 加入社团的状态，0为等待审批，1为已经加入，2-任命部门职位，3为部门退任，-1为审批不通过
  let joinStatus = req.body.joinStatus
  let createList = studentIds.map(id => {
    return {
      studentId: id,
      associationId,
      joinStatus
    }
  })

  try {
    await StudentAssociation.bulkCreate(createList)
    res.json({
      errorCode: 0,
      data: '申请成功'
    })
  } catch (err) {
    res.json({
      errorCode: 2110,
      data: '申请失败'
    })
  }
}

/* 
 * 管理员审批学生是否能加入社团
*/
exports.approveStudent = async function (req, res, next) {
  let studentId = res.query.studentId
  let approve = res.query.approve
  // 加入社团的状态，0为等待审批，1为已经加入，2-任命部门职位，3为部门退任，-1为审批不通过
  let joinStatus
  if (typeof approve === 'number') {
    switch (approve) {
      case 1:
        joinStatus = -1
      case 0:
        joinStatus = 1
    }
    const stuAsso = StudentAssociation.findOne({
      where: {
        studentId: studentId
      }
    })
    stuAsso.joinStatus = joinStatus
    stuAsso.save()
  } else {
    res.json({
      errorCode: 2110,
      message: '参数不正确'
    })
  }

}

/* 
 * 参与社团的学生列表
*/
exports.studentJoinList = async function (req, res, next) {
  let associationId = req.query.associationId
  // 加入社团的状态，0为等待审批，1为已经加入，2-任命部门职位，3为部门退任，-1为审批不通过
  // 通过加入社团学生的状态进行学生筛选
  let joinStatus = req.query.joinStatus
  // 分页
  let resData = await pagination(req, Student, {
    include: [{
      model: Association,
      where: {
        id: associationId
      },
      through: {
        where: {
          joinStatus: joinStatus
        }
      }
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

/* 
 * 删除参与社团的学生
*/
exports.deleteStudentJoin = async function (req, res, next) {
  let studentId = req.body.studentId
  StudentAssociation.destroy({
    where: {
      studentId: studentId
    }
  })
  res.json({
    errorCode: 0,
    message: '删除学生与社团的关联成功'
  })
}

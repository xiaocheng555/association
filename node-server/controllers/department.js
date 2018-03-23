/*
 * File: department.js
 * File Created: 2018-03-22 6:35:02 pm
 * Author: zhanghuancheng555 (1052745517@qq.com)
 * Copyright: 2017 - 2018 Your Company, Your Company
 * -----
 * Last Modified: 2018-03-23 1:05:00 pm
 * Modified By: zhanghuancheng555 (1052745517@qq.com>)
 */

const { Department } = require('../models')
const pagination = require('../ulits/pagination.js')

/* 
 * 添加一条部门
*/
exports.create = function (req, res, next) {
  let name = req.body.name
  let introduce = req.body.introduce
  let associationId = req.body.associationId
  Department.create({
    name,
    introduce,
    associationId
  }).then(data => {
    res.json({
      errorCode: 0,
      message: '部门保存成功'
    })
  }).catch(error => {
    res.json({
      errorCode: 2000,
      message: '部门保存失败'
    })
  })
}

/* 
* 删除部门
*/
exports.destroy = function (req, res, next) {
  let id = req.body.id
  Department.destroy({
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
  let department = await Department.findById(id)
  if (!department) {
    res.json({
      errorCode: 3105,
      message: '找不到该部门'
    })
  }
  department.name = req.body.name
  department.introduce = req.body.introduce
  await department.save()
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
  Department.findById(id).then(data => {
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
  pagination(req, Department).then(data => {
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
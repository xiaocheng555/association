/*
 * File: position.js
 * File Created: 2018-03-23 2:01:33 pm
 * Author: zhanghuancheng555 (1052745517@qq.com)
 * Copyright: 2017 - 2018 Your Company, Your Company
 * -----
 * Last Modified: 2018-03-23 7:28:05 pm
 * Modified By: zhanghuancheng555 (1052745517@qq.com>)
 */

const { Position } = require('../models')
  
/* 
 * 添加一条职位
*/
exports.create = function (req, res, next) {
  let name = req.body.name
  if (checkPositionRepeat(res, name)) return
  Position.create({
    name
  }).then(data => {
    res.json({
      errorCode: 0,
      message: '职位保存成功'
    })
  }).catch(error => {
    res.json({
      errorCode: 2000,
      message: '职位保存失败'
    })
  })
}

async function checkPositionRepeat (res, name) {
  if (typeof name === 'string') {
    name = name.trim()
  }
  // 职位查重
  const oldPosition = await Position.findOne({
    where: {
      name: name
    }
  })
  if (oldPosition) {
    res.json({
      errorCode: 3101,
      message: '职位已存在'
    })
  }
  return !!oldPosition
}

/* 
* 删除职位
*/
exports.destroy = function (req, res, next) {
  let id = req.body.id
  Position.destroy({
    where: {
      id: id
    }
  }).then(data => {
    if (data > 0) {
      res.json({
        errorCode: 0,
        message: '职位删除成功'
      })
    } else {
      res.json({
        errorCode: 3103,
        message: '职位不存在'
      })
    }
  }).catch(error => {
    res.json({
      errorCode: 3104,
      message: '职位删除失败'
    })
  })
}

/* 
 * 更新职位
*/
exports.save = async function (req, res, next) {
  let id = req.body.id
  let position = await Position.findById(id)
  if (!position) {
    res.json({
      errorCode: 3105,
      message: '找不到该职位'
    })
  }
  position.name = req.body.name
  await position.save()
  res.json({
    errorCode: 0,
    message: '职位更新成功'
  })
}

/* 
 * 获取职位列表
*/
exports.list = function (req, res, next) {
  Position.findAll().then(data => {
    res.json({
      errorCode: 0,
      data: data
    })
  }).catch(error => {
    res.json({
      errorCode: 2106,
      message: '获取职位列表失败'
    })
  })
}
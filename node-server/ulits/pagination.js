/*
 * File: pagination.js
 * File Created: 2018-03-22 1:25:10 am
 * Author: zhanghuancheng555 (1052745517@qq.com)
 * Copyright: 2017 - 2018 Your Company, Your Company
 * -----
 * Last Modified: 2018-03-27 10:08:00 pm
 * Modified By: zhanghuancheng555 (1052745517@qq.com>)
 */

const { defaultPageSize } = require('../config')

/* 
 * 分页处理
 * @param model 数据模型
 * @param options 查询选项，如where
*/
module.exports = async function (req, model, options) {
  let pageSize =  Number(req.query.pageSize) || defaultPageSize
  let pageNum =  Number(req.query.pageNum) || 1
  const data = await model.findAndCountAll({
    ...options,
    offset: (pageNum - 1) * pageSize,
    limit: pageSize,
  })
  let totalCount = data.count
  let nextPage = true
  // 如果获取的数据量比实际数据总数量的大
  if (pageNum * pageSize >= totalCount) {
    // 无下一页
    nextPage = false
    // pageNum重新计算
    pageNum = totalCount === 0 ? 1 : Math.ceil(totalCount / pageSize)
  }
  let previousPage = pageNum !== 1
  return {
    list: data.rows,
    totalCount: totalCount,
    nextPage: nextPage,
    previousPage: previousPage,
    pageNum: pageNum,
    pageSize: pageSize
  }
}
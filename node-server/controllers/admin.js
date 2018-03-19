/*
 * File: admin.js
 * File Created: 2018-03-18 7:45:20 pm
 * Author: zhanghuancheng555 (1052745517@qq.com)
 * Copyright: 2017 - 2018 Your Company, Your Company
 * -----
 * Last Modified: 2018-03-19 1:04:55 am
 * Modified By: zhanghuancheng555 (1052745517@qq.com>)
 */

const { AdminModel } = require('../models')

exports.admin = function (req, res) {
  AdminModel.findById(1).then(data => {
    // res.send('project ' + JSON.stringify(project));
    res.json(data)
  })
}
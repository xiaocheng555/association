/*
 * File: student.js
 * File Created: 2018-02-26 1:08:14 pm
 * Author: zhanghuancheng555 (1052745517@qq.com)
 * Copyright: 2017 - 2018 Your Company, Your Company
 * -----
 * Last Modified: 2018-03-18 10:44:26 pm
 * Modified By: zhanghuancheng555 (1052745517@qq.com>)
 */

const StudentModel = require('../models/student')

exports.student = function (req, res) {
  StudentModel.findById(1).then(data => {
    // res.send('project ' + JSON.stringify(project));
    res.json(data)
  })
}
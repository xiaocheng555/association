/*
 * File: student.js
 * File Created: 2018-02-26 1:14:18 pm
 * Author: zhanghuancheng555 (1052745517@qq.com)
 * Copyright: 2017 - 2018 Your Company, Your Company
 * -----
 * Last Modified: 2018-03-22 6:08:55 pm
 * Modified By: zhanghuancheng555 (1052745517@qq.com>)
 */

const express = require('express');
const router = express.Router();
const { login } = require('../controllers/student')

router.post('/login', login);

module.exports = router;

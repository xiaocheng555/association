/*
 * File: admin.js
 * File Created: 2018-03-18 7:49:42 pm
 * Author: zhanghuancheng555 (1052745517@qq.com)
 * Copyright: 2017 - 2018 Your Company, Your Company
 * -----
 * Last Modified: 2018-03-19 1:09:07 am
 * Modified By: zhanghuancheng555 (1052745517@qq.com>)
 */

const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin')

/* GET home page. */
router.get('/', adminController.admin);

module.exports = router;


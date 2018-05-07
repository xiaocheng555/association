/*
 * File: student.js
 * File Created: 2018-02-26 1:14:18 pm
 * Author: zhanghuancheng555 (1052745517@qq.com)
 * Copyright: 2017 - 2018 Your Company, Your Company
 * -----
 * Last Modified: 2018-05-06 10:12:45 pm
 * Modified By: zhanghuancheng555 (1052745517@qq.com>)
 */

const express = require('express');
const router = express.Router();
const { login, filterInfo, search, detail, changePassword } = require('../controllers/student')

router.post('/login', login);
router.get('/filter-info', filterInfo);
router.get('/search', search);
router.get('/detail', detail);
router.post('/change-password', changePassword);

module.exports = router;

/*
 * File: admin.js
 * File Created: 2018-03-18 7:49:42 pm
 * Author: zhanghuancheng555 (1052745517@qq.com)
 * Copyright: 2017 - 2018 Your Company, Your Company
 * -----
 * Last Modified: 2018-03-22 6:21:00 pm
 * Modified By: zhanghuancheng555 (1052745517@qq.com>)
 */

const express = require('express');
const router = express.Router();
const { create, destroy, update, detail, list, login } = require('../controllers/admin')

router.post('/create', create);
router.post('/destroy', destroy);
router.post('/update', update);
router.get('/detail', detail);
router.get('/list', list);
router.post('/login', login);

module.exports = router;


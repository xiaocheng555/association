/*
 * File: department.js
 * File Created: 2018-03-22 6:36:35 pm
 * Author: zhanghuancheng555 (1052745517@qq.com)
 * Copyright: 2017 - 2018 Your Company, Your Company
 * -----
 * Last Modified: 2018-03-23 12:51:19 pm
 * Modified By: zhanghuancheng555 (1052745517@qq.com>)
 */

const express = require('express');
const router = express.Router();
const { create, destroy, save, detail, list } = require('../controllers/department')

router.post('/create', create);
router.post('/destroy', destroy);
router.post('/save', save);
router.get('/detail', detail);
router.get('/list', list);

module.exports = router;
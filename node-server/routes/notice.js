/*
 * File: notice.js
 * File Created: 2018-03-21 12:31:32 pm
 * Author: zhanghuancheng555 (1052745517@qq.com)
 * Copyright: 2017 - 2018 Your Company, Your Company
 * -----
 * Last Modified: 2018-03-22 12:50:38 am
 * Modified By: zhanghuancheng555 (1052745517@qq.com>)
 */

const express = require('express');
const router = express.Router();
const { create, destroy, update, detail, list } = require('../controllers/notice')

router.post('/create', create);
router.post('/destroy', destroy);
router.post('/update', update);
router.get('/detail', detail);
router.get('/list', list);

module.exports = router;
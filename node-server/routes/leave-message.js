/*
 * File: leave-message.js
 * File Created: 2018-03-24 7:22:53 pm
 * Author: zhanghuancheng555 (1052745517@qq.com)
 * Copyright: 2017 - 2018 Your Company, Your Company
 * -----
 * Last Modified: 2018-03-24 7:23:47 pm
 * Modified By: zhanghuancheng555 (1052745517@qq.com>)
 */

const express = require('express');
const router = express.Router();
const { create, destroy, list } = require('../controllers/leave-message')

router.post('/create', create);
router.post('/destroy', destroy);
router.get('/list', list);

module.exports = router;
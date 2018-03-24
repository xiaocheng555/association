/*
 * File: position.js
 * File Created: 2018-03-23 2:09:03 pm
 * Author: zhanghuancheng555 (1052745517@qq.com)
 * Copyright: 2017 - 2018 Your Company, Your Company
 * -----
 * Last Modified: 2018-03-23 2:10:31 pm
 * Modified By: zhanghuancheng555 (1052745517@qq.com>)
 */

const express = require('express');
const router = express.Router();
const { create, destroy, save, list } = require('../controllers/position')

router.post('/create', create);
router.post('/destroy', destroy);
router.post('/save', save);
router.get('/list', list);

module.exports = router;
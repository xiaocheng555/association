/*
 * File: association.js
 * File Created: 2018-03-22 2:43:15 pm
 * Author: zhanghuancheng555 (1052745517@qq.com)
 * Copyright: 2017 - 2018 Your Company, Your Company
 * -----
 * Last Modified: 2018-03-23 12:38:04 pm
 * Modified By: zhanghuancheng555 (1052745517@qq.com>)
 */

const express = require('express');
const router = express.Router();
const { create, destroy, save, detail, list } = require('../controllers/association')

router.post('/create', create);
router.post('/destroy', destroy);
router.post('/save', save);
router.get('/detail', detail);
router.get('/list', list);

module.exports = router;
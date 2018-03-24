/*
 * File: notice.js
 * File Created: 2018-03-21 12:31:32 pm
 * Author: zhanghuancheng555 (1052745517@qq.com)
 * Copyright: 2017 - 2018 Your Company, Your Company
 * -----
 * Last Modified: 2018-03-24 12:42:48 am
 * Modified By: zhanghuancheng555 (1052745517@qq.com>)
 */

const express = require('express');
const router = express.Router();
const { create, destroy, update, detail, list, approve, confirmStudentJoinList, studentJoinList } = require('../controllers/activity');

router.post('/create', create);
router.post('/destroy', destroy);
router.post('/update', update);
router.get('/detail', detail);
router.get('/list', list);
router.post('/approve', approve);
router.post('/confirm-student-join-list', confirmStudentJoinList);
router.get('/student-join-list', studentJoinList);

module.exports = router;
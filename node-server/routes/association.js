/*
 * File: association.js
 * File Created: 2018-03-22 2:43:15 pm
 * Author: zhanghuancheng555 (1052745517@qq.com)
 * Copyright: 2017 - 2018 Your Company, Your Company
 * -----
 * Last Modified: 2018-05-07 3:30:22 pm
 * Modified By: zhanghuancheng555 (1052745517@qq.com>)
 */

const express = require('express');
const router = express.Router();
const { create, destroy, save, detail, list, studentJoin, studentJoinList, deleteStudentJoin } = require('../controllers/association')

router.post('/create', create);
router.post('/destroy', destroy);
router.post('/save', save);
router.get('/detail', detail);
router.get('/list', list);
router.post('/student-join', studentJoin);
router.get('/student-join-list', studentJoinList);
router.post('/delete-student-join', deleteStudentJoin);


module.exports = router;
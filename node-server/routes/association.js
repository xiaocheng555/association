/*
 * File: association.js
 * File Created: 2018-03-22 2:43:15 pm
 * Author: zhanghuancheng555 (1052745517@qq.com)
 * Copyright: 2017 - 2018 Your Company, Your Company
 * -----
 * Last Modified: 2018-05-08 11:27:47 am
 * Modified By: zhanghuancheng555 (1052745517@qq.com>)
 */

const express = require('express');
const router = express.Router();
const { create, destroy, save, detail, list, studentJoin, studentJoinList, deleteStudentJoin, studentJoinAssoList, studentJoinIdsList } = require('../controllers/association')

router.post('/create', create);
router.post('/destroy', destroy);
router.post('/save', save);
router.get('/detail', detail);
router.get('/list', list);
router.post('/student-join', studentJoin);
router.get('/student-join-list', studentJoinList);
router.post('/delete-student-join', deleteStudentJoin);
router.get('/student-join-asso-list', studentJoinAssoList);
router.get('/student-join-ids-list', studentJoinIdsList);

module.exports = router;
/*
 * File: notice.js
 * File Created: 2018-03-21 12:31:32 pm
 * Author: zhanghuancheng555 (1052745517@qq.com)
 * Copyright: 2017 - 2018 Your Company, Your Company
 * -----
 * Last Modified: 2018-05-08 11:48:46 am
 * Modified By: zhanghuancheng555 (1052745517@qq.com>)
 */

const express = require('express');
const router = express.Router();
const { 
  create, 
  destroy, 
  update, 
  detail, 
  list, 
  approve, 
  submitStudentList, 
  studentJoinList, 
  deleteStudentInList, 
  addStudentInList,
  approveStudentList,
  studentJoinActList,
  studentJoinIds } = require('../controllers/activity');

router.post('/create', create);
router.post('/destroy', destroy);
router.post('/update', update);
router.get('/detail', detail);
router.get('/list', list);
router.post('/approve', approve);
router.post('/approve-student-list', approveStudentList);
router.get('/student-join-list', studentJoinList);
router.post('/delete-student-in-list', deleteStudentInList);
router.post('/add-student-in-list', addStudentInList);
router.get('/student-join-act-list', studentJoinActList);
router.get('/student-join-ids', studentJoinIds);



module.exports = router;
/*
 * File: index.js
 * File Created: 2018-03-19 1:02:42 am
 * Author: zhanghuancheng555 (1052745517@qq.com)
 * Copyright: 2017 - 2018 Your Company, Your Company
 * -----
 * Last Modified: 2018-03-19 12:55:35 pm
 * Modified By: zhanghuancheng555 (1052745517@qq.com>)
 */

const StudentModel = require('./student.js')
const ClassModel = require('./class.js')
const AcademyModel = require('./academy.js')
const GradeModel = require('./grade.js')
const AdminModel = require('./admin.js')
const AssociationModel = require('./association.js')
const DepartmentModel = require('./department.js')
const PositionModel = require('./position.js')
const ActivityModel = require('./activity.js')
const NoticeModel = require('./notice.js')
const LeaveMessageModel = require('./leave-message.js')
const MessageModel = require('./message.js')
const StudentAssociationModel = require('./student-association.js')
const StudentPositionModel = require('./student-position.js')
const StudentActivityModel = require('./student-activity.js')

module.exports = {
  StudentModel,
  ClassModel,
  AcademyModel,
  GradeModel,
  AdminModel,
  AssociationModel,
  DepartmentModel,
  PositionModel,
  ActivityModel,
  NoticeModel,
  LeaveMessageModel,
  MessageModel,
  StudentAssociationModel,
  StudentPositionModel,
  StudentActivityModel
}
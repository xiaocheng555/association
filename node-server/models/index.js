/*
 * File: index.js
 * File Created: 2018-03-19 1:02:42 am
 * Author: zhanghuancheng555 (1052745517@qq.com)
 * Copyright: 2017 - 2018 Your Company, Your Company
 * -----
 * Last Modified: 2018-03-24 7:13:55 pm
 * Modified By: zhanghuancheng555 (1052745517@qq.com>)
 */

const sequelize = require('../db.js').sequelize
const Student = require('./student.js')
const Class = require('./class.js')
const Academy = require('./academy.js')
const Grade = require('./grade.js')
const Admin = require('./admin.js')
const Association = require('./association.js')
const Department = require('./department.js')
const Position = require('./position.js')
const Activity = require('./activity.js')
const Notice = require('./notice.js')
const LeaveMessage = require('./leave-message.js')
const Message = require('./message.js')
const StudentAssociation = require('./student-association.js')
const StudentPosition = require('./student-position.js')
const StudentActivity = require('./student-activity.js')

/* 
 * 建立模型之间的关系
 */
// 一对多
Association.hasMany(Department)
Department.belongsTo(Association)
Association.hasMany(Admin)
Admin.belongsTo(Association)
Admin.hasMany(Notice)
Notice.belongsTo(Admin)
Admin.hasMany(Activity)
Activity.belongsTo(Admin)
Student.hasMany(LeaveMessage)
Admin.hasMany(LeaveMessage)
LeaveMessage.belongsTo(Student)
LeaveMessage.belongsTo(Admin)
// Student.belongsTo(StudentActivity)
// StudentActivity.hasMany(Student)

// 多对多
Association.belongsToMany(Student, { through: StudentAssociation })
Student.belongsToMany(Association, { through: StudentAssociation })
Position.belongsToMany(Student, { through: StudentPosition })
Student.belongsToMany(Position, { through: StudentPosition })
Activity.belongsToMany(Student, { through: StudentActivity })
Student.belongsToMany(Activity, { through: StudentActivity })

// 同步模型到数据库中
sequelize.sync();

module.exports = {
  Student,
  Class,
  Academy,
  Grade,
  Admin,
  Association,
  Department,
  Position,
  Activity,
  Notice,
  LeaveMessage,
  Message,
  StudentAssociation,
  StudentPosition,
  StudentActivity
}
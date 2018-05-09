/*
 * File: breadcrumb-config.js
 * File Created: 2018-03-25 5:55:44 pm
 * Author: zhanghuancheng555 (1052745517@qq.com)
 * Copyright: 2017 - 2018 Your Company, Your Company
 * -----
 * Last Modified: 2018-05-08 11:07:11 am
 * Modified By: zhanghuancheng555 (1052745517@qq.com>)
 */

/*
 * 网站地图导航统一配置
 * 用于面包屑组件
 */
// 首页
const home = { name: '首页', route: 'home' }
// 公告
const notice = { name: '公告', route: 'notice-list' }
const noticeDetail = { name: '公告详情', route: 'notice-detail' }
// 活动
const activity = { name: '活动', route: 'activity-list' }
const activityDetail = { name: '活动详情', route: 'activity-detail' }
// 社团
const association = { name: '社团', route: 'association-list' }
const associationDetail = { name: '社团详情', route: 'association-detail' }
// 个人中心
const user = { name: '个人中心', route: 'user' }
// 后台管理
const AdminNoticeList = { name: '公告管理', route: 'admin-notice-list' }
const NoticeAdd = { name: '添加公告', route: 'notice-add' }
const NoticeEdit = { name: '编辑公告', route: 'notice-edit' }
const AdminActivityList = { name: '活动管理', route: 'admin-activity-list' }
const AdminActivityApprove = { name: '活动审批', route: 'activity-approve' }
const AdminActivityApproveActivity = { name: '审批活动', route: 'activity-approve-activity-detail' }
const AdminActivityApproveStudent = { name: '审批学生名单', route: 'activity-approve-student-detail' }
const ActivityAdd = { name: '添加活动', route: 'activity-add' }
const ActivityEdit = { name: '编辑活动', route: 'activity-edit' }
const AdminActivityDetail = { name: '活动详情', route: 'admin-activity-detail' }
const ActivityStudentList = { name: '学生名单', route: 'activity-student-list' }
const ActivityStudentConfirm = { name: '确立名单', route: 'activity-student-confirm' }
const AdminAssociationList = { name: '社团管理', route: 'admin-association-list' }
const AdminMemberList = { name: '社团管理', route: 'admin-association-manage_member-list' }
const AdminDepartmentList = { name: '社团管理', route: 'admin-association-manage_department-list' }
const AdminAssociationAdd = { name: '社团管理', route: 'admin-association-add' }
const AdminDepartmentAdd = { name: '添加部门', route: 'admin-department-add' }
const AdminDepartmentEdit = { name: '编辑部门', route: 'admin-department-edit' }

export default {
  'home': [home],
  'notice-list': [home, notice],
  'notice-detail': [home, notice, noticeDetail],
  'activity-list': [home, activity],
  'activity-detail': [home, activity, activityDetail],
  'association-list': [home, association],
  'association-detail': [home, association, associationDetail],
  'user': [home, user],
  'user-info': [home, user],
  'user-join-activity': [home, user],
  'user-join-association': [home, user],
  'user-change-password': [home, user],
  // 后台管理
  'admin-notice-list': [home, AdminNoticeList],
  'notice-add': [home, AdminNoticeList, NoticeAdd],
  'notice-edit': [home, AdminNoticeList, NoticeEdit],
  'admin-activity-list': [home, AdminActivityList],
  'activity-add': [home, AdminActivityList, ActivityAdd],
  'activity-edit': [home, AdminActivityList, ActivityEdit],
  'admin-activity-detail': [home, AdminActivityList, AdminActivityDetail],
  'activity-student-list': [home, AdminActivityList, ActivityStudentList],
  'activity-student-confirm': [home, AdminActivityList, ActivityStudentConfirm],
  'activity-approve': [home, AdminActivityApprove],
  'activity-approve-activity-detail': [home, AdminActivityApprove, AdminActivityApproveActivity],
  'activity-approve-student-detail': [home, AdminActivityApprove, AdminActivityApproveStudent],
  'admin-association-list': [home, AdminAssociationList],
  'admin-association-manage_member-list': [home, AdminMemberList],
  'admin-association-manage_department-list': [home, AdminDepartmentList],
  'admin-association-add': [home, AdminAssociationAdd],
  'admin-department-add': [home, AdminDepartmentList, AdminDepartmentAdd],
  'admin-department-edit': [home, AdminDepartmentList, AdminDepartmentEdit]
}

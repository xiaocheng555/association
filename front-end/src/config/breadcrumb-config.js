/*
 * File: breadcrumb-config.js
 * File Created: 2018-03-25 5:55:44 pm
 * Author: zhanghuancheng555 (1052745517@qq.com)
 * Copyright: 2017 - 2018 Your Company, Your Company
 * -----
 * Last Modified: 2018-05-03 7:36:16 pm
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
// 后台管理
const AdminNoticeList = { name: '公告管理', route: 'admin-notice-list' }
const NoticeAdd = { name: '添加公告', route: 'notice-add' }
const NoticeEdit = { name: '编辑公告', route: 'notice-edit' }
const AdminActivityList = { name: '活动管理', route: 'admin-activity-list' }
const ActivityAdd = { name: '添加活动', route: 'activity-add' }
const ActivityEdit = { name: '编辑活动', route: 'activity-edit' }
const AdminAssociationList = { name: '社团管理', route: 'admin-association-list' }

export default {
  'home': [home],
  'notice-list': [home, notice],
  'notice-detail': [home, notice, noticeDetail],
  'activity-list': [home, activity],
  'activity-detail': [home, activity, activityDetail],
  'association-list': [home, association],
  // 后台管理
  'admin-notice-list': [home, AdminNoticeList],
  'notice-add': [home, AdminNoticeList, NoticeAdd],
  'notice-edit': [home, AdminNoticeList, NoticeEdit],
  'admin-activity-list': [home, AdminActivityList],
  'activity-add': [home, AdminActivityList, ActivityAdd],
  'activity-edit': [home, AdminActivityList, ActivityEdit],
  'admin-association-list': [home, AdminAssociationList]
}

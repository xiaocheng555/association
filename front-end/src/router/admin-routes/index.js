/*
 * File: index.js
 * File Created: 2018-03-28 11:00:54 pm
 * Author: zhanghuancheng555 (1052745517@qq.com)
 * Copyright: 2017 - 2018 Your Company, Your Company
 * -----
 * Last Modified: 2018-05-04 1:14:04 am
 * Modified By: zhanghuancheng555 (1052745517@qq.com>)
 */

const noticeList = () => import('@admin/notice/list')
const noticeAdd = () => import('@admin/notice/add')
const noticeEdit = () => import('@admin/notice/edit')
const activityList = () => import('@admin/activity/list')
const activityDetail = () => import('@admin/activity/detail')
const activityAdd = () => import('@admin/activity/add')
const activityEdit = () => import('@admin/activity/edit')
const activityApproveList = () => import('@admin/activity/approve/list')
const activityApproveDetail = () => import('@admin/activity/approve/detail')
const associationList = () => import('@admin/association/list')

export default [
  {
    name: 'admin-notice-list',
    path: '/admin/notice-list',
    component: noticeList
  },
  {
    name: 'notice-add',
    path: '/admin/notice-add',
    component: noticeAdd
  },
  {
    name: 'notice-edit',
    path: '/admin/notice-edit',
    component: noticeEdit,
    props: (route) => ({
      noticeId: Number(route.query.id)
    })
  },
  {
    name: 'admin-activity-list',
    path: '/admin/activity-list',
    component: activityList
  },
  {
    name: 'admin-activity-detail',
    path: '/admin/activity-detail',
    component: activityDetail,
    props: (route) => ({
      actId: Number(route.query.id)
    })
  },
  {
    name: 'activity-add',
    path: '/admin/activity/add',
    component: activityAdd
  },
  {
    name: 'activity-edit',
    path: '/admin/activity/edit',
    component: activityEdit,
    props: (route) => ({
      actId: Number(route.query.id)
    })
  },
  {
    name: 'activity-approve-list',
    path: '/admin/activity/approve/list',
    component: activityApproveList
  },
  {
    name: 'activity-approve-detail',
    path: '/admin/activity/approve/detail',
    component: activityApproveDetail
  },
  {
    name: 'admin-association-list',
    path: '/admin/association-list',
    component: associationList
  }
]

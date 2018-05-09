/*
 * File: index.js
 * File Created: 2018-03-28 11:00:54 pm
 * Author: zhanghuancheng555 (1052745517@qq.com)
 * Copyright: 2017 - 2018 Your Company, Your Company
 * -----
 * Last Modified: 2018-05-07 5:14:32 pm
 * Modified By: zhanghuancheng555 (1052745517@qq.com>)
 */

const noticeList = () => import('@admin/notice/list')
const noticeAdd = () => import('@admin/notice/add')
const noticeEdit = () => import('@admin/notice/edit')
const activityList = () => import('@admin/activity/list')
const activityDetail = () => import('@admin/activity/detail')
const activityAdd = () => import('@admin/activity/add')
const activityEdit = () => import('@admin/activity/edit')
const activityApprove = () => import('@admin/activity/approve')
const activityApproveActivityDetail = () => import('@admin/activity/approve/approve-activity-detail')
const activityApproveStudentDetail = () => import('@admin/activity/approve/approve-student-detail')
const activityStudentConfirm = () => import('@admin/activity/student-confirm')
const activityStudentList = () => import('@admin/activity/student-list')
const associationAdd = () => import('@admin/association/add')
const associationManage = () => import('@admin/association/manage')
const associationMemberList = () => import('@admin/association/manage/member-list')
const associationDepartmentList = () => import('@admin/association/manage/department-list')
const departmentAdd = () => import('@admin/association/dept-add')
const departmentEdit = () => import('@admin/association/dept-edit')

export default [
  {
    name: 'admin-notice-list',
    path: '/admin/notice/list',
    component: noticeList
  },
  {
    name: 'notice-add',
    path: '/admin/notice/add',
    component: noticeAdd
  },
  {
    name: 'notice-edit',
    path: '/admin/notice/edit',
    component: noticeEdit,
    props: (route) => ({
      noticeId: Number(route.query.id)
    })
  },
  {
    name: 'admin-activity-list',
    path: '/admin/activity/list',
    component: activityList
  },
  {
    name: 'admin-activity-detail',
    path: '/admin/activity/detail',
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
    name: 'activity-approve',
    path: '/admin/activity/approve',
    component: activityApprove
  },
  {
    name: 'activity-approve-activity-detail',
    path: '/admin/activity/approve-activity-detail',
    component: activityApproveActivityDetail
  },
  {
    name: 'activity-approve-student-detail',
    path: '/admin/activity/approve-student-list-detail',
    component: activityApproveStudentDetail
  },
  {
    name: 'activity-student-confirm',
    path: '/admin/activity/student-confirm',
    component: activityStudentConfirm,
    props: (route) => ({
      actId: Number(route.query.id)
    })
  },
  {
    name: 'activity-student-list',
    path: '/admin/activity/student-list',
    component: activityStudentList,
    props: (route) => ({
      actId: Number(route.query.id)
    })
  },
  {
    name: 'admin-association-add',
    path: '/admin/association/add',
    component: associationAdd
  },
  {
    name: 'admin-association-manage',
    path: '/admin/association/manage',
    component: associationManage,
    redirect: {
      name: 'admin-association-manage_member-list'
    },
    children: [
      {
        name: 'admin-association-manage_member-list',
        path: '/admin/association/manage/member-list',
        component: associationMemberList
      },
      {
        name: 'admin-association-manage_department-list',
        path: '/admin/association/manage/department-list',
        component: associationDepartmentList
      }
    ]
  },
  {
    name: 'admin-department-add',
    path: '/admin/association/department/add',
    component: departmentAdd
  },
  {
    name: 'admin-department-edit',
    path: '/admin/association/department/edit',
    component: departmentEdit,
    props: (route) => ({
      departmentId: Number(route.query.departmentId)
    })
  }
]

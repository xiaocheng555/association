/*
 * File: association.js
 * File Created: 2018-03-28 8:36:06 pm
 * Author: zhanghuancheng555 (1052745517@qq.com)
 * Copyright: 2017 - 2018 Your Company, Your Company
 * -----
 * Last Modified: 2018-05-07 4:28:37 pm
 * Modified By: zhanghuancheng555 (1052745517@qq.com>)
 */
const associationList = () => import('@pages/association/list')
const associationDetail = () => import('@pages/association/detail')
const associationDeptDetail = () => import('@pages/association/dept-detail')

export default [
  {
    path: '/association/list',
    name: 'association-list',
    component: associationList
  },
  {
    path: '/association/detail',
    name: 'association-detail',
    component: associationDetail,
    props: (route) => ({
      assoId: Number(route.query.id),
      assoName: route.query.name
    })
  },
  {
    path: '/association/dept-detail',
    name: 'association-dept-detail',
    component: associationDeptDetail
  }
]

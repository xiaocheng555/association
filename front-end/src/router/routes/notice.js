/*
 * File: notice.js
 * File Created: 2018-03-25 5:44:47 pm
 * Author: zhanghuancheng555 (1052745517@qq.com)
 * Copyright: 2017 - 2018 Your Company, Your Company
 * -----
 * Last Modified: 2018-04-02 1:02:48 pm
 * Modified By: zhanghuancheng555 (1052745517@qq.com>)
 */

const noticeList = () => import('@pages/notice/list')
const noticeDetail = () => import('@pages/notice/detail')

export default [
  {
    path: '/notice/list',
    name: 'notice-list',
    component: noticeList
  },
  {
    path: '/notice/detail',
    name: 'notice-detail',
    component: noticeDetail
  }
]

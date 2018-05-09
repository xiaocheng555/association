/*
 * File: user.js
 * File Created: 2018-05-06 6:12:05 pm
 * Author: zhanghuancheng555 (1052745517@qq.com)
 * Copyright: 2017 - 2018 Your Company, Your Company
 * -----
 * Last Modified: 2018-05-08 7:32:53 pm
 * Modified By: zhanghuancheng555 (1052745517@qq.com>)
 */

const UserIndex = () => import('@pages/user/index')
const UserInfo = () => import('@pages/user/user-info')
const UserJoinActivity = () => import('@pages/user/user-join-activity')
const UserJoinAssociation = () => import('@pages/user/user-join-association')
const UserChangePassword = () => import('@pages/user/user-change-password')

export default [
  {
    name: 'user',
    path: '/user',
    component: UserIndex,
    redirect: {
      name: 'user-info',
      query: {
        state: 'info'
      }
    },
    children: [
      {
        name: 'user-info',
        path: '/user/info',
        component: UserInfo
      },
      {
        name: 'user-join-activity',
        path: '/user/join-activity',
        component: UserJoinActivity
      },
      {
        name: 'user-join-association',
        path: '/user/join-association',
        component: UserJoinAssociation
      },
      {
        name: 'user-change-password',
        path: '/user/change-password',
        component: UserChangePassword
      }
    ]
  }
]

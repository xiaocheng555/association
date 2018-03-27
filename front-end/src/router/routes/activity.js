/*
 * File: activity.js
 * File Created: 2018-03-27 10:42:05 pm
 * Author: zhanghuancheng555 (1052745517@qq.com)
 * Copyright: 2017 - 2018 Your Company, Your Company
 * -----
 * Last Modified: 2018-03-27 10:46:02 pm
 * Modified By: zhanghuancheng555 (1052745517@qq.com>)
 */

const activityList = () => import('@pages/activity/list')

export default [
  {
    path: '/activity/list',
    name: 'activity-list',
    component: activityList
  }
]

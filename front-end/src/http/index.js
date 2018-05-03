/*
 * File: index.js
 * File Created: 2018-03-28 8:42:28 pm
 * Author: zhanghuancheng555 (1052745517@qq.com)
 * Copyright: 2017 - 2018 Your Company, Your Company
 * -----
 * Last Modified: 2018-03-28 9:10:01 pm
 * Modified By: zhanghuancheng555 (1052745517@qq.com>)
 */

import noticeApi from './api/notice'
import activityApi from './api/activity'
import associationApi from './api/association'
import studentApi from './api/student'
import adminApi from './api/admin'
import positionApi from './api/position'
import leaveMessage from './api/leave-message'

export default Array.prototype.concat(
  noticeApi,
  activityApi,
  associationApi,
  studentApi,
  adminApi,
  positionApi,
  leaveMessage)

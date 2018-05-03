/*
 * File: student.js
 * File Created: 2018-03-28 8:42:54 pm
 * Author: zhanghuancheng555 (1052745517@qq.com)
 * Copyright: 2017 - 2018 Your Company, Your Company
 * -----
 * Last Modified: 2018-03-28 9:04:25 pm
 * Modified By: zhanghuancheng555 (1052745517@qq.com>)
 */
import _config from '@/config/base'

export default [
  {
    name: 'student-login',
    config: {
      url: _config['server-host'] + 'student/login',
      method: 'post'
    }
  },
  {
    name: 'student-filter-info',
    config: {
      url: _config['server-host'] + 'student/filter-info',
      method: 'post'
    }
  }
]

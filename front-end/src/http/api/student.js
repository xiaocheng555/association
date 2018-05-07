/*
 * File: student.js
 * File Created: 2018-03-28 8:42:54 pm
 * Author: zhanghuancheng555 (1052745517@qq.com)
 * Copyright: 2017 - 2018 Your Company, Your Company
 * -----
 * Last Modified: 2018-05-06 10:13:36 pm
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
  },
  {
    name: 'student-search',
    config: {
      url: _config['server-host'] + 'student/search',
      method: 'get'
    }
  },
  {
    name: 'student-detail',
    config: {
      url: _config['server-host'] + 'student/detail',
      method: 'get'
    }
  },
  {
    name: 'student-change-password',
    config: {
      url: _config['server-host'] + 'student/change-password',
      method: 'post'
    }
  }
]

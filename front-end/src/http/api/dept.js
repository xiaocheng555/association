/*
 * File: department.js
 * File Created: 2018-03-28 8:42:39 pm
 * Author: zhanghuancheng555 (1052745517@qq.com)
 * Copyright: 2017 - 2018 Your Company, Your Company
 * -----
 * Last Modified: 2018-05-07 2:46:06 pm
 * Modified By: zhanghuancheng555 (1052745517@qq.com>)
 */

import _config from '@/config/base'

export default [
  {
    name: 'department-list',
    config: {
      url: _config['server-host'] + 'department/list',
      method: 'get'
    }
  },
  {
    name: 'department-detail',
    config: {
      url: _config['server-host'] + 'department/detail',
      method: 'get'
    }
  },
  {
    name: 'department-create',
    config: {
      url: _config['server-host'] + 'department/create',
      method: 'post'
    }
  },
  {
    name: 'department-save',
    config: {
      url: _config['server-host'] + 'department/save',
      method: 'post'
    }
  },
  {
    name: 'department-destroy',
    config: {
      url: _config['server-host'] + 'department/destroy',
      method: 'post'
    }
  }
]

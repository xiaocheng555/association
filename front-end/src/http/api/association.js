/*
 * File: association.js
 * File Created: 2018-03-28 8:42:34 pm
 * Author: zhanghuancheng555 (1052745517@qq.com)
 * Copyright: 2017 - 2018 Your Company, Your Company
 * -----
 * Last Modified: 2018-05-07 3:31:18 pm
 * Modified By: zhanghuancheng555 (1052745517@qq.com>)
 */

import _config from '@/config/base'

export default [
  {
    name: 'association-create',
    config: {
      url: _config['server-host'] + 'association/create',
      method: 'post'
    }
  },
  {
    name: 'association-save',
    config: {
      url: _config['server-host'] + 'association/save',
      method: 'post'
    }
  },
  {
    name: 'association-destroy',
    config: {
      url: _config['server-host'] + 'association/destroy',
      method: 'post'
    }
  },
  {
    name: 'association-detail',
    config: {
      url: _config['server-host'] + 'association/detail',
      method: 'get'
    }
  },
  {
    name: 'association-list',
    config: {
      url: _config['server-host'] + 'association/list',
      method: 'get'
    }
  },
  {
    name: 'association-student-join',
    config: {
      url: _config['server-host'] + 'association/student-join',
      method: 'post'
    }
  },
  {
    name: 'association-student-join-list',
    config: {
      url: _config['server-host'] + 'association/student-join-list',
      method: 'get'
    }
  },
  {
    name: 'association-delete-student-join',
    config: {
      url: _config['server-host'] + 'association/delete-student-join',
      method: 'post'
    }
  }
]

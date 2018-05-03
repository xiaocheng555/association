/*
 * File: admin.js
 * File Created: 2018-03-28 8:42:59 pm
 * Author: zhanghuancheng555 (1052745517@qq.com)
 * Copyright: 2017 - 2018 Your Company, Your Company
 * -----
 * Last Modified: 2018-03-28 10:36:12 pm
 * Modified By: zhanghuancheng555 (1052745517@qq.com>)
 */

import _config from '@/config/base'

export default [
  {
    name: 'admin-create',
    config: {
      url: _config['server-host'] + 'admin/create',
      method: 'post'
    }
  },
  {
    name: 'admin-destroy',
    config: {
      url: _config['server-host'] + 'admin/destroy',
      method: 'post'
    }
  },
  {
    name: 'admin-update',
    config: {
      url: _config['server-host'] + 'admin/update',
      method: 'post'
    }
  },
  {
    name: 'admin-login',
    config: {
      url: _config['server-host'] + 'admin/login',
      method: 'post'
    }
  },
  {
    name: 'admin-list',
    config: {
      url: _config['server-host'] + 'admin/list',
      method: 'get'
    }
  },
  {
    name: 'admin-detail',
    config: {
      url: _config['server-host'] + 'admin/detail',
      method: 'post'
    }
  }
]

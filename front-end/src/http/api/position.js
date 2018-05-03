/*
 * File: position.js
 * File Created: 2018-03-28 9:04:34 pm
 * Author: zhanghuancheng555 (1052745517@qq.com)
 * Copyright: 2017 - 2018 Your Company, Your Company
 * -----
 * Last Modified: 2018-03-28 9:06:16 pm
 * Modified By: zhanghuancheng555 (1052745517@qq.com>)
 */

import _config from '@/config/base'

export default [
  {
    name: 'position-create',
    config: {
      url: _config['server-host'] + 'position/create',
      method: 'post'
    }
  },
  {
    name: 'position-save',
    config: {
      url: _config['server-host'] + 'position/save',
      method: 'post'
    }
  },
  {
    name: 'position-destroy',
    config: {
      url: _config['server-host'] + 'position/destroy',
      method: 'post'
    }
  },
  {
    name: 'position-detail',
    config: {
      url: _config['server-host'] + 'position/detail',
      method: 'get'
    }
  },
  {
    name: 'position-list',
    config: {
      url: _config['server-host'] + 'position/list',
      method: 'get'
    }
  }
]

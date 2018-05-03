/*
 * File: notice.js
 * File Created: 2018-03-28 8:42:39 pm
 * Author: zhanghuancheng555 (1052745517@qq.com)
 * Copyright: 2017 - 2018 Your Company, Your Company
 * -----
 * Last Modified: 2018-05-02 4:49:00 pm
 * Modified By: zhanghuancheng555 (1052745517@qq.com>)
 */

import _config from '@/config/base'

export default [
  {
    name: 'notice-list',
    config: {
      url: _config['server-host'] + 'notice/list',
      method: 'get'
    }
  },
  {
    name: 'notice-detail',
    config: {
      url: _config['server-host'] + 'notice/detail',
      method: 'get'
    }
  },
  {
    name: 'notice-create',
    config: {
      url: _config['server-host'] + 'notice/create',
      method: 'post'
    }
  },
  {
    name: 'notice-update',
    config: {
      url: _config['server-host'] + 'notice/update',
      method: 'post'
    }
  },
  {
    name: 'notice-destroy',
    config: {
      url: _config['server-host'] + 'notice/destroy',
      method: 'post'
    }
  }
]

/*
 * File: leave-message.js
 * File Created: 2018-03-28 9:06:48 pm
 * Author: zhanghuancheng555 (1052745517@qq.com)
 * Copyright: 2017 - 2018 Your Company, Your Company
 * -----
 * Last Modified: 2018-03-28 9:08:28 pm
 * Modified By: zhanghuancheng555 (1052745517@qq.com>)
 */

import _config from '@/config/base'

export default [
  {
    name: 'leave-message-create',
    config: {
      url: _config['server-host'] + 'leave-messgae/create',
      methode: 'post'
    }
  },
  {
    name: 'leave-message-destroy',
    config: {
      url: _config['server-host'] + 'leave-messgae/destroy',
      methode: 'post'
    }
  },
  {
    name: 'leave-message-list',
    config: {
      url: _config['server-host'] + 'leave-messgae/list',
      methode: 'get'
    }
  }
]

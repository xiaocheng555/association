/*
 * File: activity.js
 * File Created: 2018-03-28 8:42:49 pm
 * Author: zhanghuancheng555 (1052745517@qq.com)
 * Copyright: 2017 - 2018 Your Company, Your Company
 * -----
 * Last Modified: 2018-05-04 4:09:55 pm
 * Modified By: zhanghuancheng555 (1052745517@qq.com>)
 */

import _config from '@/config/base'

export default [
  {
    name: 'activity-create',
    config: {
      url: _config['server-host'] + 'activity/create',
      method: 'post'
    }
  },
  {
    name: 'activity-update',
    config: {
      url: _config['server-host'] + 'activity/update',
      method: 'post'
    }
  },
  {
    name: 'activity-destroy',
    config: {
      url: _config['server-host'] + 'activity/destroy',
      method: 'post'
    }
  },
  {
    name: 'activity-detail',
    config: {
      url: _config['server-host'] + 'activity/detail',
      method: 'get'
    }
  },
  {
    name: 'activity-list',
    config: {
      url: _config['server-host'] + 'activity/list',
      method: 'get'
    }
  },
  {
    name: 'activity-approve',
    config: {
      url: _config['server-host'] + 'activity/approve',
      method: 'post'
    }
  },
  {
    name: 'activity-student-join-list',
    config: {
      url: _config['server-host'] + 'activity/student-join-list',
      method: 'get'
    }
  },
  {
    name: 'activity-delete-student-in-list',
    config: {
      url: _config['server-host'] + 'activity/delete-student-in-list',
      method: 'post'
    }
  },
  {
    name: 'activity-add-student-in-list',
    config: {
      url: _config['server-host'] + 'activity/add-student-in-list',
      method: 'post'
    }
  },
  {
    name: 'activity-approve-student-list',
    config: {
      url: _config['server-host'] + 'activity/approve-student-list',
      method: 'post'
    }
  }
]

/*
 * File: index.js
 * File Created: 2018-02-25 12:22:01 am
 * Author: zhanghuancheng555 (1052745517@qq.com)
 * Copyright: 2017 - 2018 Your Company, Your Company
 * -----
 * Last Modified: 2018-03-27 10:46:39 pm
 * Modified By: zhanghuancheng555 (1052745517@qq.com>)
 */

import Vue from 'vue'
import Router from 'vue-router'
import HomeRoutes from './routes/home'
import ErrorRoutes from './routes/error'
import NoticeRoutes from './routes/notice'
import ActivityRoutes from './routes/activity'

Vue.use(Router)

const routes = Array.prototype.concat([
  {
    path: '/',
    name: 'app'
  }
], HomeRoutes, ErrorRoutes, NoticeRoutes, ActivityRoutes)

routes.push({
  path: '*',
  redirect: {
    name: 'error-page'
  }
})

export default new Router({ routes })

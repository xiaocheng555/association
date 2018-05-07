/*
 * File: index.js
 * File Created: 2018-02-25 12:22:01 am
 * Author: zhanghuancheng555 (1052745517@qq.com)
 * Copyright: 2017 - 2018 Your Company, Your Company
 * -----
 * Last Modified: 2018-05-06 6:14:39 pm
 * Modified By: zhanghuancheng555 (1052745517@qq.com>)
 */

import Vue from 'vue'
import Router from 'vue-router'
import HomeRoutes from './routes/home'
import ErrorRoutes from './routes/error'
import NoticeRoutes from './routes/notice'
import ActivityRoutes from './routes/activity'
import UserRoutes from './routes/user'
import AssociationRoutes from './routes/association'
import AdminRoutes from './admin-routes'

Vue.use(Router)

const routes = Array.prototype.concat([
  {
    path: '/',
    redirect: {
      name: 'home'
    }
  }
],
HomeRoutes,
ErrorRoutes,
NoticeRoutes,
ActivityRoutes,
UserRoutes,
AssociationRoutes,
AdminRoutes)

routes.push({
  path: '*',
  redirect: {
    name: 'error-page'
  }
})

export default new Router({ routes })

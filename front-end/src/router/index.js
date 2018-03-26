/*
 * File: index.js
 * File Created: 2018-02-25 12:22:01 am
 * Author: zhanghuancheng555 (1052745517@qq.com)
 * Copyright: 2017 - 2018 Your Company, Your Company
 * -----
 * Last Modified: 2018-03-25 5:48:31 pm
 * Modified By: zhanghuancheng555 (1052745517@qq.com>)
 */

import Vue from 'vue'
import Router from 'vue-router'
import HomeRoutes from './routes/home'
import NoticeRoutes from './routes/notice'

Vue.use(Router)

const routes = Array.prototype.concat([
  {
    path: '/',
    redirect: {
      name: 'home'
    }
  }
], HomeRoutes, NoticeRoutes)

routes.push({
  path: '*',
  redirect: {
    name: 'home'
  }
})

export default new Router({ routes })

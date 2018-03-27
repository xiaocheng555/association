/*
 * File: breadcrumb-config.js
 * File Created: 2018-03-25 5:55:44 pm
 * Author: zhanghuancheng555 (1052745517@qq.com)
 * Copyright: 2017 - 2018 Your Company, Your Company
 * -----
 * Last Modified: 2018-03-27 10:48:37 pm
 * Modified By: zhanghuancheng555 (1052745517@qq.com>)
 */

/*
 * 网站地图导航统一配置
 * 用于面包屑组件
 */
// 首页
const home = { name: '首页', route: 'home' }
// 公告
const notice = { name: '公告', route: 'notice-list' }
// 活动
const activity = { name: '活动', route: 'notice-list' }

export default {
  'home': [home],
  'notice-list': [home, notice],
  'activity-list': [home, activity]
}

/*
 * File: association.js
 * File Created: 2018-03-28 8:36:06 pm
 * Author: zhanghuancheng555 (1052745517@qq.com)
 * Copyright: 2017 - 2018 Your Company, Your Company
 * -----
 * Last Modified: 2018-03-28 9:15:48 pm
 * Modified By: zhanghuancheng555 (1052745517@qq.com>)
 */
const associationList = () => import('@pages/association/list')

export default [{
  path: '/association/list',
  name: 'association-list',
  component: associationList
}]

/*
 * File: error.js
 * File Created: 2018-03-27 10:41:58 pm
 * Author: zhanghuancheng555 (1052745517@qq.com)
 * Copyright: 2017 - 2018 Your Company, Your Company
 * -----
 * Last Modified: 2018-03-27 10:45:13 pm
 * Modified By: zhanghuancheng555 (1052745517@qq.com>)
 */

const errorPage = () => import('@pages/error')

export default [{
  path: '/error',
  name: 'error-page',
  component: errorPage
}]

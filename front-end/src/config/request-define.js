/**
 * File: 系统请求事件注册文件
 * File Created: 2018-02-28 1:30:10 pm
 * Author: wangji (ji1.wang@meicloud.com)
 * Copyright: 2017 - 2018 Copyright (c), 深圳美云智数科技有限公司
 * -----
 * Last Modified: 2018-03-05 4:36:34 pm
 * Modified By: wangji (ji1.wang@meicloud.com)
 */
import Vue from 'vue'
import { MxHttpService } from 'mx-ui'
import _config from 'shared@/config'

Vue.use(MxHttpService)

// 默认请求配置
const requestsDefine = [
  {
    name: 'apiv2-organization-emp',
    config: {
      url: _config['server-host'] + 'imm-api/apiv2/organization/emp',
      method: 'get'
    }
  }
]

// 初始化全局请求拦截器
MxHttpService.bootstrap({
  beforeSend: config => {
    console.log('beforeSend', 'bootstrap')
    return config
  },
  dataFilter: (response, config) => {
    console.log('dataFilter', 'bootstrap')
    // 只处理响应状态吗为 200 时的返回数据
    if (response.status === 200) return response.data
    return null
  },
  success: (response, config) => {
    console.log('success', 'bootstrap')
    if (response.status === 200) {
      // 如果返回的数据 code 码异常，则提示服务端信息
      if (response.data.code !== 1) {
        if (Vue.prototype.$_appToast) Vue.prototype.$_appToast(response.data.msg)
      }
    } else {
      // 如果请求状态不是 200 则提示异常
      if (Vue.prototype.$_appToast) Vue.prototype.$_appToast('请求状态异常: ', response.status)
    }
  },
  error: (error, config) => {
    console.log('error', 'bootstrap')
    if (Vue.prototype.$_appToast) Vue.prototype.$_appToast('请求服务出错: ', error)
  },
  complete: (response, config) => {
    console.log('complete', 'bootstrap')
  }
})

/**
 * @description 混合全局请求配置对象
 * @param {Object} context - vuex 的 store 的复制对象
 * @param {Object} config - httpServes 的配置对象
 * @param {number} mode - 混合方式，1表示混合 accessToken，默认为1
 */
function mixinRequestConfig (context, config, mode) {
  switch (mode) {
    case 1 || undefined :
      if (config === undefined || config === null) config = {}
      // 往 headers 中混合 accessToken
      config.headers = Object.assign({
        accessToken: context.state.userInfo.accessToken
      }, config.headers || {})
      break
  }
  return config
}

/**
 * @description 注入请求定义对象
 * @param {Array} requests- 请求定义对象
 * @param {string} request.name - 请求标识名
 * @param {string} request.mode - 请求模式(参考mixinRequestConfig的mode参数)
 * @param {string} request.config - 请求事件配置对象
 */
function injectRequestsDefine (requestsDefine) {
  // 系统存储请求定义对象
  const requestsActions = {}
  // 解析请求定义对象
  requestsDefine.forEach((request) => {
    if (request && request.name && request.config) {
      if (requestsActions[request.name] === undefined) {
        requestsActions[request.name] = (context, config) => {
          const requestConfig = Object.assign(request.config, config)
          return MxHttpService.request(mixinRequestConfig(context, requestConfig, request.mode))
        }
      } else {
        console.error('requests-define', 'injectRequestsDefine', '请求定义对象已经存在', 'request: ', request)
      }
    } else {
      console.error('requests-define', 'injectRequestsDefine', '请求定义对象格式不正确', 'request: ', request)
    }
  })
  return requestsActions
}

export default injectRequestsDefine(requestsDefine)
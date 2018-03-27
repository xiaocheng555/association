/**
 * File: mx-http-service
 * File Created: 2018-02-24 9:42:10 am
 * Author: wangji (ji1.wang@meicloud.com)
 * Copyright: 2017 - 2018 Copyright (c), 深圳美云智数科技有限公司
 * -----
 * Last Modified: 2018-03-05 8:17:58 pm
 * Modified By: wangji (ji1.wang@meicloud.com)
 */
import axios from 'axios'

class MxHttpService {
  constructor () {
    // 检测axios依赖
    if (typeof axios !== 'function') {
      console.error('mx-http-service', '相关依赖axios不存在')
      return false
    }
  }

  /**
   * @description 在发送请求之前调用
   * @param {Object} config - 请求配置对象
   * @example (config) => config
   */
  get beforeSend () {
    if (typeof this._beforeSend === 'function') return this._beforeSend
    return null
  }

  /**
   * @description 在请求成功时 promise.resolve 执行之前调用
   * @param {Object} response - 请求成功返回的响应对象
   * @param {Object} config - 请求配置对象
   * @example (response, config) => response
   */
  get dataFilter () {
    if (typeof this._dataFilter === 'function') return this._dataFilter
    return null
  }

  /**
   * @description 在请求成功时 promise.resolve 执行之后调用
   * @param {Object} response - 请求成功返回的响应对象
   * @param {Object} config - 请求配置对象
   * @example (response, config) => response
   */
  get success () {
    if (typeof this._success === 'function') return this._success
    return null
  }

  /**
   * @description 在请求失败时 promise.reject 执行之后调用
   * @param {Object} error - 在请求失败返回的错误对象
   * @param {Object} config - 请求配置对象
   * @example (error, config) => error
   */
  get error () {
    if (typeof this._error === 'function') return this._error
    return null
  }

  /**
   * @description 当请求完成之后即 success 和 error 事件执行之后调用
   * @param {Object} response - 请求完返回的响应对象
   * @param {Object} config - 请求配置对象
   * @example (response, config) => response
   */
  get complete () {
    if (typeof this._complete === 'function') return this._complete
    return null
  }

  /**
   * @description 引导注册 http-serve 的相关回调函数事件
   * @param {Object} callbackObj - 包含相关回调函数的配置对象
   */
  bootstrap (callbackObj) {
    if (callbackObj) {
      this._beforeSend = callbackObj.beforeSend
      this._dataFilter = callbackObj.dataFilter
      this._success = callbackObj.success
      this._error = callbackObj.error
      this._complete = callbackObj.complete
    }
  }

  /**
   * @description 封装axios发送http请求的方法
   * @param {Object} config - 发送请求的配置项，参考 axios 的相关文档
   * @param {Function} config.beforeSend - 在默认 beforeSend 事件前执行
   * @param {Function} config.dataFilter - 在默认 dataFilter 事件前执行
   * @param {Function} config.success - 在默认 success 事件前执行
   * @param {Function} config.error - 在默认 error 事件前执行
   * @param {Function} config.complete - 在默认 complete 事件前执行
   * @param {Function} config.beforeSendIsBoot - 是否执行默认的 beforeSend 事件，默认执行
   * @param {Function} config.dataFilterIsBoot - 是否执行默认的 dataFilter 事件，默认执行
   * @param {Function} config.successIsBoot - 是否执行默认的 success 事件，默认执行
   * @param {Function} config.errorIsBoot - 是否执行默认的 error 事件，默认执行
   * @param {Function} config.completeIsBoot - 是否执行默认的 complete 事件，默认执行
   */
  request (config) {
    // config 对象不能为 null
    if (config === undefined || config === null) return config
    // 初始化请求事件各阶段的回调函数
    let _beforeSend = typeof config.beforeSend === 'function' ? config.beforeSend : null
    let _dataFilter = typeof config.dataFilter === 'function' ? config.dataFilter : null
    let _success = typeof config.success === 'function' ? config.success : null
    let _error = typeof config.error === 'function' ? config.error : null
    let _complete = typeof config.complete === 'function' ? config.complete : null
    // 初始化请求事件各阶段的相关配置
    let _beforeSendIsBoot = config.beforeSendIsBoot === undefined ? true : config.beforeSendIsBoot
    let _dataFilterIsBoot = config.dataFilterIsBoot === undefined ? true : config.dataFilterIsBoot
    let _successIsBoot = config.successIsBoot === undefined ? true : config.successIsBoot
    let _errorIsBoot = config.errorIsBoot === undefined ? true : config.errorIsBoot
    let _completeIsBoot = config.completeIsBoot === undefined ? true : config.completeIsBoot
    // 返回请求事件的 Promise 对象
    const _this = this
    return new Promise((resolve, reject) => {
      // 执行自定义 beforeSend 事件
      if (_beforeSend) config = _beforeSend(config)
      // 如果自定义 beforeSend 事件返回 false 则表示阻止本次请求
      if (config === false) return config
      // 执行默认 beforeSend 事件
      if (_this.beforeSend && _beforeSendIsBoot) config = _this.beforeSend(config)
      // 如果默认 beforeSend 事件返回 false 则表示阻止本次请求
      if (config === false) return config
      // 通过 axios 发送请求
      axios(config)
        .then((response) => {
          // 执行自定义 dataFilter 事件
          let responseData = Object.assign({}, response)
          if (_dataFilter) responseData = _dataFilter(responseData, config)
          // 执行默认 dataFilter 事件
          if (_this.dataFilter && _dataFilterIsBoot) responseData = _this.dataFilter(responseData, config)
          // 执行请求回调事件
          resolve(responseData)
          // 执行自定义 success 事件
          if (_success) _success(response, config)
          // 执行默认 success 事件
          if (_this.success && _successIsBoot) _this.success(response, config)
          // 执行自定义 complete 事件
          if (_complete) _complete(response, config)
          // 执行默认 complete 事件
          if (_this.complete && _completeIsBoot) _this.complete(response, config)
        })
        .catch((error) => {
          // 执行请求异常事件
          reject(error)
          // 执行自定义 success 事件
          if (_error) _error(error, config)
          // 执行默认 success 事件
          if (_this.error && _errorIsBoot) _this.error(error, config)
          // 执行自定义 complete 事件
          if (_complete) _complete(error, config)
          // 执行默认 complete 事件
          if (_this.complete && _completeIsBoot) _this.complete(error, config)
        })
    })
  }

  /**
   * @description get 请求快捷方式
   * @param {*} url - 请求的url地址
   * @param {*} config - 请求的配置对象
   */
  get (url, config) {
    return this.request(Object.assign(config || {}, {
      method: 'get',
      url
    }))
  }

  /**
   * @description post 请求快捷方式
   * @param {*} url - 请求的url地址
   * @param {*} config - 请求的配置对象
   */
  post (url, config) {
    return this.request(Object.assign(config || {}, {
      method: 'post',
      url
    }))
  }

  /**
   * @description put 请求快捷方式
   * @param {*} url - 请求的url地址
   * @param {*} config - 请求的配置对象
   */
  put (url, config) {
    return this.request(Object.assign(config || {}, {
      method: 'put',
      url
    }))
  }

  /**
   * @description delete 请求快捷方式
   * @param {*} url - 请求的url地址
   * @param {*} config - 请求的配置对象
   */
  delete (url, config) {
    return this.request(Object.assign(config || {}, {
      method: 'delete',
      url
    }))
  }

  /**
   * @description Vue插件注册
   * @param {Function} Vue - Vue方法对象
   */
  install (Vue) {
    if (typeof Vue === 'function') Vue.prototype.$mxHttp = this
  }
}

/**
 * @description 创建 window.$mxHttp 对象
 */
function createdMxHttp () {
  if (window.$mxHttp instanceof Object) return window.$mxHttp
  // 在 window 对象上注册 $mxHttp
  window.$mxHttp = new MxHttpService()
  return window.$mxHttp
}

export default createdMxHttp()

import Vuex from 'vuex'
import Vue from 'vue'
import state from './state'
import mutations from './mutations'
import actions from './actions'
import requestDefine from '@/config/request-define.js'

Vue.use(Vuex)

let wholeAction = Object.assign(actions, requestDefine)

const store = new Vuex.Store({
  state,
  mutations,
  actions: wholeAction,
  modules: {}
})

export default store

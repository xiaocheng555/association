/**
 * @description: 根路径下的 mutations
 */

function storageUserInfo (userInfo) {
  window.localStorage.removeItem('userInfo')
  console.log(JSON.stringify(userInfo), 'JSON')
  console.log(userInfo, 'userInfo')
  window.localStorage.setItem('userInfo', JSON.stringify(userInfo))
}

export default {
  updateUserInfo (state, data) {
    state.userInfo = Object.assign({}, state.userInfo, data)
    storageUserInfo(state.userInfo)
  },
  resetUserInfo (state) {
    state.userInfo = {
      id: null,
      name: '',
      avatar: null,
      isAdmin: false,
      isSystem: false,
      assoId: null
    }
    storageUserInfo(state.userInfo)
  }
}

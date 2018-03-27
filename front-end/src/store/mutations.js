/**
 * @description: 根路径下的 mutations
 */

export default {
  updateUserInfo (state, data) {
    state.userInfo.id = data.id
    state.userInfo.name = data.name
    state.userInfo.avatar = data.avatar
  }
}

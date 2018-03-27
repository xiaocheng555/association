/*
 * File: index.vue
 * File Created: 2018-03-25 7:26:12 pm
 * Author: zhanghuancheng555 (1052745517@qq.com)
 * Copyright: 2017 - 2018 Your Company, Your Company
 * -----
 * Last Modified: 2018-03-28 12:04:50 am
 * Modified By: zhanghuancheng555 (1052745517@qq.com>)
 */

<template>
  <div class="app-header cl">
    <h1 class="fl">
      <router-link class="header-link" to="home">大学生社团管理系统</router-link>
    </h1>
    <a class="user-login fr" href="javascript:;">
      <el-dropdown v-if="userInfo.id">
        <span class="user-info el-dropdown-link">
          <img class="avatar-img" :src="avatar" alt="">
          <span>{{ userInfo.name }}<i class="el-icon-arrow-down el-icon--right"></i></span>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item @click.native="userLogout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <div class="no-login" v-else @click="showLoginPannel">
         <i class="iconfont icon-user"></i> 请登录
      </div>
    </a>
    <!-- 登录框 -->
    <div class="login-pannel" v-show="loginPannelShow">
      <div class="login-title text-center">学生登录</div>
      <el-input
        class="login-username"
        v-model="username"
        placeholder="学号"></el-input>
      <el-input
        class="login-password"
        v-model="password"
        placeholder="密码"></el-input>
      <div class="login-operate cl">
        <el-checkbox class="choose-role fl" v-model="isAdmin">是否为管理员</el-checkbox>
        <a class="forget-password fr" href="javascript:;">忘记密码？</a>
      </div>
      <el-button type="primary" class="login-submit" @click.native="userLogin">立即登录</el-button>
    </div>
    <!-- 遮罩层 -->
    <div
      class="bg-mask"
      v-show="loginPannelShow"
      @click="closeLoginPannel"></div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import avatar from '../../../assets/images/user.jpg'

export default {
  name: 'app-header',
  data () {
    return {
      username: '',
      password: '',
      isAdmin: false,
      loginPannelShow: false,
      avatar
    }
  },
  computed: {
    ...mapState(['userInfo'])
  },
  methods: {
    closeLoginPannel () {
      this.loginPannelShow = false
    },
    showLoginPannel () {
      this.loginPannelShow = true
    },
    // 用户登录
    userLogin () {
      if (!this.validateForm()) return
      this.$store.dispatch('student-login', {
        data: {
          user: this.username,
          password: this.password
        }
      }).then(res => {
        let data = res.data
        if (res && res.errorCode === 0 && data) {
          // 关闭登录框
          this.closeLoginPannel()
          // 更新store的用户信息
          this.updateUserInfo({
            id: data.id,
            name: data.name,
            avatar: null
          })
          // 重置表单
          this.username = ''
          this.password = ''
          this.$message({
            message: '登录成功',
            type: 'success'
          })
        } else {
          this.$message({
            message: '用户或密码输入不正确',
            type: 'error'
          })
        }
      }).catch(err => {
        this.$message({
          message: err.toString(),
          type: 'error'
        })
      })
    },
    // 验证登录表单
    validateForm () {
      let user = this.username.trim()
      let password = this.password.trim()
      let errMsg
      if (user === '' || password === '') {
        errMsg = '用户和密码不能为空'
      }
      if (errMsg) {
        this.$message({
          message: errMsg,
          type: 'error'
        })
        return false
      }
      return true
    },
    // 用户退出登录
    userLogout () {
      setTimeout(() => {
        this.updateUserInfo({
          id: null,
          name: null,
          avatar: null
        })
        this.$router.push({
          name: 'home'
        })
        this.$message({
          type: 'success',
          message: '退出成功'
        })
      }, 200)
    },
    ...mapMutations(['updateUserInfo'])
  },
  created () {
    console.log(window.localStorage.getItem('id'), '123')
  }
}
</script>

<style lang="less" scoped>
@import '../../../assets/styles/variable.less';

.app-header {
  height: 60px;
  line-height: 60px;

  .header-link {
    display: block;
    font-size: 22px;
    font-weight: 100;
    color: #ffffff;
  }
}

.user-login {
  display: block;
  height: 100%;
  padding: 0 10px;

  .user-info {
    display: block;
    height: 100%;
    color: #f5f5f5;
  }

  .avatar-img {
    display: inline-block;
    width: 30px;
    height: 30px;
    margin-right: 5px;
    border-radius: 100px;
    vertical-align: middle;
  }

  .user-name {
    color: #ffffff;
  }

  .no-login {
    font-size: 14px;
    color: #ffffff;
  }
}

.login-pannel {
  box-sizing: border-box;
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 500;
  width: 380px;
  margin-left: -190px;
  margin-top: -150px;
  padding: 0 35px 35px 35px;
  border-radius: 5px;
  background-color: #ffffff;

  .login-title {
    padding-top: 10px;
    font-size: 26px;
    color: #3D85CF;
  }

  .login-operate {
    padding: 5px 0 18px;
    line-height: 24px;

    .forget-password {
      font-size: 14px;
      color: #606266;
    }
  }

  .login-submit {
    display: block;
    width: 100%;
  }
}
</style>

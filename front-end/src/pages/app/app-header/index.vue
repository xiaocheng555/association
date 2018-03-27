/*
 * File: index.vue
 * File Created: 2018-03-25 7:26:12 pm
 * Author: zhanghuancheng555 (1052745517@qq.com)
 * Copyright: 2017 - 2018 Your Company, Your Company
 * -----
 * Last Modified: 2018-03-27 1:09:43 pm
 * Modified By: zhanghuancheng555 (1052745517@qq.com>)
 */

<template>
  <div class="app-header cl">
    <h1 class="app-title fl">
      大学生社团管理系统
    </h1>
    <a class="user-login fr" href="javascript:;">
      <el-dropdown v-if="user">
        <span class="user-info el-dropdown-link">
          <img class="avatar-img" :src="user.avatar" alt="">
          <span>{{ user.name }}<i class="el-icon-arrow-down el-icon--right"></i></span>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item>退出登录</el-dropdown-item>
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
      <el-button type="primary" class="login-submit">立即登录</el-button>
    </div>
    <!-- 遮罩层 -->
    <div
      class="bg-mask"
      v-show="loginPannelShow"
      @click="closeMask"></div>
  </div>
</template>

<script>
import avatar from '../../../assets/images/user.jpg'

export default {
  name: 'app-header',
  data () {
    return {
      user: {
        name: '张焕城',
        avatar: avatar
      },
      username: '',
      password: '',
      isAdmin: false,
      loginPannelShow: false
    }
  },
  methods: {
    closeMask () {
      this.loginPannelShow = false
    },
    showLoginPannel () {
      this.loginPannelShow = true
    }
  },
  created () {
    console.log(this.user)
  }
}
</script>

<style lang="less" scoped>
.app-header {
  height: 60px;
  line-height: 60px;
}

.app-title {
  height: 100%;
  font-size: 22px;
  font-weight: 100;
  color: #ffffff;
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
  margin-left: -150px;
  margin-top: -190px;
  padding: 0 35px 35px 35px;
  border-radius: 5px;
  background-color: #ffffff;

  .login-title {
    padding-top: 10px;
    font-size: 26px;
    color: #3D85CF;
  }

  .login-operate {
    padding: 10px 0 18px;
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

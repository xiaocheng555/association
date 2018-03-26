/*
 * File: index.vue
 * File Created: 2018-03-25 7:26:12 pm
 * Author: zhanghuancheng555 (1052745517@qq.com)
 * Copyright: 2017 - 2018 Your Company, Your Company
 * -----
 * Last Modified: 2018-03-25 8:51:59 pm
 * Modified By: zhanghuancheng555 (1052745517@qq.com>)
 */

<template>
  <div class="app-header">
    <div class="app-title">
      大学生社团管理系统
    </div>
    <a class="login" href="javascript:;">
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
      <div class="no-login" v-else>请登录</div>
    </a>
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
      }
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
  padding: 0 15px;
  line-height: 60px;
  background-color: #3D85CF;
}

.app-title {
  float: left;
  height: 100%;
  font-size: 22px;
  color: #ffffff;
}

.login {
  display: block;
  float: right;
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
    font-size: 16px;
    color: #ffffff;
  }

  .no-login {
    font-size: 14px;
    text-align: center;
    color: #ffffff;
  }
}
</style>

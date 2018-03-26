/*
 * File: index.vue
 * File Created: 2018-03-25 7:11:32 pm
 * Author: zhanghuancheng555 (1052745517@qq.com)
 * Copyright: 2017 - 2018 Your Company, Your Company
 * -----
 * Last Modified: 2018-03-26 1:31:47 am
 * Modified By: zhanghuancheng555 (1052745517@qq.com>)
 */

<template>
  <div class="app-side-nav">
    <el-menu
      default-active="1"
      class="el-menu">
      <el-menu-item index="1">
        <router-link :to="{ name: 'home' }" tag="p">
          <i class="iconfont icon-home"></i>
          <span>首页</span>
        </router-link>
      </el-menu-item>
      <el-menu-item index="2">
        <router-link :to="{ name: 'notice-list' }" tag="p">
          <i class="iconfont icon-carryout"></i>
          <span>活动</span>
        </router-link>
      </el-menu-item>
      <el-menu-item index="3">
        <i class="iconfont icon-notification"></i>
        <span slot="title">公告</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="iconfont icon-team"></i>
        <span slot="title">社团</span>
      </el-menu-item>
      <el-submenu index="5">
        <template slot="title">
        <i class="iconfont icon-setting"></i>
          <span>后台管理</span>
        </template>
        <el-menu-item index="5-1">
          公告管理
        </el-menu-item>
        <el-menu-item index="5-2">
          活动管理
        </el-menu-item>
        <el-menu-item index="5-3">
          社团管理
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'app-side-nav',
  data () {
    return {

    }
  },
  created () {
    console.log(123)
  }
}
</script>

<style lang="less" scoped>
.app-side-nav {
  height: 100%;
}

.el-menu {
  height: 100%;
}
</style>

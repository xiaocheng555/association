<template>
  <div id="app">
    <el-container id="app-header-container">
      <el-header>
        <app-header></app-header>
      </el-header>
    </el-container>
    <el-container id="app-body-container">
      <el-aside id="app-aside" width="201px">
        <app-side-menu></app-side-menu>
      </el-aside>
      <el-main id="app-main">
        <app-breadcrumb ref="breadcrumb"></app-breadcrumb>
        <router-view/>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import AppHeader from './app-header'
import AppSideMenu from './app-side-menu'
import AppBreadcrumb from './app-breadcrumb'

export default {
  name: 'App',
  components: {
    AppHeader,
    AppSideMenu,
    AppBreadcrumb
  },
  methods: {
    ...mapMutations(['updateUserInfo'])
  },
  created () {

  },
  mounted () {
    // this$refs.breadcrumb
  }
}
</script>

<style lang="less">
/* 重置样式 */
@import '../../assets/styles/reset.less';
/* 基础样式 */
@import '../../assets/styles/base.less';
/* 字体图标 */
@import '../../assets/styles/iconfont.less';
/* 全局样式 */
@import '../../assets/styles/globle.less';
/* 全局变量 */
@import '../../assets/styles/variable.less';

#app {
  min-width: 900px;
  height: 100%;
  background-color: #f3f3f3;
}

#app-header-container {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  min-width: 900px;
  height: 60px;
  background-color: #438eb9;
}

#app-body-container {
  box-sizing: border-box;
  height: 100%;
  padding-top: 60px;
}

#app-aside {
  border-right: solid 1px @default-border-color;
  background-color: #fff;
}
</style>

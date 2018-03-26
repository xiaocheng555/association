<template>
  <div id="app">
    <!-- 头部 -->
    <app-header class="app-header"></app-header>
    <div class="app-container">
      <!-- 侧栏导航 -->
      <div class="app-sidebar">
        <app-side-nav></app-side-nav>
      </div>
      <!-- 主要内容 -->
      <main class="app-main">
        <!-- 面包屑 -->
        <app-breadcrumb class="pd-b15"></app-breadcrumb>
        <router-view/>
      </main>
    </div>
  </div>
</template>

<script>
import AppHeader from '@common/app-header'
import AppSideNav from '@common/app-side-nav'
import AppBreadcrumb from '@common/app-breadcrumb'

export default {
  name: 'App',
  components: {
    AppHeader,
    AppSideNav,
    AppBreadcrumb
  }
}
</script>

<style>
/* 重置样式 */
@import '../../assets/styles/reset.less';
/* 基础样式 */
@import '../../assets/styles/base.less';
/* 字体图标 */
@import '../../assets/styles/icon.less';

#app {
  display: block;
  min-width: 900px;
  height: 100%;
  background-color: #f1f1f1;
}

.app-header {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 60px;
  min-width: 900px;
  box-sizing: border-box;
}

.app-container {
  display: flex;
  height: 100%;
  padding-top: 60px;
  box-sizing: border-box;
}

.app-sidebar {
  overflow: auto;
  width: 200px;
  height: 100%;
}

.app-main {
  overflow: auto;
  flex: 1;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
}
</style>

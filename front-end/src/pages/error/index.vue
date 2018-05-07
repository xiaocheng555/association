/*
 * File: index.vue
 * File Created: 2018-03-27 10:40:07 pm
 * Author: zhanghuancheng555 (1052745517@qq.com)
 * Copyright: 2017 - 2018 Your Company, Your Company
 * -----
 * Last Modified: 2018-05-05 12:47:35 am
 * Modified By: zhanghuancheng555 (1052745517@qq.com>)
 */
<template>
  <div class="error-page">
    <h1 class="title">404</h1>
    <h3 class="sub-title">页面未能够找到！</h3>
    <div class="main-text">抱歉，页面好像去火星啦！</div>
    <div class="back-home-box">
      <el-button size="mini" type="success" @click="backToHome">返回首页</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'error-page',
  methods: {
    backToHome () {
      this.$router.push({
        name: 'home'
      })
    }
  }
}
</script>

<style lang="less">
.error-page {
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;

  .title {
    padding-top: 80px;
    font-weight: 80;
    font-size: 100px;
    text-align: center;
  }

  .sub-title {
    font-weight: 100;
    font-size: 24px;
    text-align: center;
  }

  .main-text {
    padding-top: 5px;
    font-size: 14px;
    text-align: center;
  }

  .back-home-box {
    padding-top: 30px;
    text-align: center;
  }
}
</style>

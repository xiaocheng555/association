/*
 * File: index.vue
 * File Created: 2018-03-24 9:22:04 pm
 * Author: zhanghuancheng555 (1052745517@qq.com)
 * Copyright: 2017 - 2018 Your Company, Your Company
 * -----
 * Last Modified: 2018-05-08 9:39:20 am
 * Modified By: zhanghuancheng555 (1052745517@qq.com>)
 */

<template>
  <common-pannel title="首页">
    <el-row :gutter="20">
      <el-col :span="12">
        <h3 class="home-sub-title">最近公告</h3>
        <latest-notice-list></latest-notice-list>
      </el-col>
      <el-col :span="12">
        <h3 class="home-sub-title">最近活动</h3>
        <latest-activity-list></latest-activity-list>
      </el-col>
    </el-row>
  </common-pannel>
</template>

<script>
import CommonPannel from '@common/common-pannel'
import LatestNoticeList from './latest-notive-list'
import LatestActivityList from './latest-activity-list'

export default {
  name: 'Home',
  components: {
    CommonPannel,
    LatestNoticeList,
    LatestActivityList
  },
  data () {
    return {
      radio: true
    }
  },
  created () {
  }
}
</script>

<style lang="less" scoped>
.home-sub-title {
  padding-bottom: 10px;
  font-size: 16px;
  font-weight: 100;
}
</style>

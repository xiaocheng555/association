/*
 * File: index.vue
 * File Created: 2018-05-07 10:48:49 am
 * Author: zhanghuancheng555 (1052745517@qq.com)
 * Copyright: 2017 - 2018 Your Company, Your Company
 * -----
 * Last Modified: 2018-05-07 11:30:34 am
 * Modified By: zhanghuancheng555 (1052745517@qq.com>)
 */

<template>
  <common-pannel class="association-manage" title="社团管理">
    <el-tabs v-model="activeName" type="border-card" @tab-click="toggleTab">
      <el-tab-pane label="会员" name="member">
        <router-view v-if="activeName === 'member'"></router-view>
      </el-tab-pane>
      <el-tab-pane label="部门" name="dept">
        <router-view v-if="activeName === 'dept'"></router-view>
      </el-tab-pane>
    </el-tabs>
  </common-pannel>
</template>

<script>
import CommonPannel from '@common/common-pannel'

export default {
  name: 'association-manage',
  components: {
    CommonPannel
  },
  data () {
    return {
      activeName: 'member'
    }
  },
  methods: {
    toggleTab () {
      if (this.activeName === 'dept') {
        this.$router.push({
          name: 'admin-association-manage_department-list',
          query: {
            tab: this.activeName
          }
        })
      } else {
        this.$router.push({
          name: 'admin-association-manage_member-list',
          query: {
            tab: this.activeName
          }
        })
      }
    }
  },
  created () {
    let _activeName = this.$route.query.tab
    if (_activeName === 'dept') {
      this.activeName = _activeName
    }
  }
}
</script>

<style lang="less" scoped>
.association-manage .el-tabs {
  min-height: 390px;
}
</style>

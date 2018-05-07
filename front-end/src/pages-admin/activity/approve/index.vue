/*
 * File: index.vue
 * File Created: 2018-03-27 10:39:07 pm
 * Author: zhanghuancheng555 (1052745517@qq.com)
 * Copyright: 2017 - 2018 Your Company, Your Company
 * -----
 * Last Modified: 2018-05-05 1:00:37 am
 * Modified By: zhanghuancheng555 (1052745517@qq.com>)
 */

<template>
  <common-pannel class="activity-approve" title="活动审批">
    <el-tabs v-model="activeName" type="border-card" @tab-click="toggleTab">
      <el-tab-pane label="审批活动" name="act">
        <approve-activity-list v-if="activeName === 'act'"></approve-activity-list>
      </el-tab-pane>
      <el-tab-pane label="审批学生名单" name="student">
        <approve-student-list  v-if="activeName === 'student'"></approve-student-list>
      </el-tab-pane>
    </el-tabs>
  </common-pannel>
</template>

<script>
import CommonPannel from '@common/common-pannel'
import ApproveActivityList from './approve-activity-list'
import ApproveStudentList from './approve-student-list'

export default {
  name: 'activity-approve',
  components: {
    CommonPannel,
    ApproveActivityList,
    ApproveStudentList
  },
  data () {
    return {
      activeName: 'act'
    }
  },
  methods: {
    toggleTab () {
      this.$router.replace({
        query: {
          tab: this.activeName
        }
      })
    }
  },
  created () {
    let _activeName = this.$route.query.tab
    if (_activeName === 'student') {
      this.activeName = _activeName
    }
  }
}
</script>

<style lang="less">
.activity-approve .el-tabs {
  min-height: 390px;
}
</style>

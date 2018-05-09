/*
 * File: latest-activity-list.vue
 * File Created: 2018-05-08 9:24:00 am
 * Author: zhanghuancheng555 (1052745517@qq.com)
 * Copyright: 2017 - 2018 Your Company, Your Company
 * -----
 * Last Modified: 2018-05-08 9:48:07 am
 * Modified By: zhanghuancheng555 (1052745517@qq.com>)
 */

<template>
  <el-table
    :data="activityList"
    :stripe="true"
    :border="true"
    style="width: 100%">
    <el-table-column
      align="center"
      label="标题">
      <template slot-scope="scope">
        <a href="javascript:;" @click="jumpToActDetail(scope.row.id)">{{ scope.row.name }}</a>
      </template>
    </el-table-column>
    <el-table-column
      prop="date"
      align="center"
      width="130"
      label="发布时间">
    </el-table-column>
  </el-table>
</template>

<script>
import moment from 'moment'

export default {
  name: 'latest-activity-list',
  data () {
    return {
      activityList: []
    }
  },
  methods: {
    // 获取列表数据
    fetchactivityList () {
      this.$store.dispatch('activity-list', {
        params: {
          pageSize: this.pageSize,
          pageNum: this.currentPage,
          // 活动审批通过
          approveType: 1
        }
      }).then((res) => {
        if (res && res.data && res.errorCode === 0) {
          let data = res.data
          this.totalCount = data.totalCount
          this.activityList = this.handleListData(res.data.list)
        } else {
          this.$message({
            type: 'error',
            message: '获取活动列表失败'
          })
        }
      })
    },
    // 数据转换
    handleListData (datalist) {
      return datalist.map(item => {
        return {
          id: item.id,
          name: item.name,
          date: moment(item.createdAt).format('YYYY-MM-DD')
        }
      })
    },
    jumpToActDetail (id) {
      this.$router.push({
        name: 'activity-detail',
        query: {
          id: id
        }
      })
    }
  },
  created () {
    this.fetchactivityList()
  }
}
</script>

<style>

</style>

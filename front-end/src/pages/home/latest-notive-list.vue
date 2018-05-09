/*
 * File: latest-notive-list.vue
 * File Created: 2018-05-08 9:24:07 am
 * Author: zhanghuancheng555 (1052745517@qq.com)
 * Copyright: 2017 - 2018 Your Company, Your Company
 * -----
 * Last Modified: 2018-05-08 9:34:33 am
 * Modified By: zhanghuancheng555 (1052745517@qq.com>)
 */

<template>
  <el-table
    :data="noticeList"
    :stripe="true"
    :border="true"
    style="width: 100%">
    <el-table-column
      align="center"
      label="标题">
      <template slot-scope="scope">
        <a href="javascript:;" @click="jumpToNoticeDetail(scope.row.id)">{{ scope.row.name }}</a>
      </template>
    </el-table-column>
    <el-table-column
      align="center"
      prop="date"
      width="180"
      label="发布时间">
    </el-table-column>
  </el-table>
</template>

<script>
import moment from 'moment'

export default {
  name: 'latest-notice-list',
  data () {
    return {
      noticeList: []
    }
  },
  methods: {
    // 获取列表数据
    fetchNoticeList () {
      this.$store.dispatch('notice-list', {
        params: {
          pageSize: this.pageSize,
          pageNum: this.currentPage
        }
      }).then((res) => {
        if (res && res.data && res.errorCode === 0) {
          this.noticeList = this.handleListData(res.data.list)
        } else {
          this.$message({
            type: 'error',
            message: '获取公告列表失败'
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
    jumpToNoticeDetail (id) {
      this.$router.push({
        name: 'notice-detail',
        query: {
          id: id
        }
      })
    }
  },
  created () {
    this.fetchNoticeList()
  }
}
</script>

<style>

</style>

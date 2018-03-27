/*
 * File: index.vue
 * File Created: 2018-03-25 5:44:23 pm
 * Author: zhanghuancheng555 (1052745517@qq.com)
 * Copyright: 2017 - 2018 Your Company, Your Company
 * -----
 * Last Modified: 2018-03-28 1:08:33 am
 * Modified By: zhanghuancheng555 (1052745517@qq.com>)
 */

<template>
  <div class="notice-list">
    <common-pannel title="公告">
      <el-table
        :data="noticeList"
        stripe="true"
        border="true"
        style="width: 100%">
        <el-table-column
          label="标题">
          <template slot-scope="scope">
            <a href="#">{{ scope.row.name }}</a>
          </template>
        </el-table-column>
        <el-table-column
          prop="principal"
          width="180"
          label="发布者">
        </el-table-column>
        <el-table-column
          prop="date"
          label="发布时间">
        </el-table-column>
      </el-table>
    </common-pannel>
  </div>
</template>

<script>
import CommonPannel from '@common/common-pannel'
import moment from 'moment'

export default {
  name: 'notice-list',
  components: {
    CommonPannel
  },
  data () {
    return {
      noticeList: []
    }
  },
  methods: {
    fetchNoticeList () {
      this.$store.dispatch('notice-list').then((res) => {
        if (res && res.data && res.errorCode === 0) {
          this.noticeList = this.handleListData(res.data.list)
          console.log(this.noticeList)
        } else {
          this.$message({
            type: 'error',
            message: '获取公告列表失败'
          })
        }
      }).catch(() => {
        this.$message({
          type: 'error',
          message: '获取公告列表失败'
        })
      })
    },
    handleListData (datalist) {
      return datalist.map(item => {
        let isSystem = item.admin ? item.admin.isSystem : false
        let principal
        if (isSystem) {
          principal = '系统'
        } else {
          principal = item.association ? item.association.name : '未知'
        }
        return {
          id: item.id,
          name: item.name,
          date: moment(item.createdAt, 'YYYY-MM-DD HH'),
          principal: principal
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

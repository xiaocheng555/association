/*
 * File: index.vue
 * File Created: 2018-03-25 5:44:23 pm
 * Author: zhanghuancheng555 (1052745517@qq.com)
 * Copyright: 2017 - 2018 Your Company, Your Company
 * -----
 * Last Modified: 2018-05-03 7:27:51 pm
 * Modified By: zhanghuancheng555 (1052745517@qq.com>)
 */

<template>
  <div class="notice-list">
    <common-pannel title="公告">
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
          prop="principal"
          width="180"
          label="发布者">
        </el-table-column>
        <el-table-column
          align="center"
          prop="date"
          width="180"
          label="发布时间">
        </el-table-column>
      </el-table>
      <el-pagination
        background
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="pageSize"
        layout="prev, pager, next, jumper"
        :total="totalCount">
      </el-pagination>
    </common-pannel>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import CommonPannel from '@common/common-pannel'
import moment from 'moment'

export default {
  name: 'notice-list',
  components: {
    CommonPannel
  },
  data () {
    return {
      currentPage: 1,
      totalCount: 50,
      noticeList: []
    }
  },
  computed: {
    ...mapState([
      'pageSize'
    ])
  },
  methods: {
    // 跳转到第几页
    handleCurrentChange (currentPage) {
      this.$router.push({
        query: {
          currentPage
        }
      })
    },
    // 获取列表数据
    fetchNoticeList () {
      this.$store.dispatch('notice-list', {
        params: {
          pageSize: this.pageSize,
          pageNum: this.currentPage
        }
      }).then((res) => {
        if (res && res.data && res.errorCode === 0) {
          let data = res.data
          this.totalCount = data.totalCount
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
          date: moment(item.createdAt).format('YYYY-MM-DD'),
          principal: item.principal
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
  // 当路由参数改变时调用
  beforeRouteUpdate (to, from, next) {
    this.fetchNoticeList()
    next()
  },
  created () {
    this.fetchNoticeList()
  }
}
</script>

<style>

</style>

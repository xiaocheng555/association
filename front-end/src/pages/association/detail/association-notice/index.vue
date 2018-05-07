/*
 * File: index.vue
 * File Created: 2018-05-05 8:59:44 pm
 * Author: zhanghuancheng555 (1052745517@qq.com)
 * Copyright: 2017 - 2018 Your Company, Your Company
 * -----
 * Last Modified: 2018-05-05 9:22:39 pm
 * Modified By: zhanghuancheng555 (1052745517@qq.com>)
 */

<template>
  <div>
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
  </div>
</template>

<script>
import { mapState } from 'vuex'
import moment from 'moment'

export default {
  name: 'association-activity',
  props: {
    assoId: {
      type: Number,
      required: true
    }
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
  // 当路由参数改变时调用
  beforeRouteUpdate (to, from, next) {
    this.fetchNoticeList()
    next()
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
          pageNum: this.currentPage,
          associationId: this.assoId
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
  created () {
    this.fetchNoticeList()
  }
}
</script>

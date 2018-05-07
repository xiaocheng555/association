/*
 * File: index.vue
 * File Created: 2018-05-05 8:59:44 pm
 * Author: zhanghuancheng555 (1052745517@qq.com)
 * Copyright: 2017 - 2018 Your Company, Your Company
 * -----
 * Last Modified: 2018-05-05 9:09:12 pm
 * Modified By: zhanghuancheng555 (1052745517@qq.com>)
 */

<template>
  <div>
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
        prop="score"
        align="center"
        width="70"
        label="活动分数">
      </el-table-column>
      <el-table-column
        prop="director"
        align="center"
        width="120"
        label="负责人">
      </el-table-column>
      <el-table-column
        prop="tel"
        align="center"
        width="130"
        label="负责人电话">
      </el-table-column>
      <el-table-column
        prop="date"
        align="center"
        width="130"
        label="发布时间">
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next, jumper"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="pageSize"
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
      activityList: []
    }
  },
  computed: {
    ...mapState([
      'pageSize'
    ])
  },
  // 当路由参数改变时调用
  beforeRouteUpdate (to, from, next) {
    this.fetchactivityList()
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
    fetchactivityList () {
      this.$store.dispatch('activity-list', {
        params: {
          pageSize: this.pageSize,
          pageNum: this.currentPage,
          // 活动审批通过
          approveType: 1,
          associationId: this.assoId
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
          assoName: item.assoName,
          date: moment(item.createdAt).format('YYYY-MM-DD'),
          score: item.score,
          director: item.director,
          tel: item.directorTel
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

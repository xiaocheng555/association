/*
 * File: index.vue
 * File Created: 2018-05-06 6:51:58 pm
 * Author: zhanghuancheng555 (1052745517@qq.com)
 * Copyright: 2017 - 2018 Your Company, Your Company
 * -----
 * Last Modified: 2018-05-08 9:16:35 pm
 * Modified By: zhanghuancheng555 (1052745517@qq.com>)
 */

<template>
  <el-card>
    <div slot="header">
      <span>我的活动</span>
    </div>
    <div>
      <h4 class="total-score">总活动分数： {{ totalScore.toFixed(1) }} 分</h4>
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
        <el-table-column
          align="center"
          prop="assoName"
          width="180"
          label="发布社团">
        </el-table-column>
        <el-table-column
          prop="score"
          align="center"
          width="100"
          label="获得分数">
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
  </el-card>
</template>

<script>
import { mapState } from 'vuex'
import moment from 'moment'

export default {
  name: 'user-join-activity',
  components: {

  },
  data () {
    return {
      currentPage: 1,
      totalCount: 50,
      activityList: [],
      totalScore: 0
    }
  },
  computed: {
    ...mapState(['userInfo', 'pageSize'])
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
      this.$store.dispatch('activity-student-join-act-list', {
        params: {
          pageSize: this.pageSize,
          pageNum: this.currentPage,
          studentId: this.userInfo.id
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
        this.totalScore += Number(item.score)
        return {
          id: item.id,
          name: item.name,
          assoName: item.assoName,
          date: moment(item.createdAt).format('YYYY-MM-DD'),
          score: item.score
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
  // 当路由参数改变时调用
  beforeRouteUpdate (to, from, next) {
    this.fetchactivityList()
    next()
  },
  created () {
    this.fetchactivityList()
  }
}
</script>

<style lang="less" scoped>
.total-score {
  font-size: 14px;
  padding-bottom: 15px;
}
</style>

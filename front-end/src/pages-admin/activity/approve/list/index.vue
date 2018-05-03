/*
 * File: index.vue
 * File Created: 2018-03-27 10:39:07 pm
 * Author: zhanghuancheng555 (1052745517@qq.com)
 * Copyright: 2017 - 2018 Your Company, Your Company
 * -----
 * Last Modified: 2018-05-03 7:59:10 pm
 * Modified By: zhanghuancheng555 (1052745517@qq.com>)
 */

<template>
  <div class="activity-manage">
    <common-pannel title="活动审批">
      <el-table
        style="width: 100%"
        align="center"
        :data="activityList"
        :stripe="true"
        :border="true">
        <el-table-column
          :show-overflow-tooltip="true"
           align="center"
          label="标题">
          <template slot-scope="scope">
            <a href="javascript:;" @click="jumpToApproveDetail(scope.row.id)">
              {{ scope.row.name }}
            </a>
          </template>
        </el-table-column>
        <el-table-column
          prop="assoName"
          align="center"
          width="250"
          label="社团">
        </el-table-column>
        <el-table-column
          prop="date"
          align="center"
          width="200"
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
  name: 'activity-list',
  components: {
    CommonPannel
  },
  data () {
    return {
      currentPage: 1,
      totalCount: 0,
      activityList: []
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
    fetchActivityList () {
      this.$store.dispatch('activity-list', {
        params: {
          pageSize: this.pageSize,
          pageNum: this.currentPage,
          // 活动待审批
          approveType: 0
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
          date: moment(item.createdAt).format('YYYY-MM-DD'),
          assoName: item.assoName
        }
      })
    },
    jumpToApproveDetail (id) {
      this.$router.push({
        name: 'activity-approve-detail',
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
    this.fetchActivityList()
  }
}
</script>

<style>

</style>

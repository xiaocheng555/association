/*
 * File: index.vue
 * File Created: 2018-03-27 10:39:07 pm
 * Author: zhanghuancheng555 (1052745517@qq.com)
 * Copyright: 2017 - 2018 Your Company, Your Company
 * -----
 * Last Modified: 2018-05-08 4:34:45 pm
 * Modified By: zhanghuancheng555 (1052745517@qq.com>)
 */

<template>
  <common-pannel title="活动管理">
    <el-button
      slot="right"
      type="primary"
      size="mini"
      plain
      @click="addActivity">添加活动</el-button>
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
          <a href="javascript:;" @click=" jumpToActivityDetail(scope.row.id)">
            {{ scope.row.name }}
          </a>
        </template>
      </el-table-column>
      <el-table-column
        prop="date"
        align="center"
        width="130"
        label="发布时间">
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
        align="center"
        width="150"
        label="活动审批">
        <template slot-scope="scope">
          <el-tag size="mini" :type="transformApproveTagType(scope.row.approveType)">
            {{ transformApproveType(scope.row.approveType) }}
          </el-tag>
          <a v-if="scope.row.approveType === -1" href="javascript:;" @click="openAdviseMsgBox('活动驳回原因', scope.row.approveAdvise)">[ 原因 ]</a>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        width="150"
        label="学生名单">
        <template slot-scope="scope">
          <template v-if="scope.row.approveType === 1">
            <el-tag
              size="mini"
              :type="transformConfirmTagType(scope.row.confirmType)">
              {{ transformConfirmType(scope.row.confirmType) }}
            </el-tag>
            <a
              v-if="scope.row.confirmType === 0"
              href="javascript:;"
              @click="confirmStudentList(scope.row.id)">[ 确立名单 ]</a>
            <a
              v-if="scope.row.confirmType === 1 || scope.row.confirmType === 2"
              href="javascript:;"
              @click="viewStudentList(scope.row.id)">[ 查看名单 ]</a>
            <a
              v-if="scope.row.confirmType === -1"
              href="javascript:;"
              @click="openAdviseMsgBox('名单驳回原因', scope.row.confirmAdvise)">
              [ 原因 ]
            </a>
          </template>
          <span v-else>-</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        width="200">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="mini"
            :disabled="scope.row.approveType !== 0"
            @click="editActivity(scope.row.id)">编辑</el-button>
          <el-button
            type="danger"
            size="mini"
            :disabled="scope.row.confirmType === 2"
            @click="deleteActivity(scope.row.id)">删除</el-button>
        </template>
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
      'pageSize',
      'userInfo'
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
          assoId: this.userInfo.assoId
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
          score: item.score,
          director: item.director,
          tel: item.directorTel,
          approveType: item.approveType,
          approveAdvise: item.approveAdvise,
          confirmType: item.confirmType,
          confirmAdvise: item.confirmAdvise
        }
      })
    },
    // 审批类型转换
    transformApproveType (approveType) {
      // 审批类型：0为待审批，1为审批通过，-1为审批驳回
      switch (approveType) {
        case 0:
          return '待审批'
        case 1:
          return '审批通过'
        case -1:
          return '审批驳回'
      }
    },
    transformApproveTagType (approveType) {
      // 审批类型：0为待审批，1为审批通过，-1为审批驳回
      switch (approveType) {
        case 0:
          return 'info'
        case 1:
          return 'success'
        case -1:
          return 'danger'
      }
    },
    // 名单确立类型转换
    transformConfirmType (confirmType) {
      // 确立名单类型：0为名单未提交，1为名单提交，2为名单确立成功，-1为名单确立失败
      switch (confirmType) {
        case 0:
          return '未提交'
        case 1:
          return '待审批'
        case 2:
          return '审批通过'
        case -1:
          return '审批驳回'
      }
    },
    transformConfirmTagType (confirmType) {
      // 确立名单类型：0为名单未提交，1为名单提交，2为名单确立成功，-1为名单确立失败
      switch (confirmType) {
        case 0:
          return 'warning'
        case 1:
          return 'info'
        case 2:
          return 'success'
        case -1:
          return 'danger'
      }
    },
    openAdviseMsgBox (title, content) {
      content = content || '无'
      this.$alert(content, title, {
        confirmButtonText: '确定'
      })
    },
    jumpToActivityDetail (id) {
      this.$router.push({
        name: 'admin-activity-detail',
        query: {
          id: id
        }
      })
    },
    // 添加活动
    addActivity () {
      this.$router.push({
        name: 'activity-add'
      })
    },
    // 编辑活动
    editActivity (id) {
      this.$router.push({
        name: 'activity-edit',
        query: {
          id: id
        }
      })
    },
    // 确立学生名单
    confirmStudentList (id) {
      this.$router.push({
        name: 'activity-student-confirm',
        query: {
          id: id
        }
      })
    },
    // 查看学生名单
    viewStudentList (id) {
      this.$router.push({
        name: 'activity-student-list',
        query: {
          id: id
        }
      })
    },
    // 删除活动
    deleteActivity (id) {
      console.log(id, 'id')
      this.$confirm('是否删除？', '提示', {
        confirmButtonText: '确立',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('activity-destroy', {
          data: {
            id: id
          }
        }).then(res => {
          if (res && res.errorCode === 0) {
            this.$message.success('删除成功')
            this.fetchActivityList()
          }
        })
      }).catch(() => {})
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

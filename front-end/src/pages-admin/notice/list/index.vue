/*
 * File: index.vue
 * File Created: 2018-03-27 10:39:07 pm
 * Author: zhanghuancheng555 (1052745517@qq.com)
 * Copyright: 2017 - 2018 Your Company, Your Company
 * -----
 * Last Modified: 2018-05-07 11:26:27 am
 * Modified By: zhanghuancheng555 (1052745517@qq.com>)
 */

<template>
  <div class="notice-list">
    <common-pannel title="公告管理">
      <el-button
        slot="right"
        type="primary"
        size="mini"
        plain
        @click="addNotice">添加公告</el-button>
      <el-table
        :data="noticeList"
        :stripe="true"
        :border="true"
        style="width: 100%">
        <el-table-column
          :show-overflow-tooltip="true"
           align="center"
          label="标题">
          <template slot-scope="scope">
            <a href="javascript:;" @click="editNotice(scope.row.id)">
              {{ scope.row.name }}
            </a>
          </template>
        </el-table-column>
        <el-table-column
          prop="date"
          align="center"
          width="180"
          label="发布时间">
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
          width="200">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="editNotice(scope.row.id)">编辑</el-button>
            <el-button type="danger" size="mini" @click="deleteNotice(scope.row.id)">删除</el-button>
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
  </div>
</template>

<script>
import { mapState } from 'vuex'
import CommonPannel from '@common/common-pannel'
import moment from 'moment'

export default {
  name: 'admin-notice-list',
  components: {
    CommonPannel
  },
  data () {
    return {
      currentPage: 1,
      totalCount: 0,
      noticeList: []
    }
  },
  computed: {
    ...mapState([
      'pageSize',
      'userInfo'
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
          isSystem: this.userInfo.isSystem,
          adminId: this.userInfo.id,
          associationId: this.userInfo.assoId || undefined
        }
      }).then((res) => {
        if (res && res.data && res.errorCode === 0) {
          let data = res.data
          this.totalCount = data.totalCount
          this.noticeList = this.handleListData(res.data.list)
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
    addNotice () {
      this.$router.push({
        name: 'notice-add'
      })
    },
    // 编辑公告
    editNotice (id) {
      this.$router.push({
        name: 'notice-edit',
        query: {
          id: id
        }
      })
    },
    // 删除公告
    deleteNotice (id) {
      this.$confirm('是否删除？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('notice-destroy', {
          data: {
            id: id
          }
        }).then(res => {
          if (res && res.errorCode === 0) {
            this.$message.success('删除成功')
            this.fetchNoticeList()
          }
        })
      }).catch(() => {})
    }
  },
  created () {
    this.fetchNoticeList()
  }
}
</script>

<style>

</style>

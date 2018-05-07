/*
 * File: index.vue
 * File Created: 2018-03-27 10:39:07 pm
 * Author: zhanghuancheng555 (1052745517@qq.com)
 * Copyright: 2017 - 2018 Your Company, Your Company
 * -----
 * Last Modified: 2018-05-04 3:37:23 pm
 * Modified By: zhanghuancheng555 (1052745517@qq.com>)
 */

<template>
  <common-pannel title="学生名单">
    <el-table
      style="width: 100%"
      class="student-list"
      align="center"
      :data="studentList"
      :stripe="true"
      :border="true">
      <el-table-column
        prop="name"
        align="center"
        width="180"
        label="姓名">
      </el-table-column>
      <el-table-column
        prop="sno"
        align="center"
        width="180"
        label="学号">
      </el-table-column>
      <el-table-column
        prop="class"
        align="center"
        label="班级">
      </el-table-column>
      <el-table-column
        prop="academy"
        align="center"
        label="学院">
      </el-table-column>
      <el-table-column
        prop="grade"
        align="center"
        width="120"
        label="年级">
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

export default {
  name: 'activity-student-list',
  components: {
    CommonPannel
  },
  props: {
    actId: {
      type: Number
    }
  },
  data () {
    return {
      currentPage: 1,
      totalCount: 1,
      studentList: [],
      dialogShow: false
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
    fetchStudentList () {
      this.$store.dispatch('activity-student-join-list', {
        params: {
          activityId: this.actId
        }
      }).then((res) => {
        if (res && res.data && res.errorCode === 0) {
          let data = res.data
          this.totalCount = data.totalCount
          this.studentList = this.handleListData(res.data.list)
        } else {
          this.$message({
            type: 'error',
            message: '获取活动列表失败'
          })
        }
      })
    },
    handleListData (listData) {
      return listData.map(item => {
        return {
          id: item.id,
          name: item.name,
          sno: item.sno,
          sex: item.sex,
          class: item.class,
          academy: item.academy,
          grade: item.grade
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
    this.fetchStudentList()
  }
}
</script>

<style lang="less" scoped>
.student-list {
  margin-top: 15px;
}
</style>

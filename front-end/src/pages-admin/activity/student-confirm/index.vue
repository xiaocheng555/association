/*
 * File: index.vue
 * File Created: 2018-03-27 10:39:07 pm
 * Author: zhanghuancheng555 (1052745517@qq.com)
 * Copyright: 2017 - 2018 Your Company, Your Company
 * -----
 * Last Modified: 2018-05-07 2:57:49 pm
 * Modified By: zhanghuancheng555 (1052745517@qq.com>)
 */

<template>
  <common-pannel title="确立名单">
    <el-button
      slot="right"
      type="primary"
      size="mini"
      plain
      @click="submitStudentList">提交名单</el-button>
    <el-button
      type="primary"
      size="small"
      @click="dialogShow = true">添加学生</el-button>
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
        width="150"
        label="姓名">
      </el-table-column>
      <el-table-column
        prop="sno"
        align="center"
        width="150"
        label="学号">
      </el-table-column>
      <el-table-column
        prop="class"
        align="center"
        width="200"
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
        width="100"
        label="年级">
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        width="150">
        <template slot-scope="scope">
          <el-button type="danger" size="mini" @click="deleteStudent(scope.row.id)">删除</el-button>
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
    <el-dialog
      title="添加学生"
      :visible.sync="dialogShow"
      width="1100px">
      <student-choose @confirm="addStudentList"></student-choose>
    </el-dialog>
  </common-pannel>
</template>

<script>
import { mapState } from 'vuex'
import CommonPannel from '@common/common-pannel'
import StudentChoose from '@common/student-choose'

export default {
  name: 'activity-student-confirm',
  components: {
    CommonPannel,
    StudentChoose
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
    },
    // 添加学生成功事件触发
    addStudentList (studentIds) {
      this.$store.dispatch('activity-add-student-in-list', {
        data: {
          activityId: this.actId,
          studentIds: studentIds
        }
      }).then(() => {
        this.$message.success('添加成功')
        this.dialogShow = false
        this.fetchStudentList()
      })
    },
    // 删除学生
    deleteStudent (id) {
      this.$confirm('确定删除学生?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('activity-delete-student-in-list', {
          data: {
            studentId: id
          }
        }).then(() => {
          this.fetchStudentList()
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
      }).catch(() => {})
    },
    // 提交学生名单
    submitStudentList () {
      if (this.studentList.length === 0) {
        this.$message.warning('请先添加学生')
        return
      }
      this.$store.dispatch('activity-approve-student-list', {
        data: {
          activityId: this.actId,
          // 提交活动名单
          confirmType: 1
        }
      }).then(() => {
        this.$message.success('提交成功')
        this.$router.push({
          name: 'admin-activity-list'
        })
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

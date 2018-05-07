/*
 * File: index.vue
 * File Created: 2018-05-04 11:25:01 am
 * Author: zhanghuancheng555 (1052745517@qq.com)
 * Copyright: 2017 - 2018 Your Company, Your Company
 * -----
 * Last Modified: 2018-05-07 4:33:38 pm
 * Modified By: zhanghuancheng555 (1052745517@qq.com>)
 */

<template>
  <section class="student-choose">
    <el-input class="sno-input" v-model="snoText" size="medium" placeholder="请输入学号" clearable></el-input>
    <el-button type="primary" size="medium" @click="onStudentSerach">查 询</el-button>
    <el-table
      class="student-list"
      style="width: 100%"
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
          <el-checkbox v-model="scope.row.checked" @change="checkStudent(scope.row)"></el-checkbox>
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
    <div class="student-choose-footer">
      <el-button type="primary" size="medium" @click="onConfirmBtnClick">添 加</el-button>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'student-choose',
  data () {
    return {
      snoText: '',
      studentList: [],
      studentCheckedList: [],
      searchParams: {
        sno: ''
      },
      currentPage: 1,
      totalCount: 0
    }
  },
  computed: {
    ...mapState([
      'pageSize'
    ])
  },
  methods: {
    // 学生搜索事件触发
    onStudentSerach () {
      this.searchParams.sno = this.snoText
      this.serachStudent()
    },
    // 搜索学生
    serachStudent () {
      this.$store.dispatch('student-search', {
        params: this.searchParams
      }).then(res => {
        if (res && res.errorCode === 0 && res.data) {
          this.totalCount = res.data.totalCount
          this.studentList = this.handleStudentList(res.data.list)
        }
      })
    },
    handleStudentList (listData) {
      return listData.map(item => {
        let checked = this.studentCheckedList.some(checkedStudent => {
          if (checkedStudent.id === item.id) {
            return true
          }
        })
        return {
          id: item.id,
          name: item.name,
          sno: item.sno,
          class: item.name,
          academy: item.name,
          grade: item.grade,
          checked: checked
        }
      })
    },
    // 跳转到第几页
    handleCurrentChange (currentPage) {
      this.$router.push({
        query: {
          currentPage
        }
      })
    },
    // 勾选学生
    checkStudent (student) {
      if (student.checked) {
        this.studentCheckedList.push(student)
      } else {
        let _index = -1
        this.studentCheckedList.some((checkedStudent, index) => {
          if (checkedStudent.id === student.id) {
            _index = index
            return true
          }
        })
        this.studentCheckedList.splice(_index, 1)
      }
    },
    // 添加选中学生
    onConfirmBtnClick () {
      if (this.studentCheckedList.length === 0) {
        this.$message.warning('请选择至少一个学生')
        return
      }
      let studentIds = this.studentCheckedList.map(checkedStudent => {
        return checkedStudent.id
      })
      this.$emit('confirm', studentIds)
    }
  },
  // 当路由参数改变时调用
  beforeRouteUpdate (to, from, next) {
    this.serachStudent()
    next()
  }
}
</script>

<style lang="less">
.student-choose {

  .sno-input {
    width: 180px;
    margin-right: 10px;
  }

  .student-list {
    margin-top: 20px;
  }

  .student-choose-footer {
    padding-top: 35px;
    padding-bottom: 15px;
    text-align: right;
  }
}
</style>

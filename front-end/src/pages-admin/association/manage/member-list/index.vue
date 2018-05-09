/*
 * File: index.vue
 * File Created: 2018-05-07 10:48:49 am
 * Author: zhanghuancheng555 (1052745517@qq.com)
 * Copyright: 2017 - 2018 Your Company, Your Company
 * -----
 * Last Modified: 2018-05-08 4:07:11 pm
 * Modified By: zhanghuancheng555 (1052745517@qq.com>)
 */

<template>
  <div>
    <el-button type="primary" size="small" @click.native="dialogShow = true">添加会员</el-button>
    <el-table
      class="member-list"
      style="width: 100%"
      align="center"
      :data="memberList"
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
          <el-button type="danger" size="mini" @click="deleteMember(scope.row.id)">删除</el-button>
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
      title="添加会员"
      :visible.sync="dialogShow"
      width="1100px">
      <student-choose
        :checked-student-ids="checkedStudentIds"
        :disabled-student-ids="checkedStudentIds"
        @confirm="addMemberList"
        v-if="dialogShow"></student-choose>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import StudentChoose from '@common/student-choose'

export default {
  name: 'member-list',
  components: {
    StudentChoose
  },
  data () {
    return {
      memberList: [],
      currentPage: 1,
      totalCount: 0,
      dialogShow: false,
      checkedStudentIds: []
    }
  },
  computed: {
    ...mapState([
      'userInfo',
      'pageSize'
    ])
  },
  methods: {
    fetchMemberList () {
      this.$store.dispatch('association-student-join-list', {
        params: {
          pageSize: this.pageSize,
          pageNum: this.currentPage,
          associationId: this.userInfo.assoId,
          joinStatus: 1
        }
      }).then(res => {
        if (res && res.errorCode === 0 && res.data) {
          this.totalCount = res.data.totalCount
          this.memberList = this.handleMemberList(res.data.list)
        }
      })
    },
    fetchCheckedMemberIds () {
      this.$store.dispatch('association-student-join-ids-list', {
        params: {
          associationId: this.userInfo.assoId,
          joinStatus: 1
        }
      }).then(res => {
        if (res && res.errorCode === 0 && res.data) {
          this.checkedStudentIds = res.data
          console.log(this.checkedStudentIds)
        }
      })
    },
    handleMemberList (listData) {
      return listData.map(item => {
        return {
          id: item.id,
          name: item.name,
          sno: item.sno,
          class: item.name,
          academy: item.name,
          grade: item.grade
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
    addMemberList (studentIds) {
      this.$store.dispatch('association-student-join', {
        data: {
          associationId: this.userInfo.assoId,
          joinStatus: 1,
          studentIds: studentIds
        }
      }).then(res => {
        if (res && res.errorCode === 0) {
          this.$message.success('添加成功！')
          this.dialogShow = false
          this.fetchMemberList()
          this.fetchCheckedMemberIds()
        }
      })
    },
    deleteMember (id) {
      this.$confirm('确定删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('association-delete-student-join', {
          data: {
            studentId: id
          }
        }).then(res => {
          if (res && res.errorCode === 0) {
            this.$message.success('删除成功！')
            this.fetchMemberList()
          }
        })
      }).catch(() => {})
    }
  },
  watch: {
    '$route.query.currentPage' () {
      this.fetchMemberList()
    }
  },
  created () {
    this.fetchMemberList()
    this.fetchCheckedMemberIds()
  }
}
</script>

<style lang="less" scoped>
.member-list {
  margin-top: 15px;
}
</style>

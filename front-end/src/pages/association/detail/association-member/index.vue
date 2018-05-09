/*
 * File: index.vue
 * File Created: 2018-05-05 8:59:44 pm
 * Author: zhanghuancheng555 (1052745517@qq.com)
 * Copyright: 2017 - 2018 Your Company, Your Company
 * -----
 * Last Modified: 2018-05-07 4:40:38 pm
 * Modified By: zhanghuancheng555 (1052745517@qq.com>)
 */

<template>
  <div>
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

export default {
  name: 'association-member',
  props: {
    assoId: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      memberList: [],
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
    fetchMemberList () {
      this.$store.dispatch('association-student-join-list', {
        params: {
          pageSize: this.pageSize,
          pageNum: this.currentPage,
          associationId: this.assoId,
          joinStatus: 1
        }
      }).then(res => {
        if (res && res.errorCode === 0 && res.data) {
          this.totalCount = res.data.totalCount
          this.memberList = this.handleMemberList(res.data.list)
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
    }
  },
  created () {
    this.fetchMemberList()
  }
}
</script>

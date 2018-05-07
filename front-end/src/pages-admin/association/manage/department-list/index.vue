/*
 * File: index.vue
 * File Created: 2018-05-07 10:48:49 am
 * Author: zhanghuancheng555 (1052745517@qq.com)
 * Copyright: 2017 - 2018 Your Company, Your Company
 * -----
 * Last Modified: 2018-05-07 2:44:42 pm
 * Modified By: zhanghuancheng555 (1052745517@qq.com>)
 */

<template>
  <div>
    <el-button type="primary" size="small" @click.native="onDeptAddClick">添加部门</el-button>
    <el-table
      class="dept-list"
      style="width: 100%"
      align="center"
      :data="deptList"
      :stripe="true"
      :border="true">
      <el-table-column
        prop="name"
        align="center"
        label="部门名称">
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        width="300">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click.native="onDeptEditClick(scope.row.id)">编辑</el-button>
          <el-button type="danger" size="mini" @click="deleteDept(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'department-list',
  data () {
    return {
      deptList: []
    }
  },
  computed: {
    ...mapState([
      'userInfo'
    ])
  },
  methods: {
    fetchDeptList () {
      this.$store.dispatch('department-list', {
        params: {
          associationId: this.userInfo.assoId
        }
      }).then(res => {
        if (res && res.errorCode === 0 && res.data) {
          this.deptList = this.handleDeptList(res.data)
        }
      })
    },
    handleDeptList (listData) {
      return listData.map(item => {
        return {
          id: item.id,
          name: item.name
        }
      })
    },
    onDeptAddClick () {
      this.$router.push({
        name: 'admin-department-add'
      })
    },
    onDeptEditClick (id) {
      this.$router.push({
        name: 'admin-department-edit',
        query: {
          departmentId: id
        }
      })
    },
    deleteDept (id) {
      this.$confirm('是否删除？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('department-destroy', {
          data: {
            departmentId: id
          }
        }).then(res => {
          if (res && res.errorCode === 0) {
            this.$message.success('部门删除成功')
            this.fetchDeptList()
          }
        })
      }).catch(() => {})
    }
  },
  created () {
    this.fetchDeptList()
  }
}
</script>

<style lang="less" scoped>
.dept-list {
  margin-top: 15px;
}
</style>

/*
 * File: index.vue
 * File Created: 2018-05-05 8:59:44 pm
 * Author: zhanghuancheng555 (1052745517@qq.com)
 * Copyright: 2017 - 2018 Your Company, Your Company
 * -----
 * Last Modified: 2018-05-07 4:18:05 pm
 * Modified By: zhanghuancheng555 (1052745517@qq.com>)
 */

<template>
  <el-table
    class="dept-list"
    style="width: 50%"
    align="center"
    :data="deptList"
    :stripe="true"
    :border="true">
    <el-table-column
      align="center"
      label="部门名称">
      <template slot-scope="scope">
        <a href="javascript:;" @click="jumpToDeptDetail(scope.row.id)">{{ scope.row.name }}</a>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'association-dept',
  props: {
    assoId: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      deptList: []
    }
  },
  computed: {
    ...mapState([
      'pageSize'
    ])
  },
  methods: {
    fetchDeptList () {
      this.$store.dispatch('department-list', {
        params: {
          associationId: this.assoId
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
    jumpToDeptDetail (id) {
      this.$router.push({
        name: 'association-dept-detail',
        query: {
          deptId: id
        }
      })
    }
  },
  created () {
    this.fetchDeptList()
  }
}
</script>

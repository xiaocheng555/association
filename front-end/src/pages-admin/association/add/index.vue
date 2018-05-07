/*
 * File: index.vue
 * File Created: 2018-03-27 10:39:07 pm
 * Author: zhanghuancheng555 (1052745517@qq.com)
 * Copyright: 2017 - 2018 Your Company, Your Company
 * -----
 * Last Modified: 2018-05-07 2:34:08 am
 * Modified By: zhanghuancheng555 (1052745517@qq.com>)
 */

<template>
  <common-pannel title="社团管理" class="association-add">
    <el-row :gutter="20">
      <el-col :span="8">
        <association-list></association-list>
      </el-col>
      <el-col :span="16">
        <admin-list></admin-list>
      </el-col>
    </el-row>
  </common-pannel>
</template>

<script>
import { mapState } from 'vuex'
import CommonPannel from '@common/common-pannel'
import AdminList from './admin-list'
import AssociationList from './association-list'

export default {
  name: 'association-add',
  components: {
    CommonPannel,
    AssociationList,
    AdminList
  },
  data () {
    return {
      currentPage: 1,
      totalCount: 50,
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
    fetchAssociationList () {
      this.$store.dispatch('association-list', {
        params: {
          pageSize: this.pageSize,
          pageNum: this.currentPage
        }
      }).then((res) => {
        if (res && res.data && res.errorCode === 0) {
          let data = res.data
          this.totalCount = data.totalCount
          this.associationList = this.handleListData(res.data.list)
        } else {
          this.$message({
            type: 'error',
            message: '获取社团列表失败'
          })
        }
      }).catch(() => {
        this.$message({
          type: 'error',
          message: '获取社团列表失败'
        })
      })
    },
    // 数据转换
    handleListData (datalist) {
      return datalist.map(item => {
        return {
          id: item.id,
          name: item.name
        }
      })
    },
    toggleAssociation () {

    }
  },
  // 当路由参数改变时调用
  beforeRouteUpdate (to, from, next) {
    this.fetchAssociationList()
    next()
  },
  created () {

  }
}
</script>

<style>

</style>

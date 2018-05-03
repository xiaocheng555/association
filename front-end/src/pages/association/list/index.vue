/*
 * File: index.vue
 * File Created: 2018-03-28 8:34:08 pm
 * Author: zhanghuancheng555 (1052745517@qq.com)
 * Copyright: 2017 - 2018 Your Company, Your Company
 * -----
 * Last Modified: 2018-04-02 12:59:20 pm
 * Modified By: zhanghuancheng555 (1052745517@qq.com>)
 */
<template>
  <div class="association-list-page">
    <common-pannel title="社团">
      <div class="association-list">
        <el-row :gutter="20">
          <el-col
            v-for="(item, index) in associationList"
            :span="8"
            :key="index">
            <div>
              {{ item.name }}
            </div>
          </el-col>
        </el-row>
      </div>
      <el-pagination
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
import CommonPannel from '@common/common-pannel'

export default {
  name: 'association-list',
  components: {
    CommonPannel
  },
  data () {
    return {
      currentPage: 1,
      totalCount: 0,
      associationList: [],
      pageSize: 20
    }
  },
  // 当路由参数改变时调用
  beforeRouteUpdate (to, from, next) {
    this.fetchAssociationList()
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
    }
  },
  created () {
    this.fetchAssociationList()
  }
}
</script>

<style>

</style>

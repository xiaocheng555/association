/*
 * File: index.vue
 * File Created: 2018-03-28 8:34:08 pm
 * Author: zhanghuancheng555 (1052745517@qq.com)
 * Copyright: 2017 - 2018 Your Company, Your Company
 * -----
 * Last Modified: 2018-05-05 9:38:50 pm
 * Modified By: zhanghuancheng555 (1052745517@qq.com>)
 */
<template>
  <div class="association-list">
    <common-pannel title="社团">
      <el-row :gutter="30">
        <el-col
          class="association-list-item"
          v-for="item in associationList"
          :span="8"
          :sm="8"
          :md="8"
          :lg="6"
          :key="item.id">
          <el-card
            class="association-card"
            :body-style="{ padding: '0px' }"
            :alt="item.name"
            @click.native="jumpToAssoDetail(item)">
            <img class="association-image" src="../../../assets/images/user.jpg">
            <div style="padding: 14px;">
              <span>{{ item.name }}</span>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <el-pagination
        class="association-list-pagination"
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
    },
    jumpToAssoDetail (item) {
      this.$router.push({
        name: 'association-detail',
        query: {
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

<style lang="less" scoped>
.association-list {
  .association-list-item {
    margin-bottom: 30px;
  }

  .association-card {
    cursor: pointer;
  }

  .association-image {
    width: 100%;
    height: 200px;
    display: block;
  }

  .association-list-pagination {
    margin-top: 10px;
    padding-bottom: 20px;
    text-align: center;
  }
}
</style>

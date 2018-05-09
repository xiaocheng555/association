/*
 * File: index.vue
 * File Created: 2018-05-06 6:51:58 pm
 * Author: zhanghuancheng555 (1052745517@qq.com)
 * Copyright: 2017 - 2018 Your Company, Your Company
 * -----
 * Last Modified: 2018-05-07 5:49:55 pm
 * Modified By: zhanghuancheng555 (1052745517@qq.com>)
 */

<template>
  <el-card>
    <div slot="header">
      <span>我的社团</span>
    </div>
    <el-table
      :data="associationList"
      :stripe="true"
      :border="true"
      style="width: 100%">
      <el-table-column
        align="center"
        label="社团名称">
        <template slot-scope="scope">
          <a href="javascript:;" @click="jumpToAssoDetail(scope.row)">{{ scope.row.name }}</a>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'user',
  components: {

  },
  data () {
    return {
      associationList: []
    }
  },
  computed: {
    ...mapState(['userInfo'])
  },
  methods: {
    // 获取列表数据
    fetchAssociationList () {
      this.$store.dispatch('association-student-join-asso-list', {
        params: {
          studentId: this.userInfo.id
        }
      }).then((res) => {
        if (res && res.data && res.errorCode === 0) {
          this.associationList = this.handleListData(res.data)
        }
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

</style>

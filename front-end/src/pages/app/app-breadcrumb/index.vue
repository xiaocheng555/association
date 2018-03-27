/*
 * File: index.vue
 * File Created: 2018-03-26 1:03:49 am
 * Author: zhanghuancheng555 (1052745517@qq.com)
 * Copyright: 2017 - 2018 Your Company, Your Company
 * -----
 * Last Modified: 2018-03-27 9:13:04 pm
 * Modified By: zhanghuancheng555 (1052745517@qq.com>)
 */

<template>
  <div class="app-breadcrumb">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <div class="location fl">您的位置： </div>
      <el-breadcrumb-item
        v-for="(item, index) in mapList"
        :key="index"
        :to="{ name: item.route }">
       {{ item.name }}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
import breadcrumbConfig from '@/config/breadcrumb-config'

export default {
  name: 'app-breadcrumb',
  data () {
    return {
      mapList: []
    }
  },
  methods: {
    initMapList (route) {
      let currRouteName = route.name
      for (let item in breadcrumbConfig) {
        if (item === currRouteName) {
          this.mapList = breadcrumbConfig[item]
        }
      }
    }
  },
  created () {
    this.$router.afterEach((to, from) => {
      this.initMapList(to)
    })
  }
}
</script>

<style lang="less" scoped>
.app-breadcrumb {
  .location {
    padding-left: 10px;
    padding-right: 10px;
  }
}
</style>

/*
 * File: index.vue
 * File Created: 2018-03-26 1:03:49 am
 * Author: zhanghuancheng555 (1052745517@qq.com)
 * Copyright: 2017 - 2018 Your Company, Your Company
 * -----
 * Last Modified: 2018-03-26 10:42:09 pm
 * Modified By: zhanghuancheng555 (1052745517@qq.com>)
 */

<template>
  <div class="app-breadcrumb">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <div class="fl">您当前的位置： </div>
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
  created () {
    this.$router.beforeEach((to, from, next) => {
      let currRouteName = to.name
      for (let item in breadcrumbConfig) {
        if (item === currRouteName) {
          this.mapList = breadcrumbConfig[item]
        }
      }
      next()
    })
  }
}
</script>

<style lang="less" scoped>

</style>

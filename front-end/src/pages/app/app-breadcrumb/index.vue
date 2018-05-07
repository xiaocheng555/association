/*
 * File: index.vue
 * File Created: 2018-03-26 1:03:49 am
 * Author: zhanghuancheng555 (1052745517@qq.com)
 * Copyright: 2017 - 2018 Your Company, Your Company
 * -----
 * Last Modified: 2018-05-05 10:48:54 pm
 * Modified By: zhanghuancheng555 (1052745517@qq.com>)
 */

<template>
  <div class="app-breadcrumb">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <div class="location fl">您的位置： </div>
      <el-breadcrumb-item
        v-for="(item, index) in mapList"
        :key="index"
        :to="setRoute(item)">
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
          let currBreadcrumb = breadcrumbConfig[item]
          let lastRoute = currBreadcrumb[currBreadcrumb.length - 1]
          if (JSON.stringify(route.query) !== '{}') {
            lastRoute.query = route.query
          }
          if (JSON.stringify(route.params) !== '{}') {
            lastRoute.query = route.params
          }
          let mapListTemp = JSON.parse(JSON.stringify(currBreadcrumb))
          // 将面包屑最后一个路由设置为空，效果->点击该路由不跳转
          mapListTemp[mapListTemp.length - 1].route = ''
          this.mapList = mapListTemp
        }
      }
    },
    setRoute (item) {
      if (item.route === '') {
        return ''
      } else {
        return {
          name: item.route,
          query: item.query ? item.query : {},
          params: item.params ? item.params : {}
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

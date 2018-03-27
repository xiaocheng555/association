/*
 * File: index.vue
 * File Created: 2018-03-25 7:11:32 pm
 * Author: zhanghuancheng555 (1052745517@qq.com)
 * Copyright: 2017 - 2018 Your Company, Your Company
 * -----
 * Last Modified: 2018-03-28 1:41:35 am
 * Modified By: zhanghuancheng555 (1052745517@qq.com>)
 */

<template>
  <div class="app-side-menu">
    <el-menu
      :default-active="activeIndex"
      class="el-menu">
      <template
        v-for="(item, index) in menuList">
        <!-- 一级导航 -->
        <el-menu-item
          v-if="!item.submenus"
          :key="index"
          :index="item.index">
          <router-link :to="{ name: item.route }" tag="p">
            <i :class="item.icon"></i>
            <span>{{ item.name }}</span>
          </router-link>
        </el-menu-item>
        <!-- 二级导航 -->
        <el-submenu
          v-else
          :key="index"
          :index="item.index">
          <template slot="title">
            <i :class="item.icon"></i>
            <span>{{ item.name }}</span>
          </template>
          <el-menu-item
            v-for="(subItem, subIndex) in item.submenus"
            :key="subIndex"
            :index="subItem.index">
            {{ subItem.name }}
          </el-menu-item>
        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'app-side-menu',
  data () {
    return {
      activeIndex: '1',
      menuList: [
        {
          index: '1',
          route: 'home',
          icon: 'iconfont icon-home',
          name: '首页'
        },
        {
          index: '2',
          route: 'activity-list',
          icon: 'iconfont icon-carryout',
          name: '活动'
        },
        {
          index: '3',
          route: 'notice-list',
          icon: 'iconfont icon-notification',
          name: '公告'
        },
        {
          index: '4',
          route: '',
          icon: 'iconfont icon-team',
          name: '社团'
        },
        {
          index: '5',
          route: null,
          icon: 'iconfont icon-setting',
          name: '后台管理',
          submenus: [
            {
              index: '5-1',
              route: 'admin',
              name: '公告管理'
            },
            {
              index: '5-1',
              route: 'admin',
              name: '活动管理'
            },
            {
              index: '5-1',
              route: 'admin',
              name: '社团管理'
            }
          ]
        }
      ]
    }
  },
  created () {
    this.$router.afterEach((to, from) => {
      this.menuList.forEach(menu => {
        if (typeof menu.submenu === 'undefined') {
          if (to.name === menu.route) {
            this.activeIndex = menu.index
          }
        } else {
          menu.submenus.forEach(submenu => {
            if (to.name === submenu.route) {
              this.activeIndex = submenu.index
            }
          })
        }
      })
    })
  }
}
</script>

<style lang="less" scoped>
.app-side-menu {
  .iconfont {
    margin-right: 3px;
  }
}
</style>

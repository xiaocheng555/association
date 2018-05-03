/*
 * File: index.vue
 * File Created: 2018-03-25 7:11:32 pm
 * Author: zhanghuancheng555 (1052745517@qq.com)
 * Copyright: 2017 - 2018 Your Company, Your Company
 * -----
 * Last Modified: 2018-05-03 7:46:14 pm
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
        <!-- 二级导航、社团管理员 -->
        <template v-if="item.show">
          <el-submenu
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
                <router-link :to="{ name: subItem.route }" tag="p">
                  {{ subItem.name }}
                </router-link>
              </el-menu-item>
          </el-submenu>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'app-side-menu',
  data () {
    let userInfo = this.$store.state.userInfo
    let isAdmin = userInfo.id && userInfo.isAdmin
    let isSystemAdmin = userInfo.isSystem
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
          route: 'association-list',
          icon: 'iconfont icon-team',
          name: '社团'
        },
        // 社团管理员
        {
          index: '5',
          route: null,
          icon: 'iconfont icon-setting',
          name: '后台管理',
          show: isAdmin && !isSystemAdmin,
          state: 'assoAdmin',
          submenus: [
            {
              index: '5-1',
              route: 'admin-notice-list',
              name: '公告管理'
            },
            {
              index: '5-2',
              route: 'admin-activity-list',
              name: '活动管理'
            },
            {
              index: '5-3',
              route: 'admin-association-list',
              name: '社团管理'
            }
          ]
        },
        // 系统管理员
        {
          index: '6',
          route: null,
          icon: 'iconfont icon-setting',
          name: '后台管理',
          state: 'systemAdmin',
          show: isAdmin && isSystemAdmin,
          submenus: [
            {
              index: '6-1',
              route: 'admin-notice-list',
              name: '公告管理'
            },
            {
              index: '6-2',
              route: 'activity-approve-list',
              name: '活动审批'
            },
            {
              index: '6-3',
              route: 'admin-association-list',
              name: '社团管理'
            }
          ]
        }
      ]
    }
  },
  computed: {
    ...mapState(['userInfo'])
  },
  methods: {
    updateMenuList () {
      let isAdmin = this.userInfo.id && this.userInfo.isAdmin
      let isSystemAdmin = this.userInfo.isSystem
      this.menuList.forEach(item => {
        if (item.state === 'assoAdmin') {
          item.show = isAdmin && !isSystemAdmin
        } else if (item.state === 'systemAdmin') {
          item.show = isAdmin && isSystemAdmin
        }
      })
    }
  },
  watch: {
    'userInfo.isAdmin' () {
      console.log(123)
      this.updateMenuList()
    }
  },
  created () {
    // 侧边栏导航跟随路由激活
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

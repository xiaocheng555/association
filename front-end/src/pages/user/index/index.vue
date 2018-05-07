/*
 * File: index.vue
 * File Created: 2018-05-06 6:09:46 pm
 * Author: zhanghuancheng555 (1052745517@qq.com)
 * Copyright: 2017 - 2018 Your Company, Your Company
 * -----
 * Last Modified: 2018-05-06 11:26:04 pm
 * Modified By: zhanghuancheng555 (1052745517@qq.com>)
 */

<template>
  <common-pannel title="个人中心" class="user-page">
    <el-row :gutter="20">
      <el-col :span="6">
        <el-card class="user-subnav" :body-style="{ padding: '0px' }">
          <div slot="header">
            <i class="iconfont icon-user"></i>
            <span>{{ userInfo.name }}</span>
          </div>
          <ul class="user-subnav">
            <li
              v-for="nav in userNavs"
              :key="nav.state">
              <a
                class="user-subnav-link"
                :class="{ 'active': nav.state === activeNavState }"
                href="javascript:;"
                @click="toggleView(nav.state)">
                {{ nav.name }}
                <i class="user-subnav-icon" :class="nav.icon"></i>
              </a>
            </li>
          </ul>
        </el-card>
      </el-col>
      <el-col :span="18">
        <router-view></router-view>
      </el-col>
    </el-row>
  </common-pannel>
</template>

<script>
import { mapState } from 'vuex'
import CommonPannel from '@common/common-pannel'

export default {
  name: 'info',
  components: {
    CommonPannel
  },
  data () {
    return {
      activeNavState: 'info',
      userNavs: [
        {
          name: '个人信息',
          icon: 'iconfont icon-contacts',
          state: 'info'
        },
        {
          name: '我的活动',
          icon: 'iconfont icon-carryout',
          state: 'act'
        },
        {
          name: '我的社团',
          icon: 'iconfont icon-team',
          state: 'asso'
        },
        {
          name: '修改密码',
          icon: 'iconfont icon-heart-o',
          state: 'password'
        }
      ]
    }
  },
  computed: {
    ...mapState(['userInfo'])
  },
  methods: {
    toggleView (state) {
      this.activeNavState = state
      let route = ''
      switch (state) {
        case 'info':
          route = 'user-info'
          break
        case 'act':
          route = 'user-join-activity'
          break
        case 'asso':
          route = 'user-join-association'
          break
        case 'password':
          route = 'user-change-password'
          break
      }
      this.$router.push({
        name: route,
        query: {
          state: state
        }
      })
    }
  },
  created () {
    let _state = this.$route.query.state
    if (_state) {
      this.activeNavState = _state
    }
  }
}
</script>

<style lang="less" scoped>
.user-subnav {

  .user-subnav-link {
    display: block;
    position: relative;
    padding: 15px 25px;
    font-size: 14px;
    color: #444;

    &:hover,
    &.active {
      background-color: #f4f4f4;
    }
  }

  .user-subnav-icon {
    position: absolute;
    top: 15px;
    right: 20px;
  }
}
</style>

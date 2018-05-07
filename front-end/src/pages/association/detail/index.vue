/*
 * File: index.vue
 * File Created: 2018-03-28 8:34:08 pm
 * Author: zhanghuancheng555 (1052745517@qq.com)
 * Copyright: 2017 - 2018 Your Company, Your Company
 * -----
 * Last Modified: 2018-05-07 4:07:36 pm
 * Modified By: zhanghuancheng555 (1052745517@qq.com>)
 */
<template>
  <div class="association-detail">
    <common-pannel :title="assoName">
      <el-button
        slot="right"
        type="primary"
        size="mini"
        plain
        @click="joinAssociation">申请加入</el-button>
      <el-tabs
        class="association-tabs"
        type="border-card"
        v-model="activeName"
        @tab-click="tabToggle">
        <el-tab-pane name="introduce">
          <span slot="label"><i class="iconfont icon-team"></i> 社团介绍</span>
          <association-introduce
            v-if="activeName === 'introduce'"
            :assoId="assoId">
          </association-introduce>
        </el-tab-pane>
        <el-tab-pane name="notice">
          <span slot="label"><i class="iconfont icon-notification"></i> 社团公告</span>
          <association-notice
            v-if="activeName === 'notice'"
            :assoId="assoId">
          </association-notice>
        </el-tab-pane>
        <el-tab-pane name="activity">
          <span slot="label"><i class="iconfont icon-carryout"></i> 社团活动</span>
          <association-activity
            v-if="activeName === 'activity'"
            :assoId="assoId">
          </association-activity>
        </el-tab-pane>
        <el-tab-pane name="department">
          <span slot="label"><i class="iconfont icon-flag"></i> 部门</span>
          <association-dept
            v-if="activeName === 'department'"
            :assoId="assoId"></association-dept>
        </el-tab-pane>
        <el-tab-pane name="member">
          <span slot="label"><i class="iconfont icon-heart-o"></i> 会员</span>
          会员
        </el-tab-pane>
      </el-tabs>
    </common-pannel>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import CommonPannel from '@common/common-pannel'
import AssociationIntroduce from './association-introduce'
import AssociationNotice from './association-notice'
import AssociationActivity from './association-activity'
import AssociationDept from './association-dept'

export default {
  name: 'association-detail',
  components: {
    CommonPannel,
    AssociationIntroduce,
    AssociationNotice,
    AssociationActivity,
    AssociationDept
  },
  props: {
    assoId: {
      type: Number,
      required: true
    },
    assoName: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      activeName: 'introduce'
    }
  },
  computed: {
    ...mapState([
      'userInfo'
    ])
  },
  methods: {
    joinAssociation () {
      if (this.userInfo.isAdmin) {
        this.$message.warning('管理员不能申请加入社团')
        return
      }
      this.$store.dispatch('association-student-join', {
        data: {
          associationId: this.assoId,
          joinStatus: 0,
          studentIds: [this.userInfo.id]
        }
      }).then(res => {
        if (res && res.errorCode === 0) {
          this.$message.success('申请成功！')
        }
      })
    },
    tabToggle () {
      let _query = this.$route.query
      this.$router.push({
        query: {
          id: _query.id,
          name: _query.name,
          tab: this.activeName
        }
      })
    }
  },
  created () {
    let _activeName = this.$route.query.tab
    if (typeof _activeName !== 'undefined') {
      this.activeName = _activeName
    }
  }
}
</script>

<style lang="less" scoped>
.association-detail {
  .association-tabs {
    min-height: 380px;
  }
}
</style>

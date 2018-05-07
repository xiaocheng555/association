/*
 * File: index.vue
 * File Created: 2018-05-06 6:51:58 pm
 * Author: zhanghuancheng555 (1052745517@qq.com)
 * Copyright: 2017 - 2018 Your Company, Your Company
 * -----
 * Last Modified: 2018-05-06 7:47:32 pm
 * Modified By: zhanghuancheng555 (1052745517@qq.com>)
 */

<template>
  <el-card class="user-subnav">
    <div slot="header">
      <span>我的社团</span>
    </div>
    <div class="user-subnav">
      我的社团
    </div>
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

    }
  },
  computed: {
    ...mapState(['userInfo'])
  },
  methods: {

  }
}
</script>

<style lang="less" scoped>

</style>

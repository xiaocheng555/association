/*
 * File: index.vue
 * File Created: 2018-03-27 10:39:07 pm
 * Author: zhanghuancheng555 (1052745517@qq.com)
 * Copyright: 2017 - 2018 Your Company, Your Company
 * -----
 * Last Modified: 2018-03-28 11:45:17 pm
 * Modified By: zhanghuancheng555 (1052745517@qq.com>)
 */

<template>
  <div class="association-manage">
    <common-pannel title="社团管理">

    </common-pannel>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import CommonPannel from '@common/common-pannel'

export default {
  name: 'association-manage',
  components: {
    CommonPannel
  },
  data () {
    return {
      currentPage: 1,
      totalCount: 50,
      activityList: []
    }
  },
  computed: {
    ...mapState([
      'pageSize'
    ])
  },
  methods: {

  },
  created () {

  }
}
</script>

<style>

</style>

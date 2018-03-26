/*
 * File: index.vue
 * File Created: 2018-03-26 2:12:46 am
 * Author: zhanghuancheng555 (1052745517@qq.com)
 * Copyright: 2017 - 2018 Your Company, Your Company
 * -----
 * Last Modified: 2018-03-26 2:39:17 am
 * Modified By: zhanghuancheng555 (1052745517@qq.com>)
 */

<template>
  <div class="common-pannel">
    <div class="pannel-title pd15" v-if="title">
      {{ title }}
    </div>
    <div class="pannel-body pd15" v-if="title">
      21ew
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'common-pannel',
  props: {
    title: {
      type: String
    }
  },
  data () {
    return {

    }
  },
  created () {
  }
}
</script>
  2
<style lang="less" scoped>
.common-pannel {
  border-radius: 15px;
  background-color: #ffffff;
}

.pannel-title {
  border-bottom: 1px solid #dddddd;
}
</style>

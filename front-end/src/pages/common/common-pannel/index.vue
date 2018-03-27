/*
 * File: index.vue
 * File Created: 2018-03-26 2:12:46 am
 * Author: zhanghuancheng555 (1052745517@qq.com)
 * Copyright: 2017 - 2018 Your Company, Your Company
 * -----
 * Last Modified: 2018-03-28 12:51:24 am
 * Modified By: zhanghuancheng555 (1052745517@qq.com>)
 */

<template>
  <div class="common-pannel">
    <h2 class="pannel-title" v-if="title">
      {{ title }}
    </h2>
    <div class="pannel-body" v-if="title">
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

<style lang="less" scoped>
@import '../../../assets/styles/variable.less';

.common-pannel {
  margin-top: 20px;
  border-radius: 10px;
  border: 1px solid @default-border-color;
  background-color: #ffffff;
}

.pannel-title {
  position: relative;
  padding: 15px 20px 15px;
  font-size: 18px;

  &:after {
    content: "";
    position: absolute;
    display: block;
    left: 20px;
    right: 20px;
    bottom: 0px;
    border-bottom: 1px solid @default-border-color;
  }
}

.pannel-body {
  padding: 20px 20px 50px;
}
</style>

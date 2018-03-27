/*
 * File: index.vue
 * File Created: 2018-03-26 2:12:46 am
 * Author: zhanghuancheng555 (1052745517@qq.com)
 * Copyright: 2017 - 2018 Your Company, Your Company
 * -----
 * Last Modified: 2018-03-27 1:02:43 pm
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
  padding: 15px 15px 10px;
  font-size: 18px;

  &:after {
    content: "";
    position: absolute;
    display: block;
    left: 15px;
    right: 15px;
    bottom: 0px;
    border-bottom: 1px solid @default-border-color;
  }
}

.pannel-body {
  padding: 15px;
}
</style>

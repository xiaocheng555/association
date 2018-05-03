/*
 * File: index.vue
 * File Created: 2018-03-26 2:12:46 am
 * Author: zhanghuancheng555 (1052745517@qq.com)
 * Copyright: 2017 - 2018 Your Company, Your Company
 * -----
 * Last Modified: 2018-05-03 7:24:50 pm
 * Modified By: zhanghuancheng555 (1052745517@qq.com>)
 */

<template>
  <div class="common-pannel">
    <header class="pannel-header">
      <h2 class="pannel-title" v-if="title">
        {{ title }}
      </h2>
      <div class="pannel-header-right">
        <slot name="right"></slot>
      </div>
    </header>
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
  position: relative;
  min-height: 500px;
  margin-top: 20px;
  border-radius: 2px;
  border: 1px solid @default-border-color;
  background-color: #ffffff;
}

.pannel-header {
  position: relative;
}

.pannel-title {
  position: relative;
  padding: 15px 20px 15px;
  font-size: 18px;
  font-weight: 100;

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

.pannel-header-right {
  position: absolute;
  right: 25px;
  top: 18px;
}

.pannel-body {
  padding: 20px 20px 20px;
}
</style>

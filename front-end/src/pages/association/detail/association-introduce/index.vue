/*
 * File: index.vue
 * File Created: 2018-05-05 8:59:44 pm
 * Author: zhanghuancheng555 (1052745517@qq.com)
 * Copyright: 2017 - 2018 Your Company, Your Company
 * -----
 * Last Modified: 2018-05-05 9:01:55 pm
 * Modified By: zhanghuancheng555 (1052745517@qq.com>)
 */

<template>
  <div v-html="assoIntroduction"></div>
</template>

<script>
export default {
  name: 'association-introduce',
  props: {
    assoId: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      assoIntroduction: ''
    }
  },
  methods: {
    fetchAssociation () {
      this.$store.dispatch('association-detail', {
        params: {
          id: this.assoId
        }
      }).then(res => {
        if (res && res.errorCode === 0 && res.data) {
          this.assoIntroduction = res.data.introduction
        }
      })
    }
  },
  created () {
    this.fetchAssociation()
  }
}
</script>

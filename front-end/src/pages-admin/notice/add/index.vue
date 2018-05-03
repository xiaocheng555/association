/*
 * File: index.vue
 * File Created: 2018-05-02 11:28:45 am
 * Author: zhanghuancheng555 (1052745517@qq.com)
 * Copyright: 2017 - 2018 Your Company, Your Company
 * -----
 * Last Modified: 2018-05-02 4:05:04 pm
 * Modified By: zhanghuancheng555 (1052745517@qq.com>)
 */

<template>
  <common-pannel title="添加公告">
    <notice-form @submit="submitForm"></notice-form>
  </common-pannel>
</template>

<script>
import { mapState } from 'vuex'
import CommonPannel from '@common/common-pannel'
import NoticeForm from '@common/notice-form'

export default {
  name: 'notice-add',
  components: {
    CommonPannel,
    NoticeForm
  },
  computed: {
    ...mapState([
      'userInfo'
    ])
  },
  methods: {
    submitForm (form) {
      this.$store.dispatch('notice-create', {
        data: {
          name: form.name,
          content: form.content,
          adminId: this.userInfo.id,
          associationId: this.userInfo.assoId
        }
      }).then(data => {
        this.$message.success('公告添加成功')
        this.$router.push({
          name: 'admin-notice-list'
        })
      })
    }
  }
}
</script>

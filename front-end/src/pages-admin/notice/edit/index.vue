/*
 * File: index.vue
 * File Created: 2018-05-02 11:28:50 am
 * Author: zhanghuancheng555 (1052745517@qq.com)
 * Copyright: 2017 - 2018 Your Company, Your Company
 * -----
 * Last Modified: 2018-05-03 1:27:18 am
 * Modified By: zhanghuancheng555 (1052745517@qq.com>)
 */

<template>
  <div>
    <common-pannel title="编辑公告">
      <notice-form ref="noticeForm"  @submit="submitForm"></notice-form>
    </common-pannel>
  </div>
</template>

<script>
import CommonPannel from '@common/common-pannel'
import NoticeForm from '@common/notice-form'

export default {
  name: 'notice-add',
  components: {
    CommonPannel,
    NoticeForm
  },
  props: {
    noticeId: {
      type: Number
    }
  },
  methods: {
    initNoticeForm () {
      this.$store.dispatch('notice-detail', {
        params: {
          id: this.noticeId
        }
      }).then(res => {
        if (res && res.errorCode === 0 && res.data) {
          this.$refs['noticeForm'].changeFormData({
            name: res.data.name,
            content: res.data.content
          })
        }
      })
    },
    submitForm (form) {
      this.$store.dispatch('notice-update', {
        data: {
          name: form.name,
          content: form.content,
          id: this.noticeId
        }
      }).then(data => {
        this.$message.success('公告编辑成功')
        this.$router.push({
          name: 'admin-notice-list'
        })
      })
    }
  },
  created () {
    this.initNoticeForm()
  }
}
</script>

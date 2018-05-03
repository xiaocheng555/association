/*
 * File: index.vue
 * File Created: 2018-05-02 11:28:50 am
 * Author: zhanghuancheng555 (1052745517@qq.com)
 * Copyright: 2017 - 2018 Your Company, Your Company
 * -----
 * Last Modified: 2018-05-03 1:42:38 am
 * Modified By: zhanghuancheng555 (1052745517@qq.com>)
 */

<template>
  <common-pannel title="编辑活动">
    <activity-form ref="activityForm" @submit="submitForm"></activity-form>
  </common-pannel>
</template>

<script>
import CommonPannel from '@common/common-pannel'
import ActivityForm from '@common/activity-form'

export default {
  name: 'activity-edit',
  components: {
    CommonPannel,
    ActivityForm
  },
  props: {
    actId: {
      type: Number
    }
  },
  methods: {
    initActivityForm () {
      this.$store.dispatch('activity-detail', {
        params: {
          id: this.actId
        }
      }).then(res => {
        if (res && res.errorCode === 0 && res.data) {
          this.$refs['activityForm'].changeFormData({
            name: res.data.name,
            startTime: res.data.startTime,
            endTime: res.data.endTime,
            score: res.data.score,
            director: res.data.director,
            tel: res.data.directorTel,
            content: res.data.content
          })
        }
      })
    },
    submitForm (form) {
      this.$store.dispatch('activity-update', {
        data: {
          name: form.name,
          startTime: form.startTime,
          endTime: form.endTime,
          score: form.score,
          director: form.director,
          directorTel: form.tel,
          content: form.content,
          id: this.actId
        }
      }).then(data => {
        this.$message.success('活动编辑成功')
        this.$router.push({
          name: 'admin-activity-list'
        })
      })
    }
  },
  created () {
    this.initActivityForm()
  }
}
</script>

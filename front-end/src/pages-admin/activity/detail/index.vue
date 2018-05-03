/*
 * File: index.vue
 * File Created: 2018-05-02 11:28:50 am
 * Author: zhanghuancheng555 (1052745517@qq.com)
 * Copyright: 2017 - 2018 Your Company, Your Company
 * -----
 * Last Modified: 2018-05-04 1:24:34 am
 * Modified By: zhanghuancheng555 (1052745517@qq.com>)
 */

<template>
  <common-pannel title="活动详情">
    <activity-form
      ref="activityForm"
      :readonly="true"
      :show-submit-btn="false">
    </activity-form>
  </common-pannel>
</template>

<script>
import CommonPannel from '@common/common-pannel'
import ActivityForm from '@common/activity-form'

export default {
  name: 'admin-activity-detail',
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
    }
  },
  created () {
    this.initActivityForm()
  }
}
</script>

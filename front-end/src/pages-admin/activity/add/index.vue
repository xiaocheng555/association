/*
 * File: index.vue
 * File Created: 2018-05-02 11:28:45 am
 * Author: zhanghuancheng555 (1052745517@qq.com)
 * Copyright: 2017 - 2018 Your Company, Your Company
 * -----
 * Last Modified: 2018-05-03 1:15:03 am
 * Modified By: zhanghuancheng555 (1052745517@qq.com>)
 */

<template>
  <common-pannel title="添加活动">
    <activity-form @submit="submitForm"></activity-form>
  </common-pannel>
</template>

<script>
import { mapState } from 'vuex'
import CommonPannel from '@common/common-pannel'
import ActivityForm from '@common/activity-form'

export default {
  name: 'activity-add',
  components: {
    CommonPannel,
    ActivityForm
  },
  computed: {
    ...mapState([
      'userInfo'
    ])
  },
  methods: {
    submitForm (form) {
      this.$store.dispatch('activity-create', {
        data: {
          name: form.name,
          startTime: form.startTime,
          endTime: form.endTime,
          score: form.score,
          director: form.director,
          directorTel: form.tel,
          content: form.content,
          adminId: this.userInfo.id,
          associationId: this.userInfo.assoId
        }
      }).then(data => {
        this.$message.success('活动添加成功')
        this.$router.push({
          name: 'admin-activity-list'
        })
      })
    }
  }
}
</script>

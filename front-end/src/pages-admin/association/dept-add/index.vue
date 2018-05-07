/*
 * File: index.vue
 * File Created: 2018-05-02 11:28:45 am
 * Author: zhanghuancheng555 (1052745517@qq.com)
 * Copyright: 2017 - 2018 Your Company, Your Company
 * -----
 * Last Modified: 2018-05-07 2:34:48 pm
 * Modified By: zhanghuancheng555 (1052745517@qq.com>)
 */

<template>
  <common-pannel title="添加部门">
    <dept-form @submit="submitForm"></dept-form>
  </common-pannel>
</template>

<script>
import { mapState } from 'vuex'
import CommonPannel from '@common/common-pannel'
import DeptForm from '@common/dept-form'

export default {
  name: 'dept-add',
  components: {
    CommonPannel,
    DeptForm
  },
  computed: {
    ...mapState([
      'userInfo'
    ])
  },
  methods: {
    submitForm (form) {
      this.$store.dispatch('department-create', {
        data: {
          name: form.name,
          introduce: form.introduce,
          associationId: this.userInfo.assoId
        }
      }).then(data => {
        this.$message.success('部门添加成功')
        this.$router.push({
          name: 'admin-association-manage_department-list',
          query: {
            tab: 'dept'
          }
        })
      })
    }
  }
}
</script>

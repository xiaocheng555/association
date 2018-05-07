/*
 * File: index.vue
 * File Created: 2018-05-02 11:28:50 am
 * Author: zhanghuancheng555 (1052745517@qq.com)
 * Copyright: 2017 - 2018 Your Company, Your Company
 * -----
 * Last Modified: 2018-05-07 2:45:20 pm
 * Modified By: zhanghuancheng555 (1052745517@qq.com>)
 */

<template>
  <div>
    <common-pannel title="编辑部门">
      <dept-form ref="deptForm"  @submit="submitForm"></dept-form>
    </common-pannel>
  </div>
</template>

<script>
import CommonPannel from '@common/common-pannel'
import DeptForm from '@common/dept-form'

export default {
  name: 'dept-edit',
  components: {
    CommonPannel,
    DeptForm
  },
  props: {
    departmentId: {
      type: Number
    }
  },
  methods: {
    initDeptForm () {
      this.$store.dispatch('department-detail', {
        params: {
          departmentId: this.departmentId
        }
      }).then(res => {
        if (res && res.errorCode === 0 && res.data) {
          this.$refs['deptForm'].changeFormData({
            name: res.data.name,
            introduce: res.data.introduce
          })
        }
      })
    },
    submitForm (form) {
      this.$store.dispatch('department-save', {
        data: {
          name: form.name,
          introduce: form.introduce,
          departmentId: this.departmentId
        }
      }).then(data => {
        this.$message.success('部门编辑成功')
        this.$router.push({
          name: 'admin-association-manage_department-list',
          query: {
            tab: 'dept'
          }
        })
      })
    }
  },
  created () {
    this.initDeptForm()
  }
}
</script>

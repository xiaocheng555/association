/*
 * File: index.vue
 * File Created: 2018-05-06 6:51:58 pm
 * Author: zhanghuancheng555 (1052745517@qq.com)
 * Copyright: 2017 - 2018 Your Company, Your Company
 * -----
 * Last Modified: 2018-05-07 12:34:35 am
 * Modified By: zhanghuancheng555 (1052745517@qq.com>)
 */

<template>
  <el-card class="user-change-password">
    <div slot="header">
      <span>修改密码</span>
    </div>
    <el-form
      :model="ruleForm"
      :rules="rules"
      status-icon
      ref="ruleForm"
      label-width="100px"
      class="ruleForm">
      <el-form-item label="原来密码" prop="oldPassword">
        <el-input v-model="ruleForm.oldPassword"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="newPassword">
        <el-input v-model="ruleForm.newPassword"></el-input>
      </el-form-item>
      <el-form-item label="确认新密码" prop="newPasswordAgain">
        <el-input v-model="ruleForm.newPasswordAgain"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="medium" @click.native="submitFrom">确 认</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'user-change-password',
  data () {
    return {
      ruleForm: {
        oldPassword: '',
        newPassword: '',
        newPasswordAgain: ''
      },
      rules: {
        oldPassword: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        newPassword: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        newPasswordAgain: [
          { required: true, message: '不能为空', trigger: 'blur' },
          {
            validator: (rule, value, callback) => {
              if (value !== this.ruleForm.newPassword) {
                callback(new Error('两次密码输入不一致'))
              } else {
                callback()
              }
            },
            trigger: 'blur'
          }
        ]
      }
    }
  },
  computed: {
    ...mapState(['userInfo'])
  },
  methods: {
    submitFrom () {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          this.$store.dispatch('student-change-password', {
            data: {
              studentId: this.userInfo.id,
              oldPassword: this.ruleForm.oldPassword,
              newPassword: this.ruleForm.newPassword
            }
          }).then(res => {
            if (res && res.errorCode === 0) {
              this.$message.success('修改密码成功')
              this.resetForm()
            }
          })
        }
      })
    },
    resetForm () {
      this.ruleForm.oldPassword = ''
      this.ruleForm.newPassword = ''
      this.ruleForm.newPasswordAgain = ''
    }
  }
}
</script>

<style lang="less" scoped>
.user-change-password {
  .ruleForm {
    width: 400px;
    margin: 0 auto;
    padding-top: 30px;
    padding-bottom: 30px;
  }
}
</style>

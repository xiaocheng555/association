/*
 * File: index.vue
 * File Created: 2018-05-02 11:23:15 am
 * Author: zhanghuancheng555 (1052745517@qq.com)
 * Copyright: 2017 - 2018 Your Company, Your Company
 * -----
 * Last Modified: 2018-05-07 2:35:14 pm
 * Modified By: zhanghuancheng555 (1052745517@qq.com>)
 */

<template>
  <el-form ref="form" :model="ruleForm" :rules="rules" label-width="100px">
    <el-form-item label="部门名称" prop="name">
      <el-input
        placeholder="部门名称"
        v-model="ruleForm.name"
        clearable>
      </el-input>
    </el-form-item>
    <el-form-item label="部门介绍" prop="introduce">
      <editor v-model="ruleForm.introduce"></editor>
    </el-form-item>
    <el-form-item>
      <el-button
        type="primary"
        size="small"
        @click="submitForm">提 交</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import Editor from '../editor'

export default {
  name: 'notice-form',
  components: {
    Editor
  },
  data () {
    return {
      ruleForm: {
        name: '',
        introduce: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入部门名称', trigger: 'blur' },
          { max: 100, message: '长度不超过100个字符', trigger: 'blur' }
        ],
        introduce: [
          { required: true, message: '请输入部门简介', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    changeFormData (formData) {
      this.ruleForm = Object.assign({}, this.ruleForm, formData)
    },
    submitForm () {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.$emit('submit', {
            name: this.ruleForm.name,
            introduce: this.ruleForm.introduce
          })
        }
      })
    }
  },
  created () {
    if (this.defaultFormData) {
      this.ruleForm = Object.assign({}, this.ruleForm, this.defaultFormData)
    }
  }
}
</script>

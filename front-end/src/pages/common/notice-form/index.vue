/*
 * File: index.vue
 * File Created: 2018-05-02 11:23:15 am
 * Author: zhanghuancheng555 (1052745517@qq.com)
 * Copyright: 2017 - 2018 Your Company, Your Company
 * -----
 * Last Modified: 2018-05-02 8:35:00 pm
 * Modified By: zhanghuancheng555 (1052745517@qq.com>)
 */

<template>
  <el-form ref="form" :model="ruleForm" :rules="rules" label-width="100px">
    <el-form-item label="公告名称" prop="name">
      <el-input
        placeholder="公告名称"
        v-model="ruleForm.name"
        clearable>
      </el-input>
    </el-form-item>
    <el-form-item label="公告内容" prop="content">
      <editor v-model="ruleForm.content"></editor>
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
        content: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入公告名称', trigger: 'blur' },
          { max: 100, message: '长度不超过100个字符', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '请输入公告内容', trigger: 'blur' }
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
            content: this.ruleForm.content
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

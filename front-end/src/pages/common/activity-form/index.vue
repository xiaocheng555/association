/*
 * File: index.vue
 * File Created: 2018-05-02 11:23:15 am
 * Author: zhanghuancheng555 (1052745517@qq.com)
 * Copyright: 2017 - 2018 Your Company, Your Company
 * -----
 * Last Modified: 2018-05-08 4:09:52 pm
 * Modified By: zhanghuancheng555 (1052745517@qq.com>)
 */

<template>
  <el-form ref="form" :model="ruleForm" :rules="rules">
    <el-form-item label="活动名称" label-width="100px" prop="name">
      <el-input
        placeholder="活动名称"
        v-model="ruleForm.name"
        :readonly="readonly">
      </el-input>
    </el-form-item>
    <el-form-item>
      <el-col :span="8">
        <el-form-item prop="startTime" label="活动时间" label-width="100px">
          <el-date-picker
            style="width: 100%;"
            type="date"
            placeholder="开始时间"
            v-model="ruleForm.startTime"
            :readonly="readonly"></el-date-picker>
        </el-form-item>
      </el-col>
      <el-col class="text-center" :span="1">
        <el-form-item>至</el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item prop="endTime">
          <el-date-picker
            style="width: 100%;"
            type="date"
            placeholder="结束时间"
            v-model="ruleForm.endTime"
            :readonly="readonly"></el-date-picker>
        </el-form-item>
      </el-col>
    </el-form-item>
    <el-form-item>
      <el-col :span="8">
        <el-form-item prop="score" label="活动分数" label-width="100px">
          <el-input
            placeholder="活动分数"
            v-model="ruleForm.score"
            :readonly="readonly">
          </el-input>
        </el-form-item>
      </el-col>
      <el-col :span="7">
        <el-form-item prop="director" label="负责人" label-width="100px">
          <el-input
            placeholder="负责人"
            v-model="ruleForm.director"
            :readonly="readonly">
          </el-input>
        </el-form-item>
      </el-col>
      <el-col :span="9">
        <el-form-item prop="tel" label="负责人手机号" label-width="160px">
          <el-input
            placeholder="负责人手机号"
            v-model="ruleForm.tel"
            :readonly="readonly">
          </el-input>
          </el-form-item>
      </el-col>
    </el-form-item>
    <el-form-item class="form-item-editor" label="活动内容" label-width="100px" prop="content">
      <editor v-model="ruleForm.content" :readonly="readonly"></editor>
    </el-form-item>
    <el-form-item label-width="100px">
      <el-button
        v-if="showSubmitBtn"
        type="primary"
        size="small"
        @click="submitForm">提 交</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import Editor from '../editor'

export default {
  name: 'activity-form',
  components: {
    Editor
  },
  props: {
    readonly: {
      type: Boolean,
      default: false
    },
    showSubmitBtn: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      ruleForm: {
        name: '',
        startTime: '',
        endTime: '',
        score: '',
        director: '',
        tel: '',
        content: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { max: 100, message: '长度不超过100个字符', trigger: 'blur' }
        ],
        startTime: [
          { required: true, message: '请选择开始时间', trigger: 'blur' }
        ],
        endTime: [
          { required: true, message: '请选择结束时间', trigger: 'blur' }
        ],
        score: [
          { required: true, message: '请输入分数', trigger: 'blur' },
          { pattern: /^([0]|[1-9]+)(\.?[0-9]{1})?$/, message: '格式不正确', trigger: 'blur' }
        ],
        director: [
          { required: true, message: '请输入负责人', trigger: 'blur' },
          { max: 20, message: '长度不超过20个字符', trigger: 'blur' }
        ],
        tel: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { pattern: /(^1[3|4|5|7|8]\d{9}$)|(^09\d{8}$)/, message: '手机号不正确', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '请输入活动内容', trigger: 'blur' }
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
          this.$emit('submit', this.ruleForm)
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

<style lang="less" scoped>
.form-item-editor {
  position: relative;
  z-index: 1;
}
</style>

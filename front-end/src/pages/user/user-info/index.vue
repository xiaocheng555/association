/*
 * File: index.vue
 * File Created: 2018-05-06 6:51:58 pm
 * Author: zhanghuancheng555 (1052745517@qq.com)
 * Copyright: 2017 - 2018 Your Company, Your Company
 * -----
 * Last Modified: 2018-05-08 2:39:08 pm
 * Modified By: zhanghuancheng555 (1052745517@qq.com>)
 */

<template>
  <el-card class="user-info">
    <div slot="header">
      <span>个人信息</span>
    </div>
    <ul class="user-info-body">
      <li class="user-info-item">
        <label class="user-info-label">姓 名：</label> {{ studentInfo.name }}
      </li>
      <li class="user-info-item">
        <label class="user-info-label">学 号：</label> {{ studentInfo.sno }}
      </li>
      <li class="user-info-item">
        <label class="user-info-label">班 级：</label> {{ studentInfo.class }}
      </li>
      <li class="user-info-item">
        <label class="user-info-label">专 业：</label> {{ studentInfo.major }}
      </li>
      <li class="user-info-item">
        <label class="user-info-label">学 院：</label> {{ studentInfo.academy }}
      </li>
      <li class="user-info-item">
        <label class="user-info-label">年 级：</label> {{ studentInfo.grade }}
      </li>
    </ul>
  </el-card>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'user-info',
  components: {

  },
  data () {
    return {
      studentInfo: {
        name: '',
        sno: '',
        sex: '',
        age: '',
        class: '',
        major: '',
        academy: '',
        grade: ''
      }
    }
  },
  computed: {
    ...mapState(['userInfo'])
  },
  methods: {
    fetchStudent () {
      this.$store.dispatch('student-detail', {
        params: {
          studentId: this.userInfo.id
        }
      }).then(res => {
        if (res && res.errorCode === 0 && res.data) {
          this.studentInfo = res.data
          this.studentInfo.name = res.data.name
          this.studentInfo.sno = res.data.sno
          this.studentInfo.sex = res.data.sex
          this.studentInfo.class = res.data.class
          this.studentInfo.major = res.data.major
          this.studentInfo.nation = res.data.nation
          this.studentInfo.academy = res.data.academy
          this.studentInfo.grade = res.data.grade
        }
      })
    }
  },
  created () {
    this.fetchStudent()
  }
}
</script>

<style lang="less" scoped>
.user-info-body {
  padding-left: 15px;
}

.user-info-item {
  padding-bottom: 20px;
}

.user-info-label {
  display: inline-block;
  width: 60px;
}
</style>

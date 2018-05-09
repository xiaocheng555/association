/*
 * File: index.vue
 * File Created: 2018-03-28 2:07:33 pm
 * Author: zhanghuancheng555 (1052745517@qq.com)
 * Copyright: 2017 - 2018 Your Company, Your Company
 * -----
 * Last Modified: 2018-05-08 5:06:59 pm
 * Modified By: zhanghuancheng555 (1052745517@qq.com>)
 */

<template>
  <common-pannel title="审批学生名单">
    <form class="approve-form">
      <h5 class="approve-title">审批意见：</h5>
      <div class="approve-radio-box">
        <el-radio v-model="confirmType" label="2">同意</el-radio>
        <el-radio v-model="confirmType" label="-1">驳回</el-radio>
      </div>
      <el-input
        class="approve-advise"
        v-show="confirmType === '-1'"
        v-model="advise"
        type="textarea"
        placeholder="请输入驳回原因（最多500字）"
        :rows="4"
        :maxlength="10">
      </el-input>
      <el-button
        class="approve-submit-bnt"
        type="primary"
        size="mini"
        @click="submitApproveForm">提交</el-button>
    </form>
    <div>
      <h5 class="approve-student-list-title">学生名单：</h5>
      <student-list :actId="activityId"></student-list>
    </div>
    <div class="approve-content-box">
      <h5 class="approve-content-title">活动详情：</h5>
      <ActivityArticle class="approve-content" :article="activityDeatil"></ActivityArticle>
    </div>
  </common-pannel>
</template>

<script>
import moment from 'moment'
import CommonPannel from '@common/common-pannel'
import ActivityArticle from '@common/activity-article'
import StudentList from './student-list'

export default {
  name: 'approve-student-detail',
  components: {
    CommonPannel,
    ActivityArticle,
    StudentList
  },
  data () {
    return {
      activityDeatil: {
        name: '',
        date: '',
        assoName: '',
        startTime: '',
        endTime: '',
        score: '',
        director: '',
        directorTel: '',
        content: ''
      },
      activityId: null,
      confirmType: '2',
      advise: ''
    }
  },
  methods: {
    fetchActivityDetail (id) {
      this.$store.dispatch('activity-detail', {
        params: {
          id: id
        }
      }).then((res) => {
        if (res && res.data && res.errorCode === 0) {
          this.setActivityDeatil(res.data)
        }
      })
    },
    setActivityDeatil (data) {
      this.activityDeatil.name = data.name
      this.activityDeatil.assoName = data.assoName
      this.activityDeatil.date = moment(data.createdAt).format('YYYY-MM-DD')
      this.activityDeatil.startTime = moment(data.startTime).format('YYYY-MM-DD')
      this.activityDeatil.endTime = moment(data.endTime).format('YYYY-MM-DD')
      this.activityDeatil.score = data.score
      this.activityDeatil.director = data.director
      this.activityDeatil.tel = data.directorTel
      this.activityDeatil.content = data.content
    },
    submitApproveForm () {
      this.$store.dispatch('activity-approve-student-list', {
        data: {
          activityId: this.activityId,
          confirmType: this.confirmType,
          confirmAdvise: this.advise
        }
      }).then(res => {
        if (res && res.errorCode === 0) {
          this.$message.success('学生名单审批成功')
          this.$router.push({
            name: 'activity-approve',
            query: {
              tab: 'student'
            }
          })
        }
      })
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.fetchActivityDetail(to.query.id)
    })
  },
  created () {
    this.activityId = Number(this.$route.query.id)
  }
}
</script>

<style lang="less" scoped>
.approve-form {
  padding: 15px;
  border: 1px solid #d9d9d9;
  border-radius: 2px;
  background-color: #eeeeee;

  .approve-title {
    font-size: 14px;
    font-weight: 100;
    color: #666666;
  }

  .approve-radio-box {
    padding-top: 10px;
  }

  .approve-advise {
    padding-top: 15px;
  }

  .approve-submit-bnt {
    margin-top: 20px;
  }
}

.approve-student-list-title {
  padding-top: 40px;
  margin-bottom: -10px;
}

.approve-content-box {

  .approve-content-title {
    padding-top: 30px;
    padding-bottom: 5px;
    font-size: 14px;
  }

  .approve-content {
    padding: 15px;
    border: 1px solid #d9d9d9;
    border-radius: 2px;
  }
}
</style>

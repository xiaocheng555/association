/*
 * File: index.vue
 * File Created: 2018-03-28 2:07:33 pm
 * Author: zhanghuancheng555 (1052745517@qq.com)
 * Copyright: 2017 - 2018 Your Company, Your Company
 * -----
 * Last Modified: 2018-05-07 5:10:56 pm
 * Modified By: zhanghuancheng555 (1052745517@qq.com>)
 */

<template>
  <common-pannel title="审批活动">
    <form class="approve-form">
      <h5 class="approve-title">审批意见：</h5>
      <div class="approve-radio-box">
        <el-radio v-model="approveType" label="1">同意</el-radio>
        <el-radio v-model="approveType" label="-1">驳回</el-radio>
      </div>
      <el-input
        class="approve-advise"
        v-show="approveType === '-1'"
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

export default {
  name: 'approve-activity-detail',
  components: {
    CommonPannel,
    ActivityArticle
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
      approveType: '1',
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
      this.$store.dispatch('activity-approve', {
        data: {
          approveType: this.approveType,
          activityId: this.activityId,
          approveAdvise: this.advise
        }
      }).then(res => {
        if (res && res.errorCode === 0) {
          this.$message.success('活动审批成功')
          this.$router.push({
            name: 'activity-approve'
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
    this.activityId = this.$route.query.id
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

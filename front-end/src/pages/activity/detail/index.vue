/*
 * File: index.vue
 * File Created: 2018-03-28 2:07:33 pm
 * Author: zhanghuancheng555 (1052745517@qq.com)
 * Copyright: 2017 - 2018 Your Company, Your Company
 * -----
 * Last Modified: 2018-05-03 11:45:37 pm
 * Modified By: zhanghuancheng555 (1052745517@qq.com>)
 */

<template>
  <div class="activity-approve">
    <common-pannel title="活动详情">
      <ActivityArticle :article="activityDeatil"></ActivityArticle>
    </common-pannel>
  </div>
</template>

<script>
import moment from 'moment'
import CommonPannel from '@common/common-pannel'
import ActivityArticle from '@common/activity-article'

export default {
  name: 'activity-detail',
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
      }
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
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.fetchActivityDetail(to.query.id)
    })
  },
  created () {

  }
}
</script>

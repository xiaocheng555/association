/*
 * File: index.vue
 * File Created: 2018-03-28 2:07:33 pm
 * Author: zhanghuancheng555 (1052745517@qq.com)
 * Copyright: 2017 - 2018 Your Company, Your Company
 * -----
 * Last Modified: 2018-05-03 7:22:41 pm
 * Modified By: zhanghuancheng555 (1052745517@qq.com>)
 */

<template>
  <div class="notice-detail">
    <common-pannel title="公告详情">
      <div class="notice-article">
        <h3 class="article-title">{{ noticeDeatil.name }}</h3>
        <p class="article-meta">
          <span>{{ noticeDeatil.date }}</span>
          <span>{{ noticeDeatil.principal }}</span>
        </p>
        <div v-html="noticeDeatil.content"></div>
      </div>
    </common-pannel>
  </div>
</template>

<script>
import CommonPannel from '@common/common-pannel'
import moment from 'moment'

export default {
  name: 'notice-detail',
  components: {
    CommonPannel
  },
  data () {
    return {
      noticeDeatil: {
        name: '',
        date: '',
        content: '',
        principal: ''
      }
    }
  },
  methods: {
    fetchNoticeDetail (id) {
      this.$store.dispatch('notice-detail', {
        params: {
          id: id
        }
      }).then((res) => {
        console.log(res)
        if (res && res.data && res.errorCode === 0) {
          this.setNoticeDeatil(res.data)
        }
      })
    },
    setNoticeDeatil (data) {
      this.noticeDeatil.name = data.name
      this.noticeDeatil.principal = data.principal
      this.noticeDeatil.date = moment(data.createdAt).format('YYYY-MM-DD')
      this.noticeDeatil.content = data.content
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.fetchNoticeDetail(to.query.id)
    })
  },
  created () {

  }
}
</script>

<style lang="less" scoped>
.notice-article {
  padding-bottom: 10px;
  padding-left: 10px;
  padding-right: 10px;

  .article-title {
    padding: 5px 0;
    font-size: 20px;
    font-weight: 100;
    text-align: center;
  }

  .article-meta {
    padding-top: 5px;
    padding-bottom: 10px;
    font-size: 14px;
    text-align: center;
    color: #aaaaaa;
  }
}
</style>

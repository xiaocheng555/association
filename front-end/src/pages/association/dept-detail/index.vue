/*
 * File: index.vue
 * File Created: 2018-03-28 2:07:33 pm
 * Author: zhanghuancheng555 (1052745517@qq.com)
 * Copyright: 2017 - 2018 Your Company, Your Company
 * -----
 * Last Modified: 2018-05-07 4:30:12 pm
 * Modified By: zhanghuancheng555 (1052745517@qq.com>)
 */

<template>
  <div class="dept-detail">
    <common-pannel title="部门详情">
      <div class="dept-article">
        <h3 class="article-title">{{ deptDeatil.name }}</h3>
        <div v-html="deptDeatil.introduce"></div>
      </div>
    </common-pannel>
  </div>
</template>

<script>
import CommonPannel from '@common/common-pannel'

export default {
  name: 'dept-detail',
  components: {
    CommonPannel
  },
  data () {
    return {
      deptDeatil: {
        name: '',
        introduce: ''
      }
    }
  },
  methods: {
    fetchDeptDetail (id) {
      this.$store.dispatch('department-detail', {
        params: {
          departmentId: id
        }
      }).then((res) => {
        if (res && res.data && res.errorCode === 0) {
          this.setDeptDeatil(res.data)
        }
      })
    },
    setDeptDeatil (data) {
      this.deptDeatil.name = data.name
      this.deptDeatil.introduce = data.introduce
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.fetchDeptDetail(to.query.deptId)
    })
  }
}
</script>

<style lang="less" scoped>
.dept-article {
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

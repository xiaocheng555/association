/*
 * File: index.vue
 * File Created: 2018-05-02 11:23:15 am
 * Author: zhanghuancheng555 (1052745517@qq.com)
 * Copyright: 2017 - 2018 Your Company, Your Company
 * -----
 * Last Modified: 2018-05-03 7:55:06 pm
 * Modified By: zhanghuancheng555 (1052745517@qq.com>)
 */

<template>
  <div class="activity-article">
    <h3 class="article-title">{{ article.name }}</h3>
    <p class="article-meta">
      <span>{{ article.date }}</span>
      <span>{{ article.assoName }}</span>
    </p>
    <div class="article-info">
      <div class="article-info-item">
        <span class="article-info-label">
          <el-tag type="success" size="mini">活动时间</el-tag>
        </span>
        <span class="article-info-text">
          {{ article.startTime }} - {{ article.endTime }}
        </span>
      </div>
      <div class="article-info-item">
        <span class="article-info-label">
          <el-tag type="success" size="mini">活动分数</el-tag>
        </span>
        <span class="article-info-text">
          {{ article.score }}
        </span>
      </div>
      <div class="article-info-item">
        <span class="article-info-label">
          <el-tag type="success" size="mini">负责人</el-tag>
        </span>
        <span class="article-info-text">
          {{ article.director }}
        </span>
      </div>
      <div class="article-info-item">
        <span class="article-info-label">
          <el-tag type="success" size="mini">负责人手机号</el-tag>
        </span>
        <span class="article-info-text">
          {{ article.tel }}
        </span>
      </div>
      <div class="article-info-item">
        <span class="article-info-label">
          <el-tag type="success" size="mini">活动内容</el-tag>
        </span>
        <div class="article-info-content" v-html="article.content"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'activity-article',
  props: {
    article: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="less" scoped>
.activity-article {
  padding-bottom: 10px;
  padding-left: 10px;
  padding-right: 10px;
}

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

.article-info {
  .article-info-item {
    padding: 5px;
  }

  .article-info-label {
    display: inline-block;
    width: 90px;
    font-size: 14px;
  }

  .article-info-text {
    font-size: 14px;
    color: #666666;
  }

  .article-info-content {
    padding: 10px;
  }
}
</style>

<!--
 * @name: 
 * @author: SunSeekerX
 * @Date: 2021-05-26 13:48:57
 * @LastEditors: SunSeekerX
 * @LastEditTime: 2021-05-26 18:08:50
-->

<template>
  <view>
    <!-- 头部 -->
    <ssx-header></ssx-header>

    <!-- 话题 -->
    <view class="topic-wrap">
      <!-- 分类 -->
      <view class="topic-classify">
        <block v-for="classIfy of classIfyList" :key="classIfy.id">
          <view
            @tap="handleClassIfyChange(classIfy.id)"
            class="classift-item"
            :class="{ selected: currentClassIfy === classIfy.id }"
          >
            {{ classIfy.name }}
          </view>
        </block>
      </view>

      <!-- 列表 -->
      <view v-if="topicList.length" class="topic-list">
        <!-- 话题项 -->
        <block v-for="topic of topicList" :key="topic.id">
          <view @tap="navigator(`../topic-details/topic-details?id=${topic.id}`)" class="topic">
            <view class="topic-author-avatar">
              <image class="author-avatar-url" :src="topic.author.avatar_url" lazy-load></image>
            </view>
            <view v-if="currentClassIfy === 1" class="topic-type type-good">精华</view>
            <view v-else class="topic-type">{{ topic.tab }}</view>
            <view class="topic-info">
              <view class="topic-title">{{ topic.title }}</view>
              <view class="topic-other">
                <view class="topic-view">
                  <text class="count-of-replies">{{ topic.reply_count }}</text
                  >/<text>{{ topic.visit_count }}</text>
                </view>
                <view class="topic-time">{{ topic.last_reply_at }}</view>
              </view>
            </view>
          </view>
        </block>
        <!-- 分页器 -->
        <view class="pagination">
          <view class="pagination-action">
            <view @tap="handlePageChange('prev')" class="prev">prev</view>
            <view @tap="handlePageChange('next')" class="next">next</view>
          </view>
          <view class="current-page">当前是第{{ page }}页</view>
        </view>
      </view>
      <!-- No data -->
      <ssx-no-data v-if="!topicList.length"></ssx-no-data>
    </view>
  </view>
</template>

<script>
import dayjs from 'dayjs'

import SsxNoData from '../../components/common/ssx-no-data'
import SsxHeader from '../../components/common/ssx-header'
import { CNode } from '../../apis/index'

export default {
  components: {
    SsxNoData,
    SsxHeader,
  },
  data() {
    return {
      // 当前帖子分类
      currentClassIfy: 0,
      // 分类列表
      classIfyList: [
        {
          id: 0,
          name: '全部',
        },
        {
          id: 1,
          name: '精华',
        },
        {
          id: 2,
          name: '分享',
        },
        {
          id: 3,
          name: '问答',
        },
        {
          id: 4,
          name: '招聘',
        },
      ],
      // 帖子列表
      topicList: [],
      // 页码
      page: 1,
      // 条数
      limit: 40,
    }
  },
  methods: {
    // 获取数据
    async handleGetTopicList(params) {
      try {
        // Clear topic list
        this.topicList = []
        const res = await CNode.getTopicList(params)
        if (res.success) {
          const topicList = res.data
          this.topicList = this.handleTopicDataFilter(topicList)
        } else {
          this.$util.toast('request api error')
        }
      } catch (e) {
        this.$util.toast(e.message)
      } finally {
        // Stop pull down refresh
        uni.stopPullDownRefresh()
      }
    },
    // 话题分类切换
    handleClassIfyChange(classIfyId) {
      if (this.currentClassIfy === classIfyId) {
        return
      } else {
        // Reset topicList
        this.topicList = []
        // Change currentClassIfy
        this.currentClassIfy = classIfyId

        const params = {
          tab: this.handleGetTab(),
          limit: this.limit,
          page: 1,
        }
        // Reset page
        this.page = 1
        // Request
        this.handleGetTopicList(params)
      }
    },
    // 话题数据过滤
    handleTopicDataFilter(data) {
      if (data && data.length) {
        for (let i = 0; i < data.length; i++) {
          if (data[i].tab) {
            // 过滤话题数据
            switch (data[i].tab) {
              case 'share':
                data[i].tab = '分享'
                break
              case 'ask':
                data[i].tab = '问答'
                break
              case 'job':
                data[i].tab = '招聘'
                break
              case 'good':
                data[i].tab = '精华'
                break
              default:
                break
            }
          }
          // 过滤最近回复时间
          data[i].last_reply_at = dayjs(data[i].last_reply_at).format('YYYY-MM-DD HH:mm:ss')
        }
        return data
      } else {
        this.$util.toast('不是有效的数据')
      }
    },
    // 上下一页
    handlePageChange(action) {
      if (action === 'prev') {
        if (this.page === 1) {
          this.$util.toast('这是第一页鸭')
        } else {
          const params = {
            page: --this.page,
            limit: this.limit,
            tab: this.handleGetTab(),
          }
          // Request
          this.handleGetTopicList(params)
        }
      } else if (action === 'next') {
        const params = {
          page: ++this.page,
          limit: this.limit,
          tab: this.handleGetTab(),
        }
        // Request
        this.handleGetTopicList(params)
      }
    },
    // 获取当前分类id对应的tab
    handleGetTab() {
      switch (this.currentClassIfy) {
        case 0:
          return ''
        case 1:
          return 'good'
        case 2:
          return 'share'
        case 3:
          return 'ask'
        case 4:
          return 'job'
        default:
          return ''
      }
    },
    navigator(url) {
      uni.navigateTo({
        url,
      })
    },
  },
  // 下拉刷新
  onPullDownRefresh() {
    this.handleGetTopicList({
      page: this.page,
      limit: this.limit,
      tab: this.handleGetTab(),
    })
  },
  // 页面加载
  onLoad() {
    this.handleGetTopicList({
      limit: this.limit,
      page: this.page,
    })
  },
}
</script>

<style lang="scss" scoped>
@import '../../common/css/index.css';

page {
  background-color: #e1e1e1;
}
// 话题
.topic-wrap {
  width: 730rpx;
  margin: 0 10rpx 25rpx;
  background-color: #fff;
  border-radius: 6rpx;

  // 分类
  .topic-classify {
    display: flex;
    width: 710rpx;
    padding: 10rpx;
    background-color: #f6f6f6;
    border-radius: 6rpx;
    flex-flow: row nowrap;
    justify-content: space-around;
    align-items: center;

    .classift-item {
      width: 132rpx;
      font-size: 14px;
      color: #80bd01;
      text-align: center;
      border-radius: 6rpx;
      transition: 0.15s;
    }

    .selected {
      color: #fff;
      background-color: #80bd01;
    }
  }

  // 列表
  .topic-list {
    width: 730rpx;
    background-color: #fff;
    border-radius: 6rpx;

    // 话题项
    .topic {
      display: flex;
      width: 730rpx;
      height: 100rpx;
      padding: 5rpx 0;
      border-bottom: #f0f0f0 solid 2rpx;
      flex-flow: row nowrap;
      justify-content: flex-start;
      align-items: center;

      .topic-author-avatar {
        display: flex;
        width: 100rpx;
        height: 100rpx;
        justify-content: center;
        align-items: center;

        .author-avatar-url {
          width: 60rpx;
          height: 60rpx;
        }
      }

      .topic-type {
        display: flex;
        width: 64rpx;
        padding: 0 4rpx;
        margin-right: 10rpx;
        font-size: 12px;
        color: #999;
        background-color: #e5e5e5;
        border-radius: 6rpx;
        justify-content: center;
        align-items: center;
      }

      .type-good {
        color: #fff;
        background-color: #80bd01;
      }

      .topic-info {
        width: 548rpx;

        .topic-title {
          width: 420rpx;
          overflow: hidden;
          line-height: 40rpx;
          color: #333;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .topic-other {
          display: flex;
          width: 528rpx;
          line-height: 40rpx;
          flex-flow: row nowrap;
          justify-content: space-between;
          align-items: center;

          .topic-view {
            font-size: 10px;
            color: #b4b4b4;

            .count-of-replies {
              color: #9e78c0;
            }
          }

          .topic-time {
            font-size: 12px;
            color: #778087;
          }
        }
      }
    }

    // 分页器
    .pagination {
      display: flex;
      width: 730rpx;

      .pagination-action {
        display: flex;
        width: 215rpx;
        height: 60rpx;
        padding: 15rpx;
        justify-content: space-between;

        .prev,
        .next {
          display: flex;
          width: 100rpx;
          height: 60rpx;
          font-size: 12px;
          color: #80bd01;
          background-color: #f6f6f6;
          border-radius: 12rpx;
          justify-content: center;
          align-items: center;
        }
      }

      .current-page {
        display: flex;
        width: 515rpx;
        font-size: 14px;
        color: #999;
        flex-flow: row nowrap;
        justify-content: flex-start;
        align-items: center;
      }
    }
  }
}
</style>

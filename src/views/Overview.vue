<template>
  <el-container class="over_view">
    <!-- 主内容 -->
    <el-main>
      <!-- 数据操作 -->
      <div
        class="oV_data_handle display_flex justify_content_space_between align_items_center"
      >
        <span>今日数据</span>

        <div class="cursor_pointer" @click="getTodayData">
          <i class="iconfont icon-shuaxin"></i>
          <span>刷新</span>
        </div>
      </div>
      <!-- 数据列表 -->
      <ul class="oV_data display_flex justify_content_space_between">
        <li
          class="display_flex justify_content_space_between"
          v-for="(item, index) in data_list"
          :key="index"
        >
          <div class="oV_dt_text display_flex justify_content_space_between">
            <i :class="['icon', 'iconfont', item.icon_path]"></i>
            <div class="display_flex">
              <span>{{ item.text }}</span>
              <b>{{ item.num }}</b>
            </div>
          </div>
        </li>
      </ul>
      <!-- 日访问量、点赞量、评论量和发布文章次数表图 -->
      <div class="oV_echarts display_flex justify_content_space_between">
        <div id="charts_one"></div>

        <div id="charts_two"></div>
      </div>
    </el-main>
  </el-container>
</template>

<script>
const echarts = require('echarts')

let that

export default {
  name: 'Overview',
  data () {
    return {
      data_list: [
        {
          icon_path: 'icon-fangwenliang',
          text: '日访问量',
          num: 100
        },
        {
          icon_path: 'icon-zan',
          text: '日点赞量',
          num: 100
        },
        {
          icon_path: 'icon-pinglun',
          text: '日评论量',
          num: 100
        }
      ]
    }
  },
  mounted () {
    that = this

    // 获取日常数据
    that.getTodayData()
    // 日常数据表
    that.data_charts()
    // 发布数据表
    that.publc_charts()
  },
  methods: {
    // 获取日常数据
    getTodayData () {
      that.$http._post(
        that.$api.Index.today_data,
        that.$qs.stringify({ token: that.$config.token }),
        resData => {
          let dataList = that.data_list

          for (let [index, i] of dataList.entries()) {
            switch (index) {
              case 0:
                i.num = resData.visit
                that.$vue.set(dataList, 0, i)
                break
              case 1:
                i.num = resData.click
                that.$vue.set(dataList, 1, i)
                break
              case 2:
                i.num = resData.comment
                that.$vue.set(dataList, 2, i)
                break
            }
          }
        }
      )
    },
    // 日常数据表
    data_charts () {
      let myChart = echarts.init(document.getElementById('charts_one'))
      myChart.setOption({
        title: {
          text: '日常数据',
          textStyle: {
            color: '#232d50',
            fontSize: '28px'
          }
        },
        tooltip: {
          trigger: 'axis',
          transitionDuration: 0
        },
        legend: {
          data: ['日访问量', '日点赞量', '日评论量']
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['4-5', '4-6', '4-7', '4-8', '4-9', '4-10', '4-11'],
          offset: 0,
          nameLocation: 'center',
          nameTextStyle: {
            color: '#c6d0d8',
            fontSize: '18px'
          }
        },
        yAxis: {
          type: 'value',
          offset: 0,
          nameLocation: 'center',
          nameTextStyle: {
            color: '#c6d0d8',
            fontSize: '18px'
          }
        },
        series: [
          {
            name: '日访问量',
            type: 'line',
            stack: '总量',
            data: [14, 24, 34, 44, 54]
          },
          {
            name: '日点赞量',
            type: 'line',
            stack: '总量',
            data: [13, 23, 33, 43, 53]
          },
          {
            name: '日评论量',
            type: 'line',
            stack: '总量',
            data: [12, 22, 32, 42, 52]
          }
        ]
      })
    },
    // 发布数据表
    publc_charts () {
      let myChart = echarts.init(document.getElementById('charts_two'))
      myChart.setOption({
        title: {
          text: '发布数据',
          textStyle: {
            color: '#232d50',
            fontSize: '28px'
          }
        },
        tooltip: {
          trigger: 'axis',
          transitionDuration: 0
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['4-5', '4-6', '4-7', '4-8', '4-9', '4-10', '4-11'],
          offset: 0,
          nameLocation: 'center',
          nameTextStyle: {
            color: '#c6d0d8',
            fontSize: '18px'
          }
        },
        yAxis: {
          type: 'value',
          offset: 0,
          nameLocation: 'center',
          nameTextStyle: {
            color: '#c6d0d8',
            fontSize: '18px'
          }
        },
        series: [
          {
            name: '发布数据',
            type: 'line',
            stack: '总量',
            data: [14, 24, 34, 44, 54]
          }
        ]
      })
    }
  }
}
</script>

<style scoped>
.over_view {
  width: 100%;
}

.el-main {
  padding: 30px;
}

.oV_data_handle {
  height: 40px;
  margin-bottom: 17px;
  background: #fff;
  box-shadow: 0px 5px 30px 0px rgba(22, 115, 255, 0.1);
  line-height: 40px;
  font-size: 16px;
}
.oV_data_handle > * {
  height: 100%;
}
.oV_data_handle > span {
  margin-left: 15px;
}
.oV_data_handle > div {
  margin-right: 15px;
}

.oV_data {
  margin: 0;
  padding: 0;
}
.oV_data li {
  width: 378px;
  padding: 30px;
  background: #fff;
  box-shadow: 0px 5px 30px 0px rgba(22, 115, 255, 0.1);
  flex-direction: column;
}
.oV_data li:last-child {
  margin-right: 0;
}
.oV_dt_text i {
  font-size: 56px;
}
.oV_dt_text div {
  flex-direction: column;
}
.oV_dt_text span {
  margin-bottom: 8px;
  font-size: 20px;
  color: #4a5a7f;
}
.oV_dt_text b {
  font-size: 36px;
}

.oV_echarts {
  margin-top: 30px;
}
#charts_one,
#charts_two {
  width: 626px;
  height: 487px;
  padding: 20px;
  background: #fff;
  box-shadow: 0px 5px 30px 0px rgba(22, 115, 255, 0.1);
}
</style>

<template>
  <el-container class="right_header">
    <!-- 搜索栏 -->
    <el-header height="80px">
      <el-row>
        <el-col :span="2" v-for="(item, index) in nav" :key="index">
          <el-link :href="item.url" target="_blank">{{ item.text }}</el-link>
        </el-col>
      </el-row>
    </el-header>
    <!-- 标签 -->
    <el-main class="display_flex justify_content_start align_items_center">
      <div>访问记录：</div>
      <el-row class="rH_tags display_flex" v-if="tags.length > 0">
        <el-tag class="cursor_pointer" v-for="(item, index) in tags" :key="index" closable :disable-transitions="true" @click="$store.commit('change_modules', index)" @close.stop="remove_this(index)">
          <i :class="['iconfont', item.icon_class]"></i>
          {{ item.text }}
        </el-tag>
      </el-row>
      <el-row v-else>
        <span>暂无访问记录</span>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
let that

export default {
  name: 'RightHeader',
  data () {
    return {
      nav: [
        {
          url: 'http://baidu.com',
          text: '博客首页'
        },
        {
          url: 'http://baidu.com',
          text: '最新文章'
        }
      ],
      tags: []
    }
  },
  mounted () {
    that = this
    that.$vue.set(that, 'tags', JSON.parse(localStorage.getItem('histroy_arr')))
  },
  methods: {
    // 删除当前标签
    remove_this (index) {
      that.$store.commit('remove_histroy', index)
      that.$vue.set(that, 'tags', JSON.parse(localStorage.getItem('histroy_arr')))
    }
  },
  watch: {
    '$store.state.modules': function (newVal, oldVal) {
      that.$vue.set(that, 'tags', JSON.parse(localStorage.getItem('histroy_arr')))
    }
  }
}
</script>

<style scoped>
.right_header {
  width: 100%;
}

.el-header {
  padding: 0 28px;
  background: #fff;
}
.el-header .el-row {
  height: 100%;
}
.el-header .el-link {
  line-height: 80px;
  font-size: 20px;
  color: #a5a5a5;
}
.el-header >>> .el-link:hover .el-link--inner {
  color: #409EFF;
}

.el-main {
  overflow: hidden;
  margin-top: 30px;
  padding: 0 30px;
}
.rH_tags {
  overflow: hidden;
}
.el-tag {
  height: 40px;
  margin-right: 10px;
  padding: 0 20px;
  background: #fff;
  line-height: 40px;
  font-size: 16px;
  color: #4a5a7f;
}
.el-tag >>> .el-icon-close {
  font-size: 16px;
  z-index: 99;
}
.el-tag >>> .el-tag__close {
  color: #808288;
  z-index: 99;
}
.el-tag >>> .el-tag__close:hover {
  color: #4a5a7f;
  background: none;
}
</style>

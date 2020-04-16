<template>
  <el-container class="left_nav">
    <el-main>
      <!-- 用户信息 -->
      <div
        class="left_info overflow_hidden display_flex justify_content_space_between align_items_center"
      >
        <div class="display_flex align_items_center">
          <img
            class="lN_img margin_auto border_radius"
            :src="userInfo.imgurl"
            alt="头像"
          />

          <b>{{ userInfo.username }}</b>
        </div>

        <span class="cursor_pointer" @click="exit">退出</span>
      </div>
      <div class="left_border margin_auto"></div>
      <!-- 选项列表 -->
      <el-menu
        class="left_tab overflow_hidden margin_auto border_none"
        default-active="1"
      >
        <el-menu-item
          :class="[
            'display_flex',
            'align_items_center',
            'cursor_pointer',
            tab_active === index ? 'tab_active' : ''
          ]"
          v-for="(item, index) in tab_list"
          index="index"
          :key="index"
          @click="change_menu(item, index)"
        >
          <i :class="['iconfont', item.icon_class]"></i>
          <span>{{ item.text }}</span>
        </el-menu-item>

        <!-- <el-menu-item index="1">处理中心</el-menu-item>

        <el-submenu index="2">
          <template slot="title">我的工作台</template>
          <el-menu-item index="2-1">选项1</el-menu-item>
          <el-menu-item index="2-2">选项2</el-menu-item>
          <el-menu-item index="2-3">选项3</el-menu-item>
        </el-submenu> -->
      </el-menu>
    </el-main>
  </el-container>
</template>

<script>
let that

export default {
  name: 'LeftNav',
  data () {
    return {
      userInfo: {},
      tab_active: 0,
      tab_list: [
        {
          icon_class: 'icon-SHUJU2',
          text: '数据总览'
        },
        {
          icon_class: 'icon-WANCHENG',
          text: '文章'
        }
        // {
        //   icon_class: 'icon-BIANXIE',
        //   text: '评论'
        // },
        // {
        //   icon_class: 'icon-SHUJU1',
        //   text: '统计'
        // }
      ]
    }
  },
  mounted () {
    that = this
    that.$vue.set(that, 'tab_active', that.$store.state.modules)
    that.$vue.set(that, 'userInfo', JSON.parse(localStorage.getItem('userInfo')))
  },
  methods: {
    // 退出
    exit () {
      // 删除用户名
      localStorage.removeItem('userInfo')
      // 将模块默认设置为0
      that.$store.state.modules = 0
      // 跳转到的登陆页面
      that.$router.push('/')
    },
    // 改变选中模块
    change_menu (obj, index) {
      let histroyObj = {}
      Object.assign(histroyObj, obj, {
        modules: index
      })
      that.$store.commit('change_modules', index)
      that.$store.commit('set_histroy', histroyObj)
    }
  },
  watch: {
    '$store.state.modules': function (newVal, oldVal) {
      let userInfo = JSON.parse(localStorage.getItem('userInfo'))

      if (userInfo) {
        that.$vue.set(that, 'tab_active', parseInt(newVal))
      } else {
        that.$store.state.modules = 0
        that.$router.push('/')
      }
    }
  }
}
</script>

<style scoped>
.left_nav {
  width: 100%;
  height: 100%;
  background: #f0f2f3;
}

.el-main {
  padding: 0;
}

.left_info {
  margin: auto 26px;
  margin-top: 59px;
}
.left_info b {
  margin-left: 18px;
  font-size: 22px;
  color: #4a5a7f;
}
.left_info span {
  font-size: 14px;
  color: #ccc;
}
.lN_img {
  width: 76px;
  height: 76px;
}

.left_border {
  width: 247px;
  height: 1px;
  margin-top: 50px;
  background: #dae4ec;
}

.left_tab {
  width: 247px;
  margin-top: 42px;
  padding: 0;
  background: rgba(0, 0, 0, 0);
}
.left_tab li {
  width: 100%;
  /* height: 50px; */
  margin-bottom: 38px;
  padding: 0;
}
.left_tab i {
  font-size: 27px;
  color: #5d77ad;
}
.left_tab span {
  margin-left: 15px;
  font-size: 20px;
  color: #4a5a7f;
}

.el-menu-item:focus,
.el-menu-item:hover {
  background: none;
}

.tab_active {
  background-image: linear-gradient(90deg, #397dff 0%, #428dff 100%),
    linear-gradient(#418cff, #418cff)!important;
  background-blend-mode: normal, normal;
  box-shadow: 0px 5px 10px 0px rgba(22, 115, 255, 0.4);
  border-radius: 6px;
}
.tab_active i {
  color: #fff;
}
.tab_active span {
  color: #fff;
}
</style>

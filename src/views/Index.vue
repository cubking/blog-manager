<template>
  <el-container>
    <!-- 侧边栏 -->
    <el-aside>
      <left></left>
    </el-aside>
    <!-- 显示区域 -->
    <el-main>
      <right></right>
    </el-main>
  </el-container>
</template>

<script>
import LeftNav from '../components/LeftNav.vue'
import RightBox from '../components/RightBox.vue'

export default {
  name: 'Index',
  components: {
    left: LeftNav,
    right: RightBox
  }
}
</script>

<style scoped>
.el-container {
  height: 100%;
}
.el-aside {
  height: 100%;
}
.el-main {
  padding: 0;
}
</style>

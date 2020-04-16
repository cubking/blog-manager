<template>
  <div class="right_box">
    <!-- 搜索栏 -->
    <RightHeader></RightHeader>
    <!-- 主内容 -->
    <Overview v-if="$store.state.modules === 0"></Overview>
    <Artcle v-if="$store.state.modules === 1"></Artcle>
    <!-- <Comment v-if="$store.state.modules === 2"></Comment> -->
    <!-- <Census v-if="$store.state.modules === 3"></Census> -->
  </div>
</template>

<script>
import RightHeader from '../components/RightHeader'
import Overview from '../views/Overview.vue'
import Artcle from '../views/Artcle.vue'
import Comment from '../views/Comment.vue'
import Census from '../views/Census.vue'

export default {
  name: 'RightBox',
  components: {
    RightHeader: RightHeader,
    Overview: Overview,
    Artcle: Artcle,
    Comment: Comment,
    Census: Census
  }
}
</script>

<style scoped>
.right_box {
  width: 100%;
  height: 100%;
  background: #f7fbff;
}
</style>

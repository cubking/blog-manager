// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'

// config
import config from './config/config'

// Element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/base.css'

// jQuery
import jQuery from 'jquery'

// mavon-editor
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

// axios
import api from './api/api'
import http from './api/http'
import './api/axios'

// querystring
import Qs from 'qs'

// import echarts from 'echarts'

// 通用样式
import './assets/font/font.css'
import './assets/css/normalize.css'
import './assets/css/basic.css'

Vue.config.productionTip = false

Vue.prototype.$config = config

Vue.prototype.$jq = jQuery

Vue.prototype.$api = api
Vue.prototype.$http = http

Vue.prototype.$qs = Qs

Vue.prototype.$vue = Vue

// Vue.prototype.$echarts = echarts;

Vue.use(ElementUI)

Vue.use(mavonEditor)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store
})

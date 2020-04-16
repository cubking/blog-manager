import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login'
import Index from '@/views/Index'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/index',
      name: 'Index',
      component: Index
    }
  ]
})

router.beforeEach((to, from, next) => {
  let userInfo = localStorage.getItem('userInfo')

  if (userInfo) {
    next()
  } else {
    if (to.path === '/') {
      next()
    } else {
      next('/')
    }
  }
})

export default router

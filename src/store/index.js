import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let state = {
  modules: 0
}

let mutations = {
  change_modules: (state, num) => {
    state.modules = num
  },
  // 设置存储数组
  set_histroy: (state, obj) => {
    let histroyarr = localStorage.getItem('histroy_arr') ? JSON.parse(localStorage.getItem('histroy_arr')) : []
    histroyarr.push(obj)
    localStorage.setItem('histroy_arr', JSON.stringify(histroyarr))
  },
  // 删除存储数组
  remove_histroy: (state, index) => {
    let histroyarr = JSON.parse(localStorage.getItem('histroy_arr'))
    histroyarr.splice(index, 1)
    localStorage.setItem('histroy_arr', JSON.stringify(histroyarr))
  }
}

export default new Vuex.Store({
  state,
  mutations
})

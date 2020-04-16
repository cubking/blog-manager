export default {
  // 登陆
  Login: {
    // 登陆接口
    // login: $config.proxyUrl + '/login'
    login: '/login'
  },
  // 首页
  Index: {
    // 获取每日数据接口
    today_data: '/today_data',

    // 获取文章列表
    artcle_list: '/get_artcle_list',
    // 添加文章
    add_artcle: '/add_artcle',
    // 编辑文章
    edit_artcle: '/edit_artcle',
    // 删除文章
    remove_artcle: '/remove_artcle'
  }
}

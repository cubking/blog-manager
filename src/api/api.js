import $config from '../config/config'

export default {
  // 登陆
  Login: {
    // 登陆接口
    login: $config.proxyUrl + '/login'
  },
  // 首页
  Index: {
    // 获取每日数据接口
    today_data: $config.proxyUrl + '/today_data',

    // 获取文章列表
    artcle_list: $config.proxyUrl + '/get_artcle_list',
    // 添加文章
    add_artcle: $config.proxyUrl + '/add_artcle',
    // 编辑文章
    edit_artcle: $config.proxyUrl + '/edit_artcle',
    // 删除文章
    remove_artcle: $config.proxyUrl + '/remove_artcle'
  }
}

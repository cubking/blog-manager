const isPro = Object.is(process.env.NODE_ENV, 'production')

export default {
  // proxyUrl: 代理的请求端口
  proxyUrl: isPro ? 'http://blog.hacket.cn' : '/api',
  // token：验证
  token: '2500143637'
}

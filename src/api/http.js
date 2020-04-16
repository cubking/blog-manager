import axios from 'axios'

export default {
  /**
   * get 请求
   * @param url 接口路由
   * @returns {AxiosPromise<any>}
   */
  _get (url) {
    return axios.get(url)
  },

  /**
   * post 请求
   *
   * @param url 接口路由
   * @param data 接口参数
   * @returns {AxiosPromise<any>}
   */
  _post (url, data, callback) {
    // return axios.post(url, data)
    axios.post(url, data).then(res => {
      callback(res)
    }).catch(err => {
      console.log('post：', err)
    })
  },

  /**
   * put请求
   * @param url 接口路由
   * @param data 接口参数
   * @returns {AxiosPromise<any>}
   */
  _put (url, data) {
    return axios.put(url, data)
  },

  /**
   * 删除
   * @param url 接口路由
   * @returns {AxiosPromise}
   */
  _del (url) {
    return axios.delete(url)
  },

  /**
   * 上传文件
   * @param url 接口路由
   * @param file 接口文件
   */
  _uploader (url, file) {
    let param = new FormData()
    param.append('file', file)
    return axios.post(url, param)
  }
}

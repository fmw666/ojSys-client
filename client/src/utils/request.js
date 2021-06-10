import axios from 'axios';
import store from "../store";


const service = axios.create({
    // 连接后台 url
    baseURL: 'http://127.0.0.1:8000/api/v1/',
    // 超时时间，单位毫秒
    timeout: 5000,
    // 是否允许跨域和携带凭证
    withCredentials: true
});

console.log('sss')
console.log(store.getters.getToken)
/**
 * 设置请求拦截器。它的执行逻辑：
 *   客户端的请求 -> 请求拦截器 -> 服务器
 * 这样可以对请求操作进行一系列的处理，再发送给服务器，比如，添加 TOKEN
 */
service.interceptors.request.use(
  config => {
      if (store.getters.getToken) {
          config.headers['Authorization'] = "JWT " + store.getters.getToken;
      }
      return config;
  },
  error => {
      return Promise.reject(error);
  }
)


export default service
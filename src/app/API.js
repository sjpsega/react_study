import axios from 'axios'
import config from './config'

// 创建一个 Axios 实例
const instance = axios.create({
  baseURL: config.BaseUrl, // 设置基本URL
  timeout: 2500, // 设置超时时间
})

export default instance
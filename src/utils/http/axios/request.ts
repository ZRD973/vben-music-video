// import { store } from '/@/store/index'
import axios from 'axios'
import { AxiosResponse } from 'axios'
import type { Result } from '/#/axios';
import { message,notification  } from 'ant-design-vue';
// import { ElLoading, ElNotification } from 'element-plus'

// 创建 axios 实例
const request = axios.create({
    // API 请求的默认前缀
    baseURL: 'http://127.0.0.1:7001' as string | undefined,
    timeout: 60000 // 请求超时时间
})

// 异常拦截处理器
const errorHandler = (error:{message:string}) => {
    console.log(`err${error}`)
    notification.error({
        message: '请求失败',
        description: error.message,
      });
    return Promise.reject(error)
}

// request interceptor
request.interceptors.request.use(config => {
    // loading = ElLoading.service({
    //     lock: true,
    //     text: 'Loading',
    //     spinner: 'el-icon-loading',
    //     background: 'rgba(0, 0, 0, 0.4)'
    // })
    // const token = store.state.layout.token.ACCESS_TOKEN
    // 如果 token 存在
    // 让每个请求携带自定义 token 请根据实际情况自行修改
    // if (token) {
    //     config.headers['Access-Token'] = token
    // }
    return config
}, errorHandler)

// response interceptor
request.interceptors.response.use((response:AxiosResponse<Result>) => {
    const { data } = response
    if(data.code !== 200) {
        let title = '请求失败'
        if(data.code === 401) {
            // if (store.state.layout.token.ACCESS_TOKEN) {
            //     store.commit('layout/logout')
            // }
            title = '身份认证失败'
        }
        return Promise.reject(new Error(data.message || 'Error'))
    }
    return data
}, errorHandler)

export default request
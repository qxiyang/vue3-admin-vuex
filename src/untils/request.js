import axios from "axios";

const http = axios.create({
    baseURL: 'https://v3pz.itndedu.com/v3pz', // 替换为你的API基础URL
    timeout: 1000, // 请求超时时间
    headers: { 'terminal': 'h5' },//与管理系统区分
});

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    //生成token实例
    const token = localStorage.getItem('h5_token')
    //不需要token的api
    const whiteUrl = ['/login',] 
    if(token&& !whiteUrl.includes[config.url]){
      config.headers['h-token'] = token
    }
    // 在发送请求之前做些什么
    return config;  
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response;
  }, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
  });

export default http;
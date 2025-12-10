import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import api from './api'//引入api

const app = createApp(App)

//在实例上绑定属性
app.config.globalProperties.$api = api
//挂载路由
app.use(router)
app.mount('#app')

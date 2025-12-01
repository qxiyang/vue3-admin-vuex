import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import store from './store'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)
for(const [key,component] of Object.entries(ElementPlusIconsVue)){
    app.component(key,component)
}
  
app.use(router)//挂载路由-------11.29

app.use(store)//挂载变化实例------11.30   
app.mount('#app')

import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import store from './store'
import panelHead from './components/panelHead.vue'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'

//刷新之后添加路由 
const localData = localStorage.getItem('pz_pz')
if(localData){//如果之前有数据，
    store.commit('dynamicMenu',JSON.parse(localData).menu.routerList)//,先把localData从字符v换转换成对象，再通过commit方法触发dynamicMenu函数拿到实例
    store.state.menu.routerList.forEach(item => {
        router.addRoute('main',item)//将ite添加到main里面
    });
}
//调用路由守卫，跳转之前触发
router.beforeEach((to,form,next)=>{
    const token = localStorage.getItem('pz_token')
    //非登录页面并且token不存在
    if( !token && to.path !== '/login' ) {
        next('/login')//跳转的路由
    }else if( token && to.path === '/login'){    //token存在时访问login
        next('/')
    }else{
        next()
    }
})
//跳转之后触发，而非点击之后触发
// router.afterEach()
const app = createApp(App)
for(const [key,component] of Object.entries(ElementPlusIconsVue)){//vuex配置
    app.component(key,component)
}

app.component('panelHead',panelHead)
app.use(router)//挂载路由-------11.29

app.use(store)//挂载变化实例------11.30   
app.mount('#app')

import { createStore } from "vuex";//创建store
import menu from "./menu"; //导入menu数据
import Login from "../views/login/index.vue"//导入登录页面
import createPersistedState from "vuex-persistedstate"

//创建实例--定义模块menu--再对外暴露（抛出，导出）
export default createStore({ //导出实例 ------11.30
    plugins:[new createPersistedState({
        key:'pz_pz'
    })],
    modules:{
        menu
    }
})
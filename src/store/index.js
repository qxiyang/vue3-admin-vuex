import { createStore } from "vuex";//创建store
import menu from "./menu"; //导入menu数据

//创建实例--定义模块menu--再对外暴露（抛出，导出）
export default createStore({ //导出实例 ------11.30
    modules:{
        menu
    }
})
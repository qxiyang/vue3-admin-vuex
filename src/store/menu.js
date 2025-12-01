//用于存储状态
const state ={
    isCollapse:false,
    selectMenu:[]
}
const mutations ={//更改 Vuex 的 store 中的状态的唯一方法是提交 mutation---11.30
    collapseMenu (state){
        state.isCollapse = !state.isCollapse
    },
    addMenu (state,payload){
        //去掉重复点击
        if((state.selectMenu.findIndex(item=> item.path === payload.path) === -1)){ //如果获取到的数据不等于传入的数据（也就是上次点击所获取的数据）
            state.selectMenu.push(payload)//就添加进payload
        }
    }
}
//导出变化------11.30
export default {
    state,
    mutations
}
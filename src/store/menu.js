//用于存储状态
const state ={
    isCollapse:false,//默认不收起
    selectMenu:[]
}
const mutations ={//更改 Vuex 的 store 中的状态的唯一方法是提交 mutation---11.30
    collapseMenu (state){
        state.isCollapse = !state.isCollapse
    },
    addMenu (state,payload){
        //去掉重复点击
        if(state.selectMenu.findIndex((item) => item.path === payload.path) === -1){ //如果获取到的数据不等于传入的数据（也就是上次点击所获取的数据）
            state.selectMenu.push(payload)//就添加进payload
        }
    },
    closeMenu (state,payload){
        //找到要删除菜单的索引
        const index = state.selectMenu.findIndex((item) => item.name === payload.name)
        // state.selectMenu.splice(state.selectMenu[index],1)
        // 当 index 有效时，state.selectMenu[index] 是数组元素（比如对象 {path: '/a', ...}），
        // 会被转为 NaN，splice(NaN, 1) 等价于 splice(0, 1)，直接删除第一个元素！
        state.selectMenu.splice(index,1)//删除对应数组的1个数据
    }
}
//导出变化------11.30
export default {
    state,
    mutations
}
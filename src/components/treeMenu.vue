<template>
        <template 
          v-for = "(item,index) in props.menuData":key="item.path"> <!--从menuData中拿到数据以及下标，递归复用(但是我感觉像是迭代循环的说)-->
          <!-- 无children的菜单项 -->
          <el-menu-item
            @click="handleClick(item,`${props.index}-${item.meta.id}`)"
            v-if = "!item.children||item.children.length == 0" 
            :index = "`${props.index}-${item.meta.id}`"
            :key = "`${props.index}-${item.meta.id}`">  <!--如果没有子菜单或子菜单长度为0，下标=父菜单下标加本身的id,连接符不能有空格-->
            <!-- <el-icon :icon = "'${item.meta.icon}'"></el-icon>  错误，不能这么写-->
            <el-icon size = "20"><!--设置图片尺寸-->
              <component :is = "item.meta.icon"></component><!--通过vue的动态组件来设置图标-->
            </el-icon>
            <span>{{ item.meta.name }}<!--设置名字--></span>
          </el-menu-item>
          <!-- 有children的子菜单 -->
          <el-sub-menu v-else :index ="`${props.index}-${item.meta.id}`"><!--字符串拼接使用反引号`而不是单引号'，又报错-->
            <template #title>
              <el-icon size = "20"><!--设置图片尺寸-->
                <component :is = "item.meta.icon"></component><!--通过vue的动态组件来设置图标-->
              </el-icon>  
              <span>{{ item.meta.name }}<!--设置名字--></span>
            </template><!--有子菜单的需要渲染的内容可以复用，在vue会自动递归,不用写出来-->
            <tree-menu 
            :index = "`${props.index}-${item.meta.id}`" 
            :menuData = "item.children " /><!--</tree-menu>能用单标签的就能用双标签-->
          </el-sub-menu>
        </template>
</template>
<script setup>
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
const router = useRouter()
const store = useStore()
const handleClick = (item,active)=>{
  router.push(item.meta.path)
  store.commit('addMenu',item.meta)//获取到点击的信息
}
//漏写setup导致defineProps函数报错显示未定义 
const props = defineProps(['menuData','index'])//接收aside.vue传递过来的数据
// console.log(props,'props')//打印验证,结果为三个数组对应三个嵌套路由
</script>
<style scoped>
</style>
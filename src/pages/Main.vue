<template>
    <RouterView />
    <van-tabbar v-model="active">
        <van-tabbar-item 
        v-for="item in router.options.routes[0].children"
            :key="item.path" :icon="item.meta.icon"
            :url="`#/${item.path}`"><!--拼接字符串需要把#号哈希值带上-->
            {{item.meta.name}}</van-tabbar-item>
    </van-tabbar>
</template>
<script setup>
import { ref,onMounted } from 'vue';
import { useRouter,useRoute } from 'vue-router';
const router = useRouter();
const route = useRoute();
const active = ref(0);
onMounted(() => {
    // console.log(router,'route');//通过控制台查看信息
    //获取点击页面的路由
    const data = router.options.routes[0]
    active.value = data.children.findIndex( item => '/'+item.path === route.path );
})
</script>
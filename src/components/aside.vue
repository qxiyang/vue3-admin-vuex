  <template>
        <el-menu
          :style="{width: !isCollapse ? '230px' :'64px'}" 
          active-text-color="#ffd04b"
          background-color="#545c64"
          class="aside-container"
          default-active="2"
          text-color="#fff"
          @open="handleOpen"
          @close="handleClose"
          :collapse="isCollapse">


          <p class="logo-lg">{{ isCollapse ? "FG" : "FG医疗系统" }}</p>
          <TreeMenu :index = "1" :menuData = "menuData" /> <!--将属性传递进指定路由中,写法注意引号右侧不能有空格 : menuData就会报错-->
        </el-menu>
  </template>

  <script setup>
  import TreeMenu from './treeMenu.vue'
  import { useRouter } from 'vue-router'//获取路由
  import { reactive ,computed} from 'vue'//获取对象
  import { useStore } from 'vuex'//

  const router = useRouter()
  // console.log(router,'router')//暂时不明白为什么要加同名单引号参数。把页面所有东西都打印出来了，跟是否调用router关系不大,所以没有调用也能看到routes

  const menuData = reactive(router.options.routes[0].children)//通过浏览器控制台可以清晰的看见目录层级options.routes.routes[0]日志29_03.md有图片
  const store = useStore()//创建store实例
  const isCollapse = computed(()=>store.state.menu.isCollapse)
  // console.log(menuData)//尝试打印，但是结果为undefine,所以发现reactiv只传递数据----------这是因为Children未大写，所以未接收到数据，
  // 实际上打印结果与treeMenu路由中的defineProps结果相同，均为三个嵌套routes的数组
  const handleOpen = () =>{}
  const handleClose = () =>{}
//   // aside.vue
// console.log(store.state); // 控制台应输出 { menu: { isCollapse: false, selectMenu: [] } }
  </script>

  <style lang = 'less' scoped>
    .aside-container{
      margin: 0;
      padding: 0;
      height: 100%;
      .logo-lg{
        font-size : 20px;
        text-align: center;
        height: 50px;
        line-height: 50px;
        color: #f3eeee;
      }
    }
  </style>

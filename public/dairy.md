- [2025.12.2](#2025122)
- [切换版本](#切换版本)
- [搭建vue的脚手架 https://cn.vuejs.org/ https://vitejs.cn/vite3-cn/guide/](#搭建vue的脚手架-httpscnvuejsorg-httpsvitejscnvite3-cnguide)
- [下载路由4.0版本 https://router.vuejs.org/zh/guide/](#下载路由40版本-httpsroutervuejsorgzhguide)
- [下载ui框架 使用Element  https://element-plus.org/zh-CN/](#下载ui框架-使用element--httpselement-plusorgzh-cn)
- [Element-Plus 专门用于vue3的ui框架](#element-plus-专门用于vue3的ui框架)
- [下载less css工具](#下载less-css工具)
- [下载状态管理工具vuex https://vuex.vuejs.org/zh/guide/](#下载状态管理工具vuex-httpsvuexvuejsorgzhguide)
- [接口文档 https://apifox.com/apidoc/shared/205c93aa-6b50-4a1a-85be-b93dc5304443](#接口文档-httpsapifoxcomapidocshared205c93aa-6b50-4a1a-85be-b93dc5304443)
- [基于Promise的HTTP客户端用于后端接口联调 axios https://www.axios-http.cn/docs/intro](#基于promise的http客户端用于后端接口联调-axios-httpswwwaxios-httpcndocsintro)
- [下载day.js](#下载dayjs)
- [下载持久化工具防止vuex因为刷新页面而丢失路由数据](#下载持久化工具防止vuex因为刷新页面而丢失路由数据)
- [vue3的组件库 vant跟elementplus差不多 https://vant4.ylhtest.com/#/zh-CN/quickstart](#vue3的组件库-vant跟elementplus差不多-httpsvant4ylhtestcomzh-cnquickstart)
- [下载微信二维码登录插件](#下载微信二维码登录插件)
- [构建主要页面，并通过路由实现页面的跳转router](#构建主要页面并通过路由实现页面的跳转router)
- [主要页面的布局，各模块封装在components中再导入到main.vue](#主要页面的布局各模块封装在components中再导入到mainvue)
- [1.左边：为侧边菜单栏（asiede），可以点击，并且各个菜单有下拉的分级菜单，通过element实现](#1左边为侧边菜单栏asiede可以点击并且各个菜单有下拉的分级菜单通过element实现)
- [2.顶部：左中右布局，选择flex布局（header）](#2顶部左中右布局选择flex布局header)
- [2.1.左边为菜单的收起和展开按钮，通过element实现](#21左边为菜单的收起和展开按钮通过element实现)
- [2.2.右边：有客户的头像和名称，将鼠标放在头像上会弹出退出按钮，通过element实现](#22右边有客户的头像和名称将鼠标放在头像上会弹出退出按钮通过element实现)
- [2.3.中间：点击左侧菜单的tap栏，有菜单名称和图标，鼠标hover会出现删除来关闭tap和页面，通过element实现](#23中间点击左侧菜单的tap栏有菜单名称和图标鼠标hover会出现删除来关闭tap和页面通过element实现)
- [3.中间暂时未讲到](#3中间暂时未讲到)
- [4.登录页面by12.3](#4登录页面by123)
- [5\_01.axios封装by12.4](#5_01axios封装by124)
- [5\_02](#5_02)
- [6路由守卫](#6路由守卫)
- [7权限管理页面](#7权限管理页面)
- [8\_01菜单管理by12.5](#8_01菜单管理by125)
- [8\_02菜单管理的权限添加by12.6](#8_02菜单管理的权限添加by126)
- [8\_03将权限做成表格显示，表格内容横向排布，最后有一个编辑按钮来修改权限](#8_03将权限做成表格显示表格内容横向排布最后有一个编辑按钮来修改权限)
- [8\_04分页设置](#8_04分页设置)
- [9用户管理基本搭建by12.7](#9用户管理基本搭建by127)
- [10完善退出按钮](#10完善退出按钮)
- [11用动态路由代替写死的路由，实现不同权限的界面不同](#11用动态路由代替写死的路由实现不同权限的界面不同)
- [12修复一些小问题](#12修复一些小问题)
- [13\_1陪护管理页面by12.7](#13_1陪护管理页面by127)
- [13\_2完成陪护管理的增删改查by12.8](#13_2完成陪护管理的增删改查by128)
- [13\_3数据本质来源完成所有页面](#13_3数据本质来源完成所有页面)
- [14c端完成layout布局](#14c端完成layout布局)
- [15c端登录页面by12.9](#15c端登录页面by129)
- [16c端主页面by12.10](#16c端主页面by1210)
- [17c端下单页面by12.11](#17c端下单页面by1211)
- [17\_2c端下单页面完善by12.12](#17_2c端下单页面完善by1212)
- [18订单页面](#18订单页面)
- [19订单详情by12.12](#19订单详情by1212)
- [20用户页面by12.13](#20用户页面by1213)
- [21管理系统的用户订单页面](#21管理系统的用户订单页面)
- [22首页](#22首页)
- [23readme修改](#23readme修改)
- [24完结 11.28-12.13](#24完结-1128-1213)
# 2025.12.2 
前置环境配置
下载nvm 可以改变node的版本 https://nvm.uihtm.com/doc/guide.html
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
下载nodejs https://nvm.uihtm.com/doc/guide.html
nvm install lts/*
# 切换版本
nvm use 24.11.1
# 搭建vue的脚手架 https://cn.vuejs.org/ https://vitejs.cn/vite3-cn/guide/
npm create vite@latest vue-project<!--网课用的vite-->>
npm create vue@latest vue-project
cd vue-project
npm install
npm run dev
# 下载路由4.0版本 https://router.vuejs.org/zh/guide/
npm install vue-router@4
# 下载ui框架 使用Element  https://element-plus.org/zh-CN/
# Element-Plus 专门用于vue3的ui框架
npm install element-plus --save
npm install -D unplugin-vue-components unplugin-auto-import# <!--ui按需引入插件下载 -->
# 下载less css工具
npm install less
# 下载状态管理工具vuex https://vuex.vuejs.org/zh/guide/
npm install @element-plus/icons-vue<!--下载组件-->
# 接口文档 https://apifox.com/apidoc/shared/205c93aa-6b50-4a1a-85be-b93dc5304443

# 基于Promise的HTTP客户端用于后端接口联调 axios https://www.axios-http.cn/docs/intro
npm install axios
# 下载day.js<!--转换工具：将时间戳转换为日期格式-->
npm install dayjs
# 下载持久化工具防止vuex因为刷新页面而丢失路由数据
npm install vuex-persistedstate
# vue3的组件库 vant跟elementplus差不多 https://vant4.ylhtest.com/#/zh-CN/quickstart
npm i vant<!--全局引入-->
npm i unplugin-vue-components -D<!--局部引入-->
# 下载微信二维码登录插件
npm i qrcode@1.5.3
<!--写入main.js-->
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
const app = createApp(App)
for(const [key,component] of Object.entries(ElementPlusIconsVue)){
    app.component(key,component)
}

# 构建主要页面，并通过路由实现页面的跳转router
创建view文件夹，在view文件夹下面写所需页面的vue文件
创建router实例来储存路由信息 createRouter()
从app.vue跳转到各个页面方法存放在router文件夹下面的router.js，useRouter()
通过导入到mian.js中来关联到app.vue import Router from
在main.js中需要挂载路由 app.use(router)
# 主要页面的布局，各模块封装在components中再导入到main.vue
明确需求为左上中的结构，所以选择flex布局 display
其中：
# 1.左边：为侧边菜单栏（asiede），可以点击，并且各个菜单有下拉的分级菜单，通过element实现
各个页面的对应文件夹要创建对应的index.vue实现页面
在router中创建各个页面的实例对象，包含name，path，icon，discrtion 嵌套路由
将router中的数据导入到aside页面，通过递归将数据传入进各个菜单中 v-for()
# 2.顶部：左中右布局，选择flex布局（header）
# 2.1.左边为菜单的收起和展开按钮，通过element实现
左边菜单aside与顶部为平级关系，无法直接获取到实时数据。引入vuex状态管理工具 createStore()，sate,mutation
通过vuex创建store实例，从而来储存header的点击信息，传入aside中，从而控制aside伸缩 useStore()
# 2.2.右边：有客户的头像和名称，将鼠标放在头像上会弹出退出按钮，通过element实现
# 2.3.中间：点击左侧菜单的tap栏，有菜单名称和图标，鼠标hover会出现删除来关闭tap和页面，通过element实现
通过store获取aside各菜单点击信息，传入header中，使header生成对应菜单信息的tap， router的push方法
并跳转到对应的页面（需要通过改变路由实现）
关闭tap,根据关闭情况判断是否跳转页面，是否改变路由 router的splice方法
# 3.中间暂时未讲到
# 4.登录页面by12.3
通过点击header用户的退出按钮可以返回到登录页面
有userNmae、passWord、validateCode三个列表使用vue自带的el-row三格布局通过绑定值(:align)和(justyfild)调整格式
上方是有一张装饰图片，通过src传入，先生成一个src实例再通过标签中的#append加入布局中
在图片下方有切换登录和注册的超链接按钮，通过el-link实现，type选择primary，状态判断通过ref()的实例
三个表格中的内容要用reacitve创建对应属性，其中验证码的页面要点击超链接才出现，通过ref()实例的装态判断是否出现
验证码点击后出现倒计时，通过计时器实现，用正则验证手机号是否正确并提醒用户
# 5_01.axios封装by12.4
导入axios后，创建实例，生成拦截器，不需要token加入白名单，并且给出错误提醒，然后将axios的实例暴露
在api中生成请求验证码的方法getCode暴露使得其能够在vue中被调用
import { getCode } from '../../api';获得getCode方法，发送验证码，参数为用户名
为什么发送的对象为用户名，因为在request里面生成了axios实例，在被api获取后生成了一个getCOde函数，
其返回值为request的post的方法执行后得到的 Promise 对象，post为axios对象的方法，具体实现逻辑要去官网文档查询
大概为第一个参数为'url',衔接之间的baseUrl属性，为 发送验证码的地方，第二个参数为请求方
在login页面点击发送验证码后调用函数中的这个方法，从而发送验证码
# 5_02
将注册页面的判定逻辑完善，使用vue的表单校验功能
code是后端约定的「业务状态码」
data是前端通过 axios 拿到的「后端响应体数据」（也就是接口返回的 JSON 内容），
data 包含 code 是因为后端返回的 JSON 结构里明确包含了这个字段。
将用户信息和token保存到浏览器缓存
# 6路由守卫
防止越权访问
token错误在拦截器处理，使路由返回login
# 7权限管理页面
请求使用request的get方法，不同于上面几个组件使用的post方法，
# 8_01菜单管理by12.5
form表单的ref属性本质是获取表单组件的 DOM / 实例引用，从而直接调用 Element Plus 封装的表单方法
通过点击启动权限管理菜单，在菜单中设置用户权限及权限名
通过api获取的数据在绑定后通过then方法可以传递到html标签的属性中
项目中通过axio拿到的数据在绑定后通过then方法传入到了permissionData中
# 8_02菜单管理的权限添加by12.6
通过按钮绑定权限添加和校验，ref是表单的实例；model是表单绑定的值，也就是需要上传的权限数据
<!-- 获取到选中的权限的数据, 因为要求数据是strinhg类型所以需要string化 -->
const permissions = JSON.stringify(treeRef.value.getCheckedKeys())<!--ref获取被选中的数据的方法 -->
id属性一开始只有添加的时候才显示，所以通过v-show隐藏
联调总结：将联调的reuqest方法封装在api文件夹中
通过在api文件夹暴露方法，让vue的srcipt可以调用方法
# 8_03将权限做成表格显示，表格内容横向排布，最后有一个编辑按钮来修改权限
定义一个表格，表格的数据做成一个列表，列表的数据通过menulist的get方法获取，在then方法里，
通过解构data数据中的list和total属性，来赋值给表格中的list用于显示
element标签的prop值是规定好的，不能随便更改
prop 属性	<el-table-column prop="name" label="昵称"/>	直接取 tableData.list 中每一行对象的 name 属性值（如 row.name）；
# 8_04分页设置
从element里选择分页组件，将组件属性里的size，total，page等属性用之前写的数据替换（paginationData和tableData）
# 9用户管理基本搭建by12.7
类似于权限管理然后增添逻辑也差不多
封装getListData的时候api不是updataUser而是authAdmin
# 10完善退出按钮
通过将用户的token清除，然后用户在下一次跳转路由时就会触发beforEach路由守卫
返回login的路由从而跳转到登录页面
# 11用动态路由代替写死的路由，实现不同权限的界面不同
路由是本地文件夹对应的文件路径，现在通过store控制动态引入
通过vite里面的import.meta.glob可以导入某个文件夹下面的所有模块
const modules = import.meta.glob('./scr/*.js')
# 12修复一些小问题
将用户名改为动态数据从缓存里读取数据<!--与缓存相关的使用localStorage-->
刷新后高亮消失，通过在stete里设置一个默认高亮属性用户点击后默认高亮属性就更新为点击页面，
再通过aside绑定一个默认高亮值default-active就可以实现，刷新后高亮不变
访问'/'路径应该跳转到第一个页面，通过routes的reactive属性一个绑定函数实现
# 13_1陪护管理页面by12.7
逻辑前面两个页面类似
有id，name，手机号<!--复制页面bug排了很久除了变量名写错以外，就是placeholder没把自带的air=删掉-->
总结报错,ref需要value取值不能直接调用
图片默认参数是string，el-button不能绑定model，注意request函数参数
# 13_2完成陪护管理的增删改查by12.8
之前的勾选框的@selection-change="handleSelectionChange"要写在所有子标签的父级，之前写错了，导致一直没有获取到列表数组
handleSelectionChange函数可以从tableData.list获取到被勾选的一个数组，因为request函数参数只需要id，所以一个声明的用来储存id的ref数组，
由于之前获取到的是整个，所以需要通过数组的map方法遍历提取到id这一个值{id:}就是将目标值存储在id这个变量中，并返回<!--否定-->
<!--修正-->需要写成map(item => ({id:item.id}))而不是map(item => item.id)使用后端需要一数组对象，而不是一个数组
# 13_3数据本质来源完成所有页面
数据通过数据弹窗表单发送给后端，后端再返回储存在tableData.list中。form中的数据仅用来在调用编辑时完成浅克隆
Array.forEach() 是遍历方法，没有返回值（返回 undefined）
# 14c端完成layout布局
创建项目 npm create vite@latest .
下载环境 npm i
运行 npm run dev
下载路由 npm i vue-router
下载vant组件 npm i unplugin-vue-components -D<!--局部引入-->
下载axio后端接口联调 npm i axios
下载less npm i less
使用vant组件，先用vue创建一个基础框架
在不清楚信息时打印在控制台查看有哪些元素
遍历时key要选唯一值，前端项目里，推荐选择path
# 15c端登录页面by12.9
使用vant的表单组件作为基本登录框架
使用axios作为后端联调工具，在request函数不使用管理系统的写法（每写一个请求就写一次抛出）
选择直接抛出对象，将请求封装为对象的属性。
然后在main.js里面可以通过app.config.globalProperties.$api = api的方式
<!-- 将api赋值给app的配置属性（config）下面的全局属性（globapropties）下面的api属性 -->
正确逻辑是「把封装好的 api 对象挂载到 Vue 实例的全局属性上」，属性名自定义为$api，
方便组件内通过this.$api/proxy.$api调用，并非 “api 属性下的 api 属性”
然后在vue的页面可以同过拿到vue的实例，从而拿到api方法。
然后将then改为异步操作async await
# 16c端主页面by12.10
token的名称可以自定义，但是config.headers里面的['h-token']和['x-token']这种写在中括号不能改名称，
这是在访问config.headers里面的对应名称的属性
# 17c端下单页面by12.11
模板字符串用法`字符串${变量}`
使用router.go(-1)可以跳转到上一个页面
通过后端获取陪护师数据
插槽用template标签加#
通过popup弹出层加picker实现滑动选择的效果
当数据发生变化时computed会进行处理
# 17_2c端下单页面完善by12.12
页面独立标题（不包含在表单内）需要用van-cell-group的标签，表单内用van-cell
通过创建检验数组，提高复用率。
通过插件实现通过二维码登录:先获取url，再转为二维码，然后通过弹窗将二维码弹出
# 18订单页面
顶部的tap通过vant的tap组件实现
通过请求get后端拿到订单列表数据,再用v-fro渲染列表数据，
不同状态有不同颜色，通过封装一个对象，键为状态名，值为颜色，style=“color:colorMap([item.status])”，
通过对象的[]访问属性。倒计时通过封装组件实现
# 19订单详情by12.12
通过模板字符串拼接oid属性路由跳转，顶部状态栏，详情页的数据需要从后端获取，get需要一个参数oid，
iod通过route的一个属性query找到oid的值,oid是query下面的一个属性通过.获取
通过封装一个对象，键为状态名，值为数字。用数字匹配封组件的对应状态。
键可以随便写，但是初始化的值不能随便写,也就是说在表单的键值不能互换，这和双向绑定不一样，我换了就报错，因为值为变量，
而变量不存在。
v-for 遍历对象时，参数顺序是：v-for="(值, 键, 索引) in 对象"即：
第一个参数 = value（值），第二个参数 = key（键），第三个可选参数 = 索引（数字）。
# 20用户页面by12.13
退出弹窗一样用dialog，popup不是这个效果,然后
# 21管理系统的用户订单页面
列表用table实现
跟陪护师列表差不多，通过从后端返回的数据，去渲染列表，各个属性值用prop，键用label。
避免页面会导致数据分行，给固定的长度。防止固定长度的数据在缩小页面时被压缩，固定其位置。
搜索框用form实现，要让form一行显示，可以给form一个inline属性的值为true，下面的所有标签为v-form-item的标签都会在一行显示。
操作通过将改变的状态的订单id发送给后端，从而改变状态。
# 22首页
还有个首页的页面，但是后端不返回数据，做不了，可能是没教这个页面所以关闭的服务
# 23readme修改
将需要指定的代码部分用plaintext的方式展示，需要用的markdown的指定为具体语言的效果
(在这段代码后都是plaintext部分)```plaintext
```(结束)
```
# 24完结 11.28-12.13

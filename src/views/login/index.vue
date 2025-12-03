<template>
    <el-row  class="login-container" justify="center" :align="'middle'"><!--要求放在中间，选择row三格布局,后面两个是三格的属性-->
      <el-card style="max-width: 480px">
        <template #header>
          <div class="card-header">
            <img :src="imgUrl" alt=""></img>
          </div>
        </template>
        <div class="jump-link" >
          <el-link type="primary" @click="handleChange">{{ formType ? '登录' : '注册' }}</el-link><!--使用el-link组件完成超链接效果-->
        </div>
        <el-form 
        :model="loginForm" 
        class="demo-ruleForm"
        style="max-width: 600px;">
        <el-form-item prop="userName">
          <el-input v-model="loginForm.userName" placeholder="请输入手机号" :prefix-icon="UserFilled"><!--使用v-model进行数据的双向绑定--></el-input>
        </el-form-item>
        <el-form-item prop="passWord">
          <el-input v-model="loginForm.passWord" type="passWord" placeholder="请输入密码" :prefix-icon="Lock"><!--密码不可见，设置type为passWord--></el-input>
        </el-form-item>
        <el-form-item v-if="formType" prop="validCode">
          <el-input v-model="loginForm.validCode" placeholder="请输入验证码" :prefix-icon="UserFilled">
            <template #append >
              <span @click="countDownChange">{{countDown.text}}</span>
            </template>
          </el-input>
        </el-form-item>
        </el-form>
      </el-card>
    </el-row>
</template>

<script setup>
import { ElMessage } from 'element-plus';
import { fa, tr } from 'element-plus/es/locales.mjs';
import { ref,reactive } from 'vue';
const imgUrl = new URL('../../public/login-head.png', import.meta.url).href
//0登录，1注册
const  formType = ref(0)
const handleChange = () => {
  formType.value = !formType.value// ? 0 : 1
}
const loginForm = reactive({
  userName: '',
  passWord: '',
  validCode: ''
})
const countDown = reactive({
  text :"验证码",
  time :60
})
let flag = false
const countDownChange = ()=>{
  //如果已经点击了发送验证码就不能再带点击
  if(flag)return
  //创建正则实例
  const phoneReg = /^1(3[0-9]|4[01456789]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}&/ 
  //用正则判断手机号是否正确
  if(!loginForm.userName||!phoneReg.test(loginForm.userName)){
    console.log("用户名或密码不正确,请确认后再输入")//控制台有输出但是页面没有弹窗
    return ElMessage({
      message:"用户名或密码不正确,请确认后再输入",
      type : "warning"
    })
  }
  //倒计时
  setInterval(()=>{
    if (countDow.time<=0){
        countDow.text = "请再次发送"
        countDow.time = 60
        flag = false
  }else{
        countDow.time -=0
        countDow.text = "还有&{countDow.time}s"
  }
  },1000)//1s执行一次
  flag = true
}
</script>

<style scoped>
:deep(.el-card__header) {
    padding: 0
  }
  .login-container {
    height: 100%;
    .card-header{
      background-color: #899fe1;
      img {
        width: 430px;
      }
    }
    .jump-link {
      text-align: right;
      margin-bottom: 10px;
    }
  }
  .flex-box{
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>

<template>
      <PanelHead />
      <div class="btns"><!--在同一行挨着排所以用flex-->
            <el-button :icon="Plus" type="primary" @click="open(null)" size="small">新增</el-button>
      </div>
      <div class="pagination-info">
      <el-table :data="tableData.list">
            <el-table-column type="selection" width="55"
            @selection-change="handleSelectionChange"/>
            <el-table-column prop="id" label="id"/>
            <el-table-column prop="name" label="昵称"/>
            <el-table-column label="头像">
                  <template #default="scoped">
                        <el-image 
                              style="width: 50px;height: 50px;"
                              :src="scoped.row.avatar"
                        />
                  </template>
            </el-table-column>
            <el-table-column prop="sex" label="性别">
                  <template #default="scoped">
                        {{ scoped.row.sex === 1 ? '男' : '女' }}
                  </template>
            </el-table-column>
            <el-table-column prop="age" label="年龄"></el-table-column>
            <el-table-column prop="mobile" label="手机号"></el-table-column>
            <el-table-column prop="active" label="状态">
                  <template #default="scoped">
                        <el-tag :type="scoped.row.active ? 'success' : 'danger'">{{scoped.row.active ?'正常' : '失效'}}</el-tag>
                  </template>
            </el-table-column>
            <el-table-column label="创建时间">
                  <template #default="scoped"><!--插槽格式-->
                        <div class="flex-box">
                              <el-icon ><Clock /></el-icon>
                              <span style="margin-left: 10px">{{ scoped.row.create_time }}</span>
                        </div>
                  </template>
            </el-table-column>
            <el-table-column label="操作">
                  <template #default="scoped">
                        <el-button type="primary" @click="open(scoped.row)">编辑</el-button><!--点击打开修改菜单-->
                  </template>
            </el-table-column>
      </el-table>
      <div class="pagination-info">
      <el-pagination
            v-model:current-page="paginationData.pageNum"
            :page-size="paginationData.pageSize"
            size="small"
            :background="background"
            layout="total, prev, pager, next"
            :total="tableData.total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
      />
      </div>
      <el-dialog
            v-model="dialogFormVisible"
            title="陪护师添加"
            width="500"
            :before-close="beforeClose"
      >
      <el-form
            ref="formRef"
            label-width="100px"
            label-position="left"
            :model ="form"
            :rules="rules"
      >
            <el-form-item v-show="false" prop="id"><!--隐藏id-->
                  <el-input v-model="form.id"></el-input>
            </el-form-item >
            <el-form-item prop="name" label="名称">
                  <el-input v-model="form.name" placeholder="请输入名称"></el-input>
            </el-form-item>
            <el-form-item prop="avatar" label="头像">
                  <el-button v-if="!form.avatar" type="primary" @click="dialogImgVisible=true">点击上传</el-button>
                  <el-image v-else 
                  :src="form.avatar"
                  style="width: 100px;height: 100px;"
                  >
                  </el-image>
            </el-form-item>
            <el-form-item prop="sex" label="性别" placeholder="请选择">
                  <el-select v-model="form.sex" placeholder="请选择性别">
                        <el-option label="男" value="1"></el-option>
                        <el-option label="女" value="2"></el-option>
            </el-select>
            </el-form-item>
            <el-form-item prop="age" label="年龄">
                  <el-input-number v-model="form.age" :min="1" :max="100" @change="handleChange"></el-input-number>
            </el-form-item> 
            <el-form-item prop="mobile" label="手机号">
                  <el-input v-model="form.mobile"></el-input>
            </el-form-item>
            <el-form-item prop="active" label="是否生效">
                  <el-radio-group v-model="form.active">
                  <el-radio :value="1">生效</el-radio>
                  <el-radio :value="0">失效</el-radio>  
                  </el-radio-group>
            </el-form-item>
      </el-form>
            <template #footer>
                  <div class="dialog-footer">
                        <el-button type="primary" @click="confrim(formRef)">添加</el-button>
                  </div>
            </template>
      </el-dialog>
      <el-dialog
            v-model="dialogImgVisible"
            title="头像选择"
            width="680"
            :before-close="beforeClose"
      >
            <div class="image-list">
                  <div v-for="(item,index) in fileList" :key="item.name" class="img-box" @click="selectIndex=index">
                        <div v-if="selectIndex === index" class="select">
                              <el-icon color="#fff"><Check /></el-icon>
                        </div>
                        <el-image
                              style="width: 148px;height: 148px;"
                              :src="item.url"
                        />
                  </div>
            </div>
            <template #footer>
                  <div class="dialog-footer">
                        <el-button @click="dialogImgVisible=false">取消</el-button>
                        <el-button type="primary" @click="confrimImage">添加</el-button>
                  </div>
            </template>
      </el-dialog>
      </div>
</template>
<script setup>
import { ref,reactive,onMounted, nextTick } from 'vue'
import { Check, Plus, Clock } from '@element-plus/icons-vue'
import { photoList,companion,companionList } from '../../../api'//分别用于获取头像列表，添加陪护师，获取陪护师列表
import { ElMessage } from 'element-plus'
import  dayjs  from 'dayjs';

onMounted(() => {//生命周期钩子函数
      photoList().then(({data}) => {
            fileList.value = data.data//将获取到的数据赋值给fileList
      })
      getListData()
})
//图片列表实例
const fileList = ref([])//创建头像列表实例
//选择下标实例
const selectIndex = ref(0)
//控制弹窗出现的变量
const dialogFormVisible = ref(false)//默认关闭弹窗
//分页参数
const paginationData = reactive({//创建对象作为menuList参数，通过文档查看get的参数需要对象
      pageNum: 1,
      pageSize: 10
})
//列表数据
const tableData = reactive({
      list:[],
      total:0
})
//选中函数
const handleSelectionChange = () => {
      
}
//打开弹窗
const open = () => {
      dialogFormVisible.value = true
}
//封装request函数
const getListData = () => {
      companionList(paginationData).then(({data}) => {
            const {list,total} = data.data
            tableData.list = list
            tableData.total = total
      })
}
//点击页码回调
const handleSizeChange = (val) => {
      paginationData.pageSize = val
      getListData()
}
//点击当前分页回调
const handleCurrentChange = (val) => {
      paginationData.pageNum = val
      getListData()
}
//关闭弹窗触发
const beforeClose = () => {
      dialogFormVisible.value = false
      formRef.value.resetFields()//重置表单
}
//创建表单实例
const formRef = ref()
//创建表单数据实例
const form = reactive({
      id:'',
      name:'',
      avatar:'',
      sex:1,
      age:28,
      mobile:'',
      active:''
})
//表单校验规则
const rules = reactive({
      name:[{required:true,trigger:'blur',message:"请输入名称"}],//必填属性，失去焦点，提醒用户
      avatar:[{required:true,message:"请输入头像"}],//必填属性，失去焦点，提醒用户
      sex:[{required:true,trigger:'change',message:"请输入性别"}],//必填属性，失去焦点，提醒用户
      mobile:[{required:true,trigger:'blur',message:"请输入手机号"}]//必填属性，失去焦点，提醒用户
})
//改变年龄
const handleChange = () => {
      
}
//确认添加，以及触发表单验证
const confrim = async(formEl) => {
      if(!formRef)return
      await formEl.validate((valid,fields) => {
            if(valid){
                  companion(form).then(({data}) => {
                        if(data.code === 10000){
                              ElMessage.success("添加成功")
                              getListData()
                              beforeClose()
                        }else{
                              ElMessage.error('data')
                        }
                  })
            }else{
                  console.log('error submit!',fields)
            }
      })
}
//控制头像弹窗的变量
const dialogImgVisible = ref(false)
// //关闭头像弹窗
// const beforeCloseImage = () => {
//       dialogImgVisible = false
// }
//控制头像确认
const confrimImage =  () => {
      form.avatar = fileList.value[selectIndex.value].url
      dialogImgVisible.value = false
}
</script>
<style lang = 'less' scoped>
      .btns {
            padding: 10px 0 10px 10px;
            background-color: #fff;
      }
      .image-list {
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            .img-box {
            position: relative;
            .select {
                  position: absolute;
                  left: 0px;
                  top: 0px;
                  width: 24px;
                  height: 24px;
                  background-color: #67c23a;
                  z-index: 999;
                  display: flex;
                  justify-content: center;
                  align-items: center;
            }
            }
            .el-image {
                  margin-right: 10px;
                  margin-bottom: 10px;
            }
      }
</style>
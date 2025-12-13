<template>
      <PanelHead />
      <div class="btns">
            <el-button :icon="Plus" type="primary" @click="open(null)" size="small">增加</el-button>
      </div>
      <div class="pagination-info">
      <el-table :data="tableData.list">
            <el-table-column prop="id" label="id"/>
            <el-table-column prop="name" label="昵称"/>
            <el-table-column prop="permissions_id" label="所属组别">
                  <template #default="scoped">
                        {{permissionName(scoped.row.permissions_id)  }}
                  </template>
            </el-table-column>
            <el-table-column prop="mobile" label="手机号"></el-table-column>
            <el-table-column prop="active" label="状态">
                  <template #default="scoped">
                        <el-tag :type="scoped.row.active ? 'success' : 'danger'">{{ scoped.row.active ? '正常':'失效' }}</el-tag><!--带:的type代表是动态属性-->
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
      <div class="pagination-info>">
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
            title="添加权限"
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
                  <el-form-item label="手机号" prop="mobile">
                        <el-input v-model="form.mobile" disabled="false">
                        {{ form.mobile }}
                        </el-input>
                  </el-form-item>
                  <el-form-item label="名称" prop="name">
                        <el-input v-model="form.name" placeholder="请输入权限名称"></el-input>
                  </el-form-item>
                  <el-form-item laba="菜单权限" prop="permissions_id">
                        <el-select
                        v-model="form.permissions_id"
                        aria-placeholder="请选择权限"
                        style="width: 240px;"
                        >
                              <el-option v-for="item in options" :key="item.id" 
                              :label="item.name" :value="item.id">
                              </el-option>
                        </el-select>
                  </el-form-item> 
            </el-form>
            <template #footer>
                  <div class="dialog-footer">
                        <el-button type="primary" @click="confrim(formRef)">确认</el-button>
                  </div>
            </template>
      </el-dialog>
      </div>
</template>

<script setup>
import { authAdmin,menuSelectList,updateUser } from '../../../api';//分别用于获取管理员列表，获取权限列表，更新管理员信息
import { reactive,onMounted,ref, nextTick } from 'vue';//onMounted钩子函数
import { Plus } from '@element-plus/icons-vue';
import  dayjs  from 'dayjs';
import { ElMessage } from 'element-plus';
const paginationData = reactive({//创建对象作为authAdmin参数，通过文档查看get的参数需要对象
      pageNum: 1,
      pageSize: 10
})
//列表数据
const tableData = reactive({
      list:[],
      total:0
})
//用于接收数据
const options = ref([]);
//创建表单实例，并声明其对应属性
const form = reactive({
      name: '',
      permissions_id: ''
})
//创建树形结构的数据实例
const permissionData = reactive({})
onMounted(()=>{
      getListData()
      menuSelectList().then(({data}) => {//创建实例
            options.value = data.data
            permissionData.value = data.data
      })
      getListData()     
})
//封装，请求列表数据
const getListData = () => {
      authAdmin(paginationData).then(({data})=>{//创建实例
            console.log(data,'authAdmin')
            const {list,total} = data.data
            list.forEach(item => {
                  item.create_time = dayjs(item.create_time).format('YYYY-MM-DD') //将时间戳转换为日期格式 Year-Month-Day
            });
            tableData.list = list
            tableData.total = total
      })
}
//根据id匹配权限名称
const permissionName = (id) => {
      const data = options.value.find(el => el.id === id)
      return data ? data.name : '超级管理员'
}
const dialogFormVisible = ref()
const beforeClose = () => {
      dialogFormVisible.value = false
}
const open = (rowData) => {
      dialogFormVisible.value = true
      //整体进行赋值,浅克隆
      Object.assign(form,{mobile:rowData.mobile,name:rowData.name,permissions_id:rowData.permissions_id})
}
const handleCurrentChange = (val) => {
      paginationData.pageNum = val
      getListData()
}
const handleSizeChange = (val) => {
      paginationData.pageSize = val
      getListData()
}
//生成校验规则实例
const rules = reactive({
      name:[{required:true,trigger:'blur',message:"请输入权限名称"}],//必填属性，失去焦点，提醒用户
      permissions_id:[{required:true,trigger:'blur',message:"请选择权限"}]//必填
})
//生成树形表单的实例
const treeRef = ref()
//生成权限表单实例
const formRef = ref()
//确认并校验
const confrim = async (formEl) => {
      if(!formEl)return
      await formEl.validate((valid,fields)=> {
            if(valid){
                  //解构form中的数据
                  const { name,permissions_id } = form
                  updateUser({ name,permissions_id }).then(({data}) => {//需要添加的权限数据是model绑定的值不要写错了
                        if(data.code === 10000){
                              beforeClose()
                              getListData()
                        }
                  })
            }else{
                  console.log('error submit!',fields)
            }
      })
}
</script>
<style lang = 'less' scoped>
.flex-box{
      display: flex;
      justify-content: flex-start
}
.btns{
      padding: 10px 0 10px 10px;
      background-color: #fff;
}
</style>
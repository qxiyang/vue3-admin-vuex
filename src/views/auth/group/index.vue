<template>
      <PanelHead />
      <div class="btns">
            <el-button :icon="Plus" type="primary" @click="open(null)" size="small">增加</el-button>
      </div>
      <el-table :data="tableData.list">
            <el-table-column prop="id" label="id"/>
            <el-table-column prop="name" label="昵称"/>
            <el-table-column prop="permissionName" label="菜单权限"/>
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
                  <el-form-item prop="id" v-show="false"><!--不可见-->
                        <el-input v-model="form.id"/>
                  </el-form-item>
                  <el-form-item label="名称" prop="name">
                        <el-input v-model="form.name" placeholder="请输入权限名称"></el-input>
                  </el-form-item>
                  <el-form-item label="权限" prop="permissions">
                        <el-tree
                              ref="treeRef"
                              style="max-width: 600px;"
                              :data="permissionData"
                              node-key="id"
                              show-checkbox
                              :default-checked-keys="defaultKeys"
                              :default-expanded-keys="[2]"
                        />
                  </el-form-item>
            </el-form>
            <template #footer>
                  <div class="dialog-footer">
                        <el-button type="primary" @click="confrim(formRef)">确认</el-button>
                  </div>
            </template>
      </el-dialog>
</template>

<script setup> 
import { userGetMenu,userSetMenu,menuList } from '../../../api'
import { ref,reactive,onMounted, nextTick } from 'vue'
import { Plus } from '@element-plus/icons-vue'
//组件声明周期，点击的时候
onMounted(()=>{
      //获取菜单数据
      userGetMenu().then(({data})=>{
            // console.log(data)
            permissionData.value = data.data//将菜单数据传递给permissionData，从而使树形结构能够获取数据
      })
      getListData()

})
//列表数据
const tableData = reactive({
      list:[],
      total:0
})
//分页参数
const paginationData = reactive({//创建对象作为menuList参数，通过文档查看get的参数需要对象
      pageNum: 1,
      pageSize: 10
})
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
//获取列表数据，会多次调用所以用实例接受方便复用
const getListData = () => {
      menuList(paginationData).then(({data}) => {
      // console.log('接口返回的完整数据：', data)
      const {list,total} = data.data//将数据解构出来
      tableData.list = list
      tableData.total = total
})
}
//弹窗的显示隐藏
const dialogFormVisible = ref(false)
//通过编辑打开菜单
const open = (rowData = {}) => {
      dialogFormVisible.value = true
      //操作为异步
      nextTick(() => {
            if(rowData){
                  //使用浅克隆
                  Object.assign(form,{id:rowData.id,name:rowData.name})
                  treeRef.value.setCheckedKeys(rowData.permissions)
            }
      })
}
//关闭弹窗的回调
const beforeClose = () => { 
      dialogFormVisible.value = false 
      //重置表单
      formRef.value.resetFields()
      //重置权限勾选
      treeRef.value.setCheckedKeys(defaultKeys)

}
//form通过model绑定这两个属性，这两个属性的值是动态的
const form = reactive({
      id:'',
      name: '',
      permissions: ''
})
//通过reactvie创建规则实例
const rules = reactive({
      name:[{required:true,trigger:'blur',message:"请输入权限名称"}]//必填属性，失去焦点，提醒用户
})
//树形菜单权限数据
const permissionData = ref([])
//默认选中的权限
const defaultKeys = [4,5]
//获取表单权限的数据
const treeRef = ref()
//创建表单实例对应表单的ref属性
//ref本质是获取表单组件的 DOM / 实例引用，从而直接调用 Element Plus 封装的表单方法
const formRef = ref()
//点击触发校验
const confrim = async(formEl) => {//异步操作
      if(!formEl)return
      await formEl.validate((valid,fields)=> {
            if(valid){
                  //获取到选中的权限的数据, 因为要求数据是strinhg类型所以需要string化
                  const permissions = JSON.stringify(treeRef.value.getCheckedKeys())
                  userSetMenu({name:form.name,permissions,id:form.id}).then(({data}) => {//需要添加的权限数据是model绑定的值不要写错了
                  getListData()
                  beforeClose()
                  })
            }else{
                  console.log('error submit!',fields)
            }
      })
}
</script>

<style lang = 'less' scoped>
      .btns{
            padding: 10px 0 10px 10px;
            background-color: #fff;
      }
      .active {
            align-items: center;
      }
</style>
<script setup>
import Aside from '../components/aside.vue'
import Header from '../components/header.vue'
</script>

<template>
  <!-- <div>
    Layout
  </div>   -->
  <div class="common-layout">
    <el-container>
        <Aside />
      <el-container>
        <!-- <el-aside width="200px">Aside</el-aside> -->
        <el-header>
          <Header />
        </el-header>
        <el-main>
          <RouterView />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style lang = 'less' scoped>
  .common-layout{
    height: 100%;
    width: 100%;
  }
  .el-header {//浏览始终存在header两边空白原来是有因为默认padding为20------2025.11.30
    padding: 0;
  }
</style>

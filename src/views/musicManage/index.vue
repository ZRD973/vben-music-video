<template>
  <h1 class="home">音乐信息管理</h1>


</template>

<script lang="ts" setup>
import { onUnmounted,onActivated,onDeactivated } from 'vue';
import { getAllUser } from '/@/api/sys/user';
  getAllUser().then(res=>{
    console.log(res);
  })
  onUnmounted(()=>{
    console.log("onUnmounted");
  });
  onActivated(()=>{
    console.log("onActivated");
  })
  onDeactivated(()=>{
    console.log("onDeactivated");
  })
</script>
<style lang="less" scoped>
.home{
  font-size: 20px;
}
</style>

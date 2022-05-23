<template>
  <div>
    <div class="navbar">
      <navbar></navbar>
    </div>
    <div class="content">
      <!-- <keep-alive></keep-alive> -->
        <RouterView v-if="isRouterAlive" />
    </div>
    <div class="footer">
      <myfooter></myfooter>
    </div>
    <go-top></go-top>
  </div>
</template>
<script lang="ts">
export default{
  name:"Display"
}
</script>
<script lang="ts" setup>
// import { useUserStore } from '/@/store/modules/user';
// const userStore = useUserStore();
import GoTop from './coms/GoTop.vue';
import navbar from './coms/navbar.vue';
import myfooter from './coms/footer.vue';
import { ref, provide, nextTick } from 'vue';

const isRouterAlive = ref(true);
const reload = () =>{
  isRouterAlive.value = false
  nextTick(()=>{
    isRouterAlive.value = true;
  })
}
provide('reload', reload);

</script>
<style lang="less" scoped>
.content{
  // width:80vw;
  min-height: calc(100vh - 100px);
  // background-color: #2e2e37;
  margin: 0 auto;
  padding-top: 65px;
}
</style>

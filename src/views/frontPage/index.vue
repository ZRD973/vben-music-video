<template>
  <div>
    <div class="navbar">
      <navbar></navbar>
    </div>
    <div class="content">
        <RouterView/>
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

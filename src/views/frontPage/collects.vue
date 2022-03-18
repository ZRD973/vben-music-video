<template>
  <!-- 视频列表 -->
  <div class="colle_mian">
    <videoList :videoList="randomData" description="现在收藏夹里还是空空的，我很孤单呢！您还没有收藏喜欢的视频，赶紧去看看吧！"></videoList>
  </div>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import videoList from './coms/videoList.vue';  
  const randomData = ref([
    // {
    //   url: 'https://puui.qpic.cn/qqvideo_ori/0/u0017v7lg3p_228_128/0',
    //   title: '你值得更好的',
    //   author: '张杰',
    // },
  ]);
</script>
<style lang="less" scoped>
.colle_mian{
  padding: 30px;
}
</style>

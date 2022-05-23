<template>
  <!-- 视频列表 -->
  <div class="colle_mian" v-loading="loading">
    <videoList :videoList="randomData" description="现在收藏夹里还是空空的，我很孤单呢！您还没有收藏喜欢的视频，赶紧去看看吧！"></videoList>
  </div>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import videoList from './coms/videoList.vue';  
  import { getUserCollect } from '/@/api/video/video';
  const loading = ref(true)
  const randomData = ref([]);
  getUserCollect().then(res=>{
    randomData.value = res;
    loading.value = false;
  })
</script>
<style lang="less" scoped>
.colle_mian{
  padding: 30px;
}
</style>

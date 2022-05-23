<template>
  <!-- 视频列表 -->
  <div class="colle_mian" v-loading="loading">
    <div class="tips" v-if="count">为您找到了{{count}}个视频</div>
    <videoList :videoList="randomData" :description="!route.query.search?'请输入关键词搜索':'没有找到您想要的视频哦，换个词试试！'"></videoList>
  </div>
</template>
<script lang="ts" setup>
  import {  ref, watchEffect } from 'vue';
  import videoList from './coms/videoList.vue';
  import { useRoute } from 'vue-router';
  import { getVideoInfo } from '/@/api/video/video';

  const route: any = useRoute();
  const loading = ref(true);
  const randomData: any = ref([]);
  const count: any = ref(0);

  watchEffect(() => {
    if (route.query.search) {
      getVideoInfo({
        limit: 20,
        page: 1,
        search: route.query.search,
      })
        .then((res) => {
          randomData.value = res.rows;
          count.value = res.count;
        })
        .finally(() => {
          loading.value = false;
        });
    }else{
      randomData.value=[]
      count.value = 0;
      loading.value = false;
    }
  });
</script>
<style lang="less" scoped>
  .colle_mian {
    padding: 30px;
    .tips{
      font-size: 16px;
      margin-bottom: 10px;
    }
  }
</style>

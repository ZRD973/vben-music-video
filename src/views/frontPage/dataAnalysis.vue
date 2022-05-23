<template>
  <div class="p-4">
    <GrowCard :loading="loading" class="enter-y" />
    <!-- <SiteAnalysis class="!my-4 enter-y" :loading="loading" /> -->
    <div style="margin: 20px 0;justify-content: space-around;" class="md:flex enter-y">
      <VideoStyle class="md:w-1/3 !md:mx-4 !md:my-0 !my-4 w-full" :loading="loading" />
      <VideoAction class="md:w-1/3 !md:mx-4 w-full" :loading="loading" />
      <!-- <SalesProductPie class="md:w-1/3 !md:mx-4 w-full" :loading="loading" /> -->
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import GrowCard from '/@/views/frontPage/coms/analysis/GrowCard.vue';
  // import SiteAnalysis from '/@/views/frontPage/coms/analysis/SiteAnalysis.vue';
  import VideoStyle from '/@/views/frontPage/coms/analysis/VideoStyle.vue';
  // import SalesProductPie from '/@/views/frontPage/coms/analysis/SalesProductPie.vue';
  import VideoAction from '/@/views/frontPage/coms/analysis/VideoAction.vue';
  const loading = ref(true);

  setTimeout(() => {
    loading.value = false;
  }, 1000);

</script>

<style lang="less" scoped></style>

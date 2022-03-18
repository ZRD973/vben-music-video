<template>
  <!-- 视频列表 -->
  <div class="card-wrap" v-if="videoList?.length">
    <Card hoverable style="width: 240px" v-for="item in videoList" @click="handleOpenVideo(item)">
      <template #cover>
        <img alt="example" :src="item.url" />
      </template>
      <CardMeta :title="item.title">
        <template #description>{{ item.author }}</template>
      </CardMeta>
    </Card>
  </div>
  <Empty v-else :image="simpleImage">
    <template #description>
      <span class="description"> {{description}}</span>
    </template>
  </Empty>
</template>
<script lang="ts" setup>
  import { useRouter } from 'vue-router'; 
  import { Card, CardMeta } from 'ant-design-vue';
  import { VideoListItem }  from '/@/../types/views';
  import { Empty } from 'ant-design-vue';
  const simpleImage:any =  Empty.PRESENTED_IMAGE_SIMPLE;
  defineProps({
    videoList: {
      type: Array as PropType<VideoListItem[]>,
    },
    description:{
      type:String,
      default:'暂时没有数据哦'
    }
  });
  const router = useRouter();
  const handleOpenVideo = (item) =>{
    console.log(item);
    router.push(`video${item.id}`)
  }

</script>
<style lang="less" scoped>
  .card-wrap {
    display: flex;
    flex-flow: row wrap;
    align-content: flex-start;
  }
  :deep(.ant-card) {
    box-sizing: border-box;
    // background-color: #2e2e37;
    flex: 0 0 50%;
    padding: 0 8px 8px;
    margin-bottom: 20px;
  }
   @media (min-width: 884px){
    :deep(.ant-card){
      flex: 0 0 33.3%;
    }
  }
  @media (min-width: 1140px){
    :deep(.ant-card){
      flex: 0 0 25%;
    }
  }
  @media (min-width: 1596px){
    :deep(.ant-card){
      flex: 0 0 20%;
    }
  }
  
 
  :deep(.ant-card-cover) {
    // width: 260px;
    // height: 208px;
    // max-height: 208px;
    // display: table-cell;
    // vertical-align: middle;
    img {
      width: 100%;
      height: 100%;
      // max-width: 100%;
      // max-height: 100%;
      display: block;
      margin: auto;
      opacity: 0.9;
    }
    img:hover{
      opacity: 1;
    }
  }
  :deep(.ant-card-body) {
    padding: 10px 0 5px 5px;
    .ant-card-meta-title:hover,
    .ant-card-meta-description:hover {
      color: #dc7d2b;
    }
  }
  .description{
    font-size: 20px;
    
  }
</style>

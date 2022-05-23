<template>
  <!-- 视频列表 -->
  <div class="card-wrap" v-if="videoList?.length">
    <Card hoverable style="width: 240px" v-for="item in videoList" @click="handleOpenVideo(item)">
      <template #cover>
        <!-- <img alt="example" :src="item.cover_url" /> -->
        <video class="video" :src="item.video_url"></video>
      </template>
      <CardMeta :title="item.title">
        <template #description>
          <div class="card-wrap-botom">
              <span class="first">{{ item.singer.length?item.singer[0].name:"未知"}}</span>
              <span>{{item.type}}</span>
              <span>{{item.area}}</span>
              <span>{{item.style}}</span>
            </div>
        </template>
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
    router.push({
      path:`video`,
      query:{
        id:item.id
      }
    })
  }

</script>
<style lang="less" scoped>
  .card-wrap {
    display: flex;
    flex-flow: row wrap;
    align-content: flex-start;
    .card-wrap-botom{
      display: flex;
      justify-content: space-between;
      .first{
        display: block;
        max-width: 140px;
        height: 22px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
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
    // max-height: 153px;
    // display: table-cell;
    // vertical-align: middle;
    .video{
      max-height: 153px;
    }
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

<template>
  <!-- 视频列表 -->
  <div class="btn_group">
    <el-button :type="isItemBased?'primary':'' " @click="getItemBased">基于视频</el-button>
    <el-button :type="!isItemBased?'primary':'' " type="primary" @click="getUserBased">基于用户</el-button>
  </div>
  <div class="recommend_mian" v-loading="loading">
    <div class="card-wrap" v-if="videoList?.length">
     <Card hoverable style="width: 240px" v-for="item in videoList" @click="handleOpenVideo(item)">
      <template #cover>
        <!-- <img alt="example" :src="item.cover_url" /> -->
        <video class="video" :src="item.video_url"></video>
      </template>
      <CardMeta :title="item.title">
        <template #description>
          <div class="card-wrap-botom">
              <span class="first">歌手：{{ item.name || "未知"}}</span>
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
      <span class="description"> {{"暂时没有推荐的视频哦"}}</span>
    </template>
  </Empty>
  </div>
</template>
<script lang="ts" setup>
  import { onMounted, ref } from 'vue';
  import { getOccfRecommend } from '/@/api/video/statistics';
  import { useRouter } from 'vue-router'; 
  import { Card, CardMeta } from 'ant-design-vue';
  import { Empty } from 'ant-design-vue';
  const simpleImage:any =  Empty.PRESENTED_IMAGE_SIMPLE;
  const loading = ref(true)
  const router = useRouter();
  const handleOpenVideo = (item) =>{
    router.push({
      path:`video`,
      query:{
        id:item.id
      }
    })
  }
  const videoList:any = ref([]);

  const getOccf = () =>{
    getOccfRecommend({
      flag:item.value
    }).then(res=>{
      videoList.value = res;
    }).finally(()=>{
      loading.value = false;
    })
  }

const item = ref(1);
const isItemBased = ref(true);
const getItemBased = () =>{
  isItemBased.value = true;
  item.value = 1;
  getOccf();
}
const getUserBased = () =>{
  isItemBased.value = false;
  item.value = 0;
  getOccf();
}

onMounted(()=>{
  getOccf();
})

</script>

<style lang="less" scoped>
.btn_group{
  position: fixed;
  // top: -10px;
  left: 50%;
  // top: -10px;
  top: 80px;
  transform: translate(-50%);
}
.recommend_mian {
    padding: 30px;
    margin: 20px 0;
}
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

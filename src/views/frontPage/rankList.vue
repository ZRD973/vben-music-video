<template>
<div v-loading="loading">
  <div class="title">
    <span class="title hcqStyle text">音乐视频排行榜</span>
  </div>
  <div style="text-align: center;margin-bottom: 10px;">
    <el-button type="warning" @click="$router.push('pandas')">数据分析</el-button>
  </div>
  <div class="rank_wrapper" v-show="openAll">
    <div class="wrapper">
      <ranking class="ranking" title="热度" :data="rankModel.heat" @show-all="showAll"></ranking>
      <ranking class="ranking" title="流行" en="popular" :data="popular" @show-all="showAll"></ranking>
      <ranking class="ranking" title="MV" :data="MV" @show-all="showAll"></ranking>
      <ranking class="ranking" title="点赞" :data="rankModel.favour" @show-all="showAll"></ranking>
      <ranking class="ranking" title="收藏" :data="rankModel.collect" @show-all="showAll"></ranking>
      <ranking class="ranking" title="评论" :data="rankModel.comment" @show-all="showAll"></ranking>
    </div>
  </div>
  <div class="allRank" v-if="!openAll">
      <ranking :data="allRank" :title="reTitle" :show="false" @back="back"></ranking>
  </div>
</div>
</template>
<script lang="ts" setup>
  import { onMounted, ref } from 'vue';
  import ranking from './coms/ranking.vue';
  import { getRankList } from '/@/api/video/statistics';
  const loading = ref(true)
  const rankModel: any = ref([]);
  const MV: any = ref([]);
  const backland: any = ref([]);
  const popular: any = ref([]);

  const initData = (data: any = {}) => {
    getRankList({
      limit: 5,
      ...data,
    }).then((res) => {
      if (data.type) {
        MV.value = res;
        return;
      }
      if (data.area) {
        backland.value = res;
        return;
      }
      if (data.style) {
        popular.value = res;
        return;
      }
      rankModel.value = res;
    }).finally(()=>{
      loading.value = false;
    })
  };

   const showAllData = (data: any = {}) => {
    getRankList({
      limit: 20,
      ...data,
    }).then((res) => {
      allRank.value = res
    });
  };

  const openAll = ref(true);
  const reTitle = ref("");
  const allRank = ref([]);
  const showAll = (title) =>{
    
    reTitle.value = title;
    openAll.value = false;
    
    if(title=="热度" || title=="点赞" || title=="收藏" || title=="评论"){
      getRankList({limit: 20}).then((res) => {
        if(title=="热度"){
          allRank.value = res.heat;
        }else if(title=="点赞"){
          allRank.value = res.favour;
        }else if(title=="收藏"){
          allRank.value = res.collect;
        }else if(title=="评论"){
          allRank.value = res.comment;
        }
      })
    }else{
      if(title=="流行"){
        showAllData({ style: '流行' });
      }else if(title=="MV"){
        showAllData({ type: 'MV' });
      }
    }

  }

  const back = () =>{
    openAll.value = !openAll.value
  }

  onMounted(() => {
    initData();
    initData({ type: 'MV' });
    initData({ area: '内地' });
    initData({ style: '流行' });
  });

</script>
<style lang="less" scoped>
  .title {
    font-size: 40px;
    font-weight: 500;
    text-align: center;
    background-image: url('/@/assets/images/bg_title.png');
    background-size: auto 242px;
    background-position: 50%;
    background-repeat: no-repeat;
    height: 200px;
    line-height: 200px;
  }
  .hcqStyle {
    color: #fac800;
    letter-spacing: 0;
    user-select: none;
    text-shadow: 0px 1px 0px #999, 0px 2px 0px #888, 0px 3px 0px #777, 0px 4px 0px #666,
      0px 5px 0px #555, 0px 6px 0px #444, 0px 7px 0px #333, 0px 8px 7px #001135;
  }
  .title:hover .hcqStyle{
    text-shadow: unset;
    background: linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 33.3%, rgba(252,176,69,1) 66.6%, rgba(131,58,180,1) 100%);
    background-clip: text; /*截取背景区域为文字*/
    color: transparent;
    background-size: 300% 100%; /*扩大背景区域*/	
    animation: text 3s infinite linear;
    font-size: 40px;
    font-weight: 600;
  }
  @keyframes text{
    0%  { background-position: 0 0;}
    100% { background-position: -150% 0;}
  }

  .rank_wrapper {
    position: relative;
    margin: 0 auto;
    width: 994px;
    min-width: 994px;
    overflow: hidden;
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    .wrapper {
      display: flex;
      flex-flow: row wrap;
      align-content: flex-start;
      justify-content: flex-start;
      flex: 0 0 50%;
      .ranking {
        margin: 20px 58px;
      }
    }
  }
  @media screen and (min-width: 1356px) and (max-width: 1559px) {
    .rank_wrapper {
      width: 1196px;
      .wrapper {
        justify-content: flex-start;
        .ranking {
          margin: 20px 9px;
        }
      }
    }
  }
  @media screen and (min-width: 1560px) and (max-width: 1795px) {
    .rank_wrapper {
      width: 1400px;
      .wrapper {
        justify-content: flex-start;
        .ranking {
          margin: 20px 43px;
        }
      }
    }
  }
  @media screen and (min-width: 1796px) {
    .rank_wrapper {
      width: 1636px;
      .wrapper {
        justify-content: flex-start;
        flex: 0 0 25%;
        .ranking {
          margin: 20px 14px;
        }
      }
    }
  }
  .allRank{
    display: flex;
    justify-content: center;
    margin-bottom: 30px;
  }
</style>

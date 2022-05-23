<template>
  <div class="ranking_wrap" :style="{height:show?'':'100%',maxHeight:show?'':'150vh'}">
    <div class="top_head">
      <span class="head_en">{{en}}</span>
      <span class="head_txt">{{title}}</span>
    </div>
    <el-button v-if="!show" style="position: absolute;left: 10px;top: 10px;" @click="back">&lt; 返回</el-button>
    <ul class="sum_ul" v-if="data?.length">
      <li class="sum_li" v-for="(item,index) in data" @click="handleOpenVideo(item)">
        <div class="mod_left">
          <div class="rank_num">
            <span class="rank_no" :style="{visibility:index==1 || index==2 || index==0 ? 'visible':'hidden' }">NO</span>
            <div class="rank_sum_num" :class="{rank_sum_num1:index==0,rank_sum_num2:index==1,rank_sum_num3:index==2}">{{index+1}}</div>
          </div>
            <!-- poster="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgKuGEZiazeYfM_9hLfz5S2R-WOpgSOWPCOZesVh6S0w&s"  -->
          <video class="video" :src="item.video_url"></video>
          <!-- <img class="video" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgKuGEZiazeYfM_9hLfz5S2R-WOpgSOWPCOZesVh6S0w&s" /> -->
        </div>
        <div class="mod_right">
          <div class="main_title">{{item.title}}</div>
          <div class="main_bottom">
            <p class="sub_des">{{item.intro}}</p>
            <div class="sub_heat">
              <FireOutlined style="color:#ff1d1d;" />
              <span class="count">{{Math.ceil(item.heat)}}</span>
            </div>
          </div>
        </div>
      </li>
    </ul>
    <Empty v-else :image="simpleImage">
      <template #description>
        <span style="font-size: 20px;">空空如也</span>
      </template>
    </Empty>
    <div class="sum_bottom" v-if="show">
      <span class="more_link" @click="showAll">查看完整榜单
        <i class="more_arrow">></i>
      </span>
    </div>
  </div>
</template>


<script lang="ts" setup>
  import { onMounted } from 'vue';
  import { useRouter } from 'vue-router'; 
  import { FireOutlined } from '@ant-design/icons-vue';
  import { RankItem }  from '/#/views';
  import { Empty } from 'ant-design-vue';
  const simpleImage:any =  Empty.PRESENTED_IMAGE_SIMPLE;
  const props = defineProps({
    en:{
      type:String,
      default:'RankInk List'
    },
    title:{
      type:String,
      default:'排行榜'
    },
    show:{
      type:Boolean,
      default:true
    },
    data:{
      type: Array as PropType<RankItem[]>,
      default(){
        return []
      }
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

  const emit = defineEmits(['showAll','back']);

  const showAll = () =>{
    emit('showAll',props.title)
  }
  const back = () =>{
    emit('back')
  }

  onMounted(() => {});
  
</script>
<style lang="less" scoped>
  @theme-color: #dc6d25;
  .ranking_wrap {
    position: relative;
    width: 380px;
    height: 550px;
    padding-top: 14px;
    padding-bottom: 7px;
    // border: 1px solid #f0f0f0;
    border: 1px solid #eae9e9;
    border-radius: 4px;
    background-color: #fff;
    overflow-y: auto;
    .top_head{
      position: relative;
      margin-bottom: 8px;
      line-height: 36px;
      text-align: center;
      .head_en{
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        top: 18px;
        text-transform: uppercase;
        white-space: nowrap;
        font: 700 24px/1 Impact;
        color: rgba(24,25,30,.1);
        background-image: -webkit-linear-gradient(top,rgba(24,25,30,.1),transparent 81%);
        -webkit-text-fill-color: transparent;
        background-clip: text;
        cursor: pointer;
      }
      .head_txt{
        position: relative;
        font-size: 26px;
        color: rgba(24,25,30,.8);
        transition: color .2s;
        cursor: pointer;
      }
      // .head_txt:hover{
      //   color: @theme-color;
      // }
    }
    .top_head:hover .head_txt{ color: @theme-color; }
    .sum_ul{
      list-style: none;
      .sum_li{
        padding: 7px 6px;
        cursor: pointer;
        display: flex;
        justify-content: space-between;
        .mod_left{
          position: relative;
          width: 48%;
          .rank_num{
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            .rank_no{
              visibility: visible;
              visibility: hidden;
              position: absolute;
              left: 3px;
              bottom: 0px;
              font-family: Impact;
              font-size: 32px;
              line-height: 1;
              color: rgba(24,25,30,.1);
              -webkit-text-fill-color: transparent;
              background-clip: text;
              background-image: -webkit-linear-gradient(top,rgba(24,25,30,.13),rgba(24,25,30,.04));
              text-align: center;
              transform: skew(-10deg);
            }
            .rank_sum_num{
              // -webkit-text-fill-color: transparent;
              background-clip: text;
              color: rgba(24,25,30,.2);
              background-image: -webkit-linear-gradient(top,rgba(24,25,30,.13),rgba(24,25,30,.04));
              line-height: 73px;
              position: relative;
              width: 40px;
              font: 600 40px Impact;
              text-align: center;
              transform: skew(-10deg);
            }
          }
          .video{
            height: 73px;
            margin-left: 50px;
          }
        }
        .mod_right{
          width: 46%;
          height: 73px;
          overflow: hidden;
          .main_title{
            font-weight: 400;
            display: block;
            margin-bottom: 10px;
            line-height: 18px;
            color: #18191e;
            font-size: 16px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            transition: all .2s;
          }
          .main_title:hover{
            color: @theme-color;
          }
          .main_bottom{
            margin-right: 10px;
            .sub_des{
              margin-bottom: 10px;
              line-height: 16px;
              color: #18191e;
              opacity: .6;
              font-size: 14px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            .count{
              color: #18191e;
              opacity: .5;
              font-size: 14px;
              margin-left: 10px;
            }
          }
        }
      }
      
      .sum_li:hover{
        background-color: #f8f4f4;
      }
    }
    
    .sum_bottom{
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      text-align: center;
      .more_link{
        display: inline-block;
        line-height: 40px;
        font-size: 14px;
        color: rgba(24,25,30,.4);
        cursor: pointer;
        transform: translateX(4px);
        transition: all .2s;
      }
      .more_arrow{
        display: inline-block;
        transform: scale(0);
        transition: all .2s;
      }
      .more_link:hover{
        color: @theme-color;
        transform: scale(1);
      }
      .more_link:hover .more_arrow{
        color: @theme-color;
        transform: scale(1);
      }
    }
  }
  .rank_sum_num1{
    color: #ff4c22 !important;
    background-image: -webkit-linear-gradient(top,#ff4c22,#ff2c1d) !important;
  }
  .rank_sum_num2{
    color: #ff8e3e !important;
    background-image: -webkit-linear-gradient(top,#ff8e3e,#ff8e3e) !important;
  }
  .rank_sum_num3{
    color: #ffb722 !important;
    background-image: -webkit-linear-gradient(top,#ffb722,#ffa300) !important;
  }
</style>

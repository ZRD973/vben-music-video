<template>
  <div class="video_wrapper">
    <el-button v-if="route.path == '/display/video'" type="warning" size="small" style="position: absolute; left: 1%; top: 2px;" @click="backPre">{{"<返回"}}</el-button>
    <!-- 上半部分视频区 -->
    <div class="container_main__wrapper">
      <div class="container_main">
        <div class="container_main__left">
          <div class="player__wrapper container_player">
            <!-- <video class="video" src="http://127.0.0.1:7001/public/videos"  controls autoplay></video> -->
            <video class="video" :src="videoInfo.video_url"  controls autoplay></video>
            <!-- <video class="video" src="http://127.0.0.1:7001/public/video/20220324/1648119670883淋雨一起走.mp4"  controls autoplay></video> -->
            <!-- <video class="video" src="https://popular-music-video.obs.cn-east-2.myhuaweicloud.com/202203201647706951703哪里都是你.mp4"  controls autoplay></video> -->
            <!-- <video class="video" src="../../assets/哪里都是你.mp4"  controls></video> -->
            <div class="player_bottom__intro">
              <div class="play_title">
                <span>{{singer}}：</span>
                <span>《{{videoInfo.title}}》</span>
              </div>
              <div class="player_bottom_popup">
                <div class="player_bottom_popup_btns">
                  <Button class="player_bottom_like btn" :class="{activeLike:Like}" shape="round" size="small" @click="handleLike">
                    <template #icon> <HeartOutlined />  {{ '( ' + videoInfo.amount.favour_amount + ' )' }}</template>
                  </Button>
                  
                  <Button class="player_bottom_star btn" :class="{activeStar:Star}" shape="round" size="small" @click="handleStar">
                    <template #icon> <StarOutlined />  {{ '( ' + videoInfo.amount.collect_amount + ' )' }}</template>
                  </Button>
                  <div class="mv_intro_fold_btn" :class="{activeIntro:isShowIntro}" @click="handleShowIntro"> 
                    <ProfileOutlined />
                    <span style="margin-left:5px;">简介</span>
                    <DownOutlined v-if="isShowIntro" /> <UpOutlined v-else />
                  </div>
                </div>
                <div class="player_bottom_popup_time">发布时间：{{videoInfo.created_at}}</div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="container_episode">
          <div class="episode_list">
            <div class="container_episode_title">为你推荐 &nbsp;
              <el-button :type="isSameType? 'primary' :'' " size="small" @click="getEpisode">相同类型</el-button>
              <el-button :type="!isSameType? 'primary' :'' " size="small" style="margin-left:6px" @click="getEpisode">相似音乐</el-button>
            </div>
            <div class="episode_list_item" v-for="item in episode" @click="handleOpenVideo(item)">
              <div class="episode_list_item_left item_com">
                <video class="video" :src="item.video_url" alt=""></video>
              </div>
              <div class="episode_list_item_right item_com">
                <div class="descript">{{item.title}}</div>
                <div class="descript">{{item.intro}}</div>
                <div class="singer">歌手：{{item.name|| item.singer[0].name}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 简介面板 -->
      <div class="mv_intro_fold" v-if="isShowIntro">
        <div style="opacity: 0.9;">
          <span style="opacity: 0.5;">歌手：</span>{{singer}}
        </div>
        <div style="opacity: 0.9;">
          <span style="opacity: 0.5;">简介：</span>
          {{videoInfo.intro}}
        </div>
      </div>
    </div>

    <!-- 下半部分评论区 -->
    <div class="container_bottom">
      <div class="comment_wrapper">
        <div class="comment_title">全部评论({{count}})</div>

        <div class="comment_user" style="margin-bottom: 40px;">
          <div class="comment_user_head" style="position: absolute;">
            <img :src="avatar" alt="" />
          </div>
          <a-textarea class="comment_user_content" v-model:value="replyValue" :placeholder="userStore.delete_flag==2 ? '由于您的不适当评论，已被管理员禁言，请联系管理员恢复评论功能！':'留下你精彩的评论吧！'" auto-size />
          <el-button class="send" :disabled="!replyValue || userStore.delete_flag == 2 ? true:false" @click="sendReply">发布评论</el-button>
        </div>
        <div class="comment_all_list" v-for="item in replyData" >
          <div v-if="item.upt_act == 1"> 
            <div class="comment_user_head"  style="position: absolute;">
              <img :src="item.user.avatar || headerImg" :alt="item.user.name" />
            </div>
            <div class="comment_content">
              <div class="comment_content_header">
                <span class="comment_content_name">{{item.user.name}}</span>
                <span class="comment_content_time">{{item.created_at}}</span>
              </div>
              <div class="content"> {{item.content}}</div>
            </div>
            <el-link type="danger" style="position: absolute;bottom: 0;right: 0;" v-if="hasPermission([RoleEnum.SUPER])" @click="deleteReply(item.id)">删除</el-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import {  HeartOutlined,StarOutlined,ProfileOutlined,DownOutlined,UpOutlined } from '@ant-design/icons-vue';  //LikeOutlined,
import { Button } from 'ant-design-vue';
import { useRoute, useRouter } from 'vue-router'; 
import { getVideoDetail, getVideoReply, addVideoReply, deleteVideoReply, updateAction } from '/@/api/video/video';
 import { getRankList, getOccfRecommend } from '/@/api/video/statistics';
import { useUserStore } from '/@/store/modules/user';
import { computed, ref, watchEffect } from 'vue';
import { ElMessage } from 'element-plus';
import { usePermission } from '/@/hooks/web/usePermission';
import { RoleEnum } from '/@/enums/roleEnum';
import headerImg from '/@/assets/images/header.jpg';

const { hasPermission } = usePermission();
const route = useRoute();

const videoInfo:any = ref({
  singer:[{name:""}],
  amount:{}
});

// watch(()=>route.query.id,(value)=>{
//   if(value){
//     console.log(123123,value);
    
//     // refreshDetail(value)
//   }
// })


const backPre = async () =>{
    router.go(-1);
}

const singer = computed(()=>{
  if(!videoInfo.value.singer.length){
    return "***"
  }
  return videoInfo.value.singer[0].name;
})
const replyData:any = ref([]);
const count:any = ref(0);
const refreshReply = () =>{
  getVideoReply({id:route.query.id}).then(res=>{
    replyData.value = res.rows;
    count.value = res.count;
  })
}



const episode:any = ref([]);
const router = useRouter();

const handleOpenVideo = async(item) =>{
    if(item.id == route.query.id){
      ElMessage.warning({message:"当前视频正在播放！"});
      return;
    }
    await router.push({
      path:`video`,
      query:{ id:item.id }
    })
    refreshDetail();
}
const isSameType = ref(false);
const getEpisode = () => {
  isSameType.value = !isSameType.value;
  if(isSameType.value){
    getRankList({
       type:videoInfo.value.type,
       area:videoInfo.value.area,
       style:videoInfo.value.style,
       recommend:true
     }).then(res=>{
       episode.value = res;
     })
  }else{
    getOccfRecommend({
      flag:1,
      videoSame:1,
      video_id:route.query.id
    }).then(res=>{
      episode.value = res;
    })
  }
}

const refreshDetail = (id:any=0) => {
  getVideoDetail({id:id?id:route.query.id}).then(res=>{
    videoInfo.value = res;    
    const { collect, favour } = res.action;
    Amount.value = res.amount;
    favour ? Like.value=true : "";
    collect ? Star.value=true : "";
    refreshReply();
    getEpisode();
  });
}

const Amount:any = ref({});  // 数量
const Like = ref(false);
const handleLike = () =>{
  Like.value = !Like.value;
  Like.value ? Amount.value.favour_amount++ : Amount.value.favour_amount--;
  operateAction()
}
const Star = ref(false);
const handleStar = () =>{
  Star.value = !Star.value;
  Star.value ? Amount.value.collect_amount++ : Amount.value.collect_amount--;
  operateAction()
}

const operateAction = async () =>{
  await updateAction({
    video_id:route.query.id,
    favour:Like.value,
    collect:Star.value,
    favour_nums:Amount.value.favour_amount,
    collect_nums:Amount.value.collect_amount,
    comment_nums:Amount.value.comment_amount,
  });
  refreshDetail();
}

const isShowIntro = ref(false);
const handleShowIntro = () =>{
  isShowIntro.value = !isShowIntro.value;
}
const userStore = useUserStore().getUserInfo;
const avatar = computed(() =>{
  const { avatar } = userStore;
    return avatar || headerImg
});

const replyValue = ref('');
const sendReply = () =>{
  if(!replyValue.value){
    ElMessage({type:'warning',message:"内容不能为空！！！"});
    return;
  }
  addVideoReply({
    content:replyValue.value,
    video_id:route.query.id,
    user_id:userStore.id,
  }).then(res=>{
    if(res.success){
      replyValue.value = "";
      ElMessage({type:'success',message:res.message});
      Amount.value.comment_amount++;
      operateAction();
      refreshReply();
    }else{
      ElMessage({type:'error',message:res.message});
    }
  })
}
const deleteReply = (id) =>{
  deleteVideoReply({id,del:true}).then(res=>{
    if(res.success){
      ElMessage({type:'success',message:res.message});
      refreshReply();
    }else{
      ElMessage({type:'error',message:res.message});
    }
  })
}

watchEffect(()=>{
  if(route.query.id){
    refreshDetail(route.query.id)
  }
})

</script>
<style lang="less" scoped>
  .video_wrapper {
    width: 100%;
    position: relative;
    .container_main__wrapper {
      padding: 20px 0;
      background: #0d0e1e;
      .container_main {
        // background: #151625;
        // border-radius: 20px;
        width: 90%;
        color: #fff;
        display: flex;
        justify-content: center;
        margin: 0 auto;
        position: relative;
        padding-right: 10px;
        .container_main__left{
          position: relative;
          .player__wrapper{
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            .video{
              width: 100%;
              height: 100%;
              min-width: 675px;
              min-height: 365px;
              max-width: 1280px;
              max-height: 720px;
              // height: 720px;
              outline: none;
            }
            .player_bottom__intro{
              padding:5px 10px;
              width: 100%;
              position: relative;
              .play_title{
                font-size: 26px;
                color: #fff;
              }
              .player_bottom_popup{
                margin-top: 10px;
                display: flex;
                justify-content: space-between;
                align-items:flex-end;
                .btn{
                  color: #fff;
                  margin-right: 10px;
                  background: unset;
                  opacity: 0.5;
                }
                .player_bottom_like:hover,
                .player_bottom_star:hover{
                  background: unset;
                  opacity: 1;
                }
                .activeLike{
                  color: #f65174;
                  background: unset;
                  border:#fff 1px solid;
                  opacity: 1;
                }
                .activeStar{
                  background: unset;
                  color: #d2bd00;
                  border:#fff 1px solid;
                  opacity: 1;
                }
                .activeIntro{
                   color: #DC7D28;
                }
                .mv_intro_fold_btn{
                  display: inline-block;
                  margin: 0 10px;
                  font-size: 14px;
                }
                .mv_intro_fold_btn:hover{
                  color: #DC7D28;
                  cursor: pointer;
                  opacity: 1;
                }
              }
            }
          }
         
        }
        .container_episode{
          // border: 1px solid pink;
          background: #151625;
          width: 320px;
          min-width: 260px;
          position: relative;
          overflow-y: auto;
          overflow-x: hidden;
          .episode_list{
            position: absolute;
            width: 100%;
            padding: 0 10px;
            .container_episode_title{
              font-size: 16px;
              font-weight: 600;
              opacity: 0.9;
              margin: 5px 0 10px;
            }
            .episode_list_item{
              width: 100%;
              height: 78px;
              margin-bottom: 10px;
              display: flex;
              justify-content: space-between;
              align-items: center;
              opacity: 0.8;
              cursor: pointer;
              .episode_list_item_left{
                width: 45%;
                height: 100%;
                img{
                  width: 100%;
                  height: 100%;
                }
                .video{
                  width: 120px;
                  height: 78px;
                }
              }
              .episode_list_item_right{
                width: 55%;
                height: 100%;
                padding: 0 5px 0 10px;
                display: flex;
                flex-direction: column;
                justify-content:space-between;
                .descript{
                  font-size: 13px;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  display:-webkit-box; //作为弹性伸缩盒子模型显示。
                  -webkit-box-orient:vertical; //设置伸缩盒子的子元素排列方式--从上到下垂直排列
                  -webkit-line-clamp:2; //显示的行
                }
                .singer{
                  opacity: 0.5;
                  overflow: hidden;
                  white-space: nowrap;
                  text-overflow: ellipsis;
                }
              }
            }
            .episode_list_item:hover{
              opacity: 1;
              background: rgba(133, 129, 129, 0.3);
              // border-radius: 10px;
            }
          }
        }
      }
      .mv_intro_fold{
        width: 90%;
        // height: 100px;
        margin: 10px auto;
        padding: 10px;
        // border: 1px solid red;
        color: #fff;
        font-size: 14px;
      }
    }
    .container_bottom {
      padding-top: 28px;
      width: 100%;
      margin-bottom: 100px;
      .comment_wrapper{
        width: calc(90% - 320px);
        margin-left: 6%;
        min-width: 625px;
        .comment_title{
          font-size: 24px;
          font-family: 500;
          margin-bottom: 20px;
        }
        .comment_user{
          position: relative;
          max-width: 1290px;
          .comment_user_content{
            min-height: 60px !important;
            max-width: 95% !important;
            margin-left: 75px;
          }
          .send{
            background: #FF5C38;
            color:#fff;
            border-radius: 15px;
            float: right;
            margin-top: 6px;
          }
        }
        .comment_all_list{
          position: relative;
          margin-bottom: 20px;
          max-width: 1290px;
          .comment_content{
            padding: 0 0 10px 75px;
            border-bottom: 1px solid #e4e3e3;
            .comment_content_header{
              opacity: 0.8;
              .comment_content_name{
                margin-right: 20px;
              }
            }
            .content{
              margin: 5px;
              font-size: 15px;
            }
          }
          
        }
       .comment_user_head{
          width: 50px;
          height: 50px;
          border-radius: 50%;
          img{
            width: 50px !important;
            height: 50px;
            border-radius: 50%;
          }
        }
        

      }
    }
  }

  /* 设置滚动条的样式 */
  ::-webkit-scrollbar {
    width:10px;
  }
  /* 滚动槽 */
  ::-webkit-scrollbar-track {
    border-radius:10px;
  }
  /* 滚动条滑块 */
  ::-webkit-scrollbar-thumb {
    border-radius:10px;
    background:rgba(133, 129, 129, 0.3);
  }
  // ::-webkit-scrollbar-thumb:window-inactive {
  //   background:rgba(255,0,0,0.4);
  // }
</style>

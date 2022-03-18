<template>
  <div class="video_wrapper">
    <!-- 上半部分视频区 -->
    <div class="container_main__wrapper">
      <div class="container_main">
        <div class="container_main__left">
          <div class="player__wrapper container_player">
            <!-- <video class="video" :src="URL"  controls autoplay></video> -->
            <!-- <video class="video" src="http://127.0.0.1:7001/public/video/抖音.mp4"  controls autoplay></video> -->
            <!-- <video class="video" :src="globSetting.apiUrl+'/public/videos'"  controls autoplay></video> -->
            <!-- <video class="video" src="https://popular-music-video.obs.cn-east-2.myhuaweicloud.com/music.mp4"  controls autoplay></video> -->
            <!-- <video class="video" src="../../assets/哪里都是你.mp4"  controls></video> -->
            <video class="video" src="https://popular-music-video.obs.cn-east-2.myhuaweicloud.com/202203171647460436734mv.mp4" autoplay  controls></video>
            <div class="player_bottom__intro">
              <div class="play_title">
                <span>队长：</span>
                <span>《哪里都是你》</span>
              </div>
              <div class="player_bottom_popup">
                <div class="player_bottom_popup_btns">
                  <Button class="player_bottom_like btn" :class="{activeLike:Like}" shape="round" size="small" @click="handleLike">
                    <template #icon> <HeartOutlined /> 点赞 </template>
                  </Button>
                  <Button class="player_bottom_star btn" :class="{activeStar:Star}" shape="round" size="small" @click="handleStar">
                    <template #icon> <StarOutlined /> 收藏 </template>
                  </Button>
                  <div class="mv_intro_fold_btn" :class="{activeIntro:isShowIntro}" @click="handleShowIntro"> 
                    <ProfileOutlined />
                    <span style="margin-left:5px;">简介</span>
                    <DownOutlined v-if="isShowIntro" /> <UpOutlined v-else />
                  </div>
                </div>
                <div class="player_bottom_popup_time">发布时间：2022-01-25 20:00</div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="container_episode">
          <div class="episode_list">
            <div class="container_episode_title">为你推荐</div>
            <div class="episode_list_item" v-for="item in 10">
              <div class="episode_list_item_left item_com">
                <img src="https://puui.qpic.cn/vpic_cover/p3276ogah4l/p3276ogah4l_old_ori.jpg/s640x360?max_age=7776000" alt="">
              </div>
              <div class="episode_list_item_right item_com">
                <div class="descript">在乎一个人的眼神是藏不住的，你走了我会伤心，你来了我会高兴</div>
                <div class="singer">歌手：汤姆{{item}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 简介面板 -->
      <div class="mv_intro_fold" v-if="isShowIntro">
      <div style="opacity: 0.9;">
        <span style="opacity: 0.5;">歌手：</span>  队长
      </div>
      <div style="opacity: 0.9;">
        <span style="opacity: 0.5;">简介：</span>
          当“我们”变成“我”，当“最亲密的伴侣”变成“熟悉的陌生人” 才终于明白，最好的爱不是互相妥协，而是在爱里也能做自己。认真去付出爱的人，都值得更好的
          MV从两个视角展开，一面是男女生相爱时的甜蜜互动，一面是分手后女生独自失落的伤感画面，强烈的对比让观众体会到女生的难过、挣扎、煎熬。而随着歌曲情绪递进，女生从室内走向户外，心境渐渐发生变化，从初分手时的伤心失意变得释怀洒脱。正如歌词所唱，“我不在乎了，深爱过的人都值得更好的”。
      </div>
      </div>
    </div>

    <!-- 下半部分评论区 -->
    <div class="container_bottom">
      <div class="comment_wrapper">
        <div class="comment_title">全部评论(1)</div>

        <div class="comment_user" style="margin-bottom: 40px;">
          <div class="comment_user_head" style="position: absolute;">
            <img src="http://127.0.0.1:7001/public/avatar/upload/20220302/1646199207589.jpg" alt="" />
          </div>
          <a-textarea class="comment_user_content" v-model:value="value1" placeholder="留下你精彩的评论吧！" auto-size />
          <div class="send">发布评论</div>
        </div>

        <div class="comment_all_list" v-for="item in 5">
          <div class="comment_user_head"  style="position: absolute;">
            <img src="http://127.0.0.1:7001/public/avatar/upload/20220302/1646199207589.jpg" alt="" />
          </div>
          <div class="comment_content">
            <div class="comment_content_header">
              <span class="comment_content_name">易烊千玺</span>
              <span class="comment_content_time">2022-10-10</span>
            </div>
            <div class="content">
              {{item}}听姐姐唱的每一首歌都好治愈呀听姐姐唱的每一首歌都好治愈呀听姐姐唱的每一首歌都好治愈呀听姐姐唱的每一首歌都好治愈呀听姐姐唱的每一首歌都好治愈呀听姐姐唱的每一首歌都好治愈呀听姐姐唱的每一首歌都好治愈呀
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import {  HeartOutlined,StarOutlined,ProfileOutlined,DownOutlined,UpOutlined } from '@ant-design/icons-vue';  //LikeOutlined,
import { Button } from 'ant-design-vue';
import { ref } from 'vue';
// import { getVideo } from '/@/api/frontPage/video';
import { useGlobSetting } from '/@/hooks/setting';
const globSetting =  useGlobSetting();

const Like = ref(false);
const handleLike = () =>{
  Like.value = !Like.value;
}
const Star = ref(false);
const handleStar = () =>{
  Star.value = !Star.value;
}
const isShowIntro = ref(false);
const handleShowIntro = () =>{
  isShowIntro.value = !isShowIntro.value;
}
const value1 = ref('');
const URL = ref("")
// getVideo().then((res)=>{
//   console.log(res);
//   URL.value = res.url;
// })

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
                  color: #E72A50;
                  background: unset;
                  border:#fff 1px solid;
                  opacity: 1;
                }
                .activeStar{
                  background: unset;
                  color: #E8D104;
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
          min-width: 250px;
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
              margin: 5px 0;
            }
            .episode_list_item{
              width: 100%;
              height: 73px;
              margin-bottom: 20px;
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
              }
              .episode_list_item_right{
                width: 55%;
                height: 100%;
                padding: 5px 5px 0 10px;
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
                }
              }
            }
            .episode_list_item:hover{
              opacity: 1;
              background: rgba(133, 129, 129, 0.3);
              border-radius: 10px;
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
            position: absolute;
            // right: -120px;
            // top: 50%;
            right: 0;
            bottom: 0;
            // transform: translateY(-50%);
            background: #FF5C38;
            color: #fff;
            padding: 5px 15px;
            border-radius: 15px;
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

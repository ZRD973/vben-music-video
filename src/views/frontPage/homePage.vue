<template>
  <div id="home_wrap" class="home_wrap">
    <!-- 轮播图 -->
    <ScrollYTransition>
      <ExpandTransition>
        <Carousel arrows autoplay v-if="showCarousel">
          <template #prevArrow>
            <div class="custom-slick-arrow" style="left: 10px; z-index: 1">
              <left-circle-outlined />
            </div>
          </template>
          <template #nextArrow>
            <div class="custom-slick-arrow" style="right: 10px">
              <right-circle-outlined />
            </div>
          </template>
          <div class="image" v-for="item in imageUrl">
            <img :src="item" alt="" />
          </div>
        </Carousel>
      </ExpandTransition>
    </ScrollYTransition>

    <!-- 子菜单 -->
    <!-- <keep-alive>
      </keep-alive> -->
      <subMenu></subMenu>

    <!-- 筛选 -->
    <ScrollYTransition>
      <ExpandTransition>
        <screen v-if="showScreen" :staticScreen="staticScreen" @chooseDone="chooseDone"></screen>
      </ExpandTransition>
    </ScrollYTransition>

    <!-- 视频列表 -->
    <videoList v-loading="loading" :videoList="videoData" description="暂时还没有该类型视频！"></videoList>
    
  </div>
  

</template>
<script lang="ts" setup>
  import Bus from '/@/utils/bus';
  import { CLOSECAROUSEL, CLOSESCREEN } from '../constant';
  import subMenu from './coms/subMenu.vue';
  import screen from './coms/screen.vue';
  import { ScrollYTransition, ExpandTransition } from '/@/components/Transition';
  import { Carousel } from 'ant-design-vue';
  import videoList from './coms/videoList.vue'; 
  import { LeftCircleOutlined, RightCircleOutlined } from '@ant-design/icons-vue';
  import { EmitCarouselObj } from '/#/views';
  import { onMounted, ref, watch } from 'vue';
  import { getVideoInfo, getTypeSort } from '/@/api/video/video';
  import { getChoicenessList } from '/@/api/video/statistics';
  const showCarousel = ref<boolean | undefined>(true);
  const showScreen = ref<boolean | undefined>(false);
  const initPageIndex = ref<number>(0);
  const loading = ref(true)
  onMounted(()=>{
    Bus.on(CLOSECAROUSEL, (data:EmitCarouselObj) => {
      showCarousel.value = data.isShowCarousel;
      initPageIndex.value = data.index;
    });
    Bus.on(CLOSESCREEN, (data:EmitCarouselObj) => {
      showScreen.value = data.isShowScreen;
      initPageIndex.value = data.index;
    });

    initData();

    getTypeSort({ sort:true }).then(res=>{
      if(res){ staticScreen.value = res.classify; }
    })
  })

  const refreshVideo = (data:any={}) =>{
    const { type, area, style } = data;
    getVideoInfo({ limit:30, page:1, type, area, style }).then(res=>{
      videoData.value=res.rows;
    }).finally(()=>{loading.value = false})
  }

  const imageUrl = ref([
    'http://p1.music.126.net/ASJYGHeGqIT7AGUu2kjOKw==/109951167124192143.jpg?imageView&quality=89',
    'http://p1.music.126.net/wZM8OAXcKQAzbUbNaFf8OA==/109951167124473298.jpg?imageView&quality=89',
    'http://p1.music.126.net/vsGbbcL_P3kOZAQ2MesNzA==/109951167125788640.jpg?imageView&quality=89',
    'http://p1.music.126.net/s2rXB9LXgTRn1lzPp0-0uw==/109951167124180532.jpg?imageView&quality=89',
  ]);

  const videoData:any = ref([
    // {
    //   id:1,
    //   url: 'https://puui.qpic.cn/qqvideo_ori/0/u0017v7lg3p_228_128/0',
    //   title: '你值得更好的',
    //   author: '张杰',
    // },
    // {
    //   id:2,
    //   url: 'https://puui.qpic.cn/video_caps/0/p0040iz2h39.q4.jpg/0',
    //   title: '你开心所以我开心',
    //   author: '安东阳、司徒兰芳',
    // },
    // {
    //   id:3,
    //   // url: 'http://127.0.0.1:7001/public/avatar/upload/20220302/1646199207589.jpg',
    //   url: 'https://puui.qpic.cn/video_caps/0/f0039igqjyz.q4.jpg/0',
    //   title: '爱归来',
    //   author: '黑鸭子组合',
    // },
    // {
    //   id:4,
    //   url: 'https://puui.qpic.cn/qqvideo_ori/0/u0017v7lg3p_228_128/0',
    //   title: '你值得更好的',
    //   author: '张杰',
    // },
    // {
    //   id:5,
    //   url: 'https://puui.qpic.cn/video_caps/0/p0040iz2h39.q4.jpg/0',
    //   title: '你开心所以我开心',
    //   author: '安东阳、司徒兰芳',
    // },
    // {
    //   id:6,
    //   // url: 'http://127.0.0.1:7001/public/avatar/upload/20220302/1646199207589.jpg',
    //   url: 'https://puui.qpic.cn/video_caps/0/f0039igqjyz.q4.jpg/0',
    //   title: '爱归来',
    //   author: '黑鸭子组合',
    // },
  ]);

  const staticScreen:any = ref([
    // { label: '排序', type: 'sort', options: [ 
    //   { label: '最新', value: '1' }, 
    //   { label: '最热', value: '2' } ]
    // },
    // { label: '类型', type: 'type', options: [
    //     { label: '全部', value: '1' },
    //     { label: 'MV',  value: '2' },
    //     { label: '演唱会', value: '3' } ]
    // },
    // { label: '地区', type: 'area', options: [
    //     { label: '全部',  value: '1' },
    //     { label: '内地', value: '2' },
    //     { label: '中国台湾', value: '3' },
    //     { label: '中国香港', value: '4' },
    //     { label: '日韩', value: '5' },
    //     { label: '欧美', value: '6' },
    //   ]
    // },
    // { label: '年份', type: 'year', options: [
    //     { label: '全部', value: '1' },
    //     { label: '2018', value: '2' },
    //     { label: '2017', value: '3' },
    //     { label: '2015', value: '4' },
    //     { label: '2014', value: '5' },
    //     { label: '2013', value: '6' },
    //     { label: '2012', value: '7' },
    //   ]
    // },
    // { label: '风格', type: 'style', options: [
    //     { label: '全部', value: '1' },
    //     { label: '流行', value: '2' },
    //     { label: '摇滚', value: '3' },
    //     { label: 'R&B',  value: '4' },
    //     { label: '电子', value: '5' },
    //     { label: '爵士', value: '6' },
    //     { label: '说唱', value: '7' },
    //     { label: '嘻哈', value: '8' },
    //     { label: '民谣', value: '9' },
    //     { label: '舞曲', value: '10' },
    //     { label: '古典', value: '11' },
    //   ]
    // },
    ]
  );
  const chooseDone = (data) =>{
    loading.value = true;
    getVideoInfo({
      ...data,
      limit:30,
      page:1
    }).then(res=>{
      videoData.value=res.rows
    }).finally(()=>{loading.value = false})
  }

  watch(initPageIndex,()=>{
    initData();
  })
  const initData = () =>{
    loading.value = true;
    if(initPageIndex.value == 0){
      getChoicenessList({limit:10}).then(res=>{
        videoData.value = res;
      }).finally(()=>{loading.value = false})
    }else if(initPageIndex.value == 2){
      refreshVideo({type:'其他',area:'其他',style:'其他'})
    }
    
  }
</script>

<style lang="less" scoped>
:deep(.ant-back-top) {
  bottom: 200px;
}
.ant-back-top-inner {
  height: 40px;
  width: 40px;
  line-height: 40px;
  border-radius: 4px;
  background-color: #1088e9;
  color: #fff;
  text-align: center;
  font-size: 20px;
}
  .home_wrap{
    width: 80vw;
    min-width: 865px;
    margin: 10px auto;
  }
  .ant-carousel :deep(.slick-slide) {
    text-align: center;
    height: 400px;
    line-height: 400px;
    background: #364d79;
    overflow: hidden;
    border-radius: 10px;
  }
  .ant-carousel :deep(.slick-arrow.custom-slick-arrow) {
    width: 45px;
    height: 45px;
    font-size: 45px;
    color: #fff;
    background-color: rgba(31, 45, 61, 0.11);
    opacity: 0.3;
    z-index: 1;
  }
  .ant-carousel :deep(.custom-slick-arrow:before) {
    display: none;
  }
  .ant-carousel :deep(.custom-slick-arrow:hover) {
    opacity: 0.8;
    color: #dc7d2b;
  }
  .ant-carousel :deep(.slick-slide .image img) {
    height: 400px;
    width: 100%;
  }
 
</style>

<template>

  <!-- 视频列表 -->
  <div class="recommend_mian">
    <videoList :videoList="randomData"></videoList>
  </div>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import videoList from './coms/videoList.vue';  
  const randomData = ref([
    {
      url: 'https://puui.qpic.cn/qqvideo_ori/0/u0017v7lg3p_228_128/0',
      title: '你值得更好的',
      author: '张杰',
    },
    {
      url: 'https://puui.qpic.cn/video_caps/0/p0040iz2h39.q4.jpg/0',
      title: '你开心所以我开心',
      author: '安东阳、司徒兰芳',
    },
    {
      url: 'https://puui.qpic.cn/video_caps/0/f0039igqjyz.q4.jpg/0',
      title: '爱归来',
      author: '黑鸭子组合',
    },
    {
      url: 'https://puui.qpic.cn/qqvideo_ori/0/u0017v7lg3p_228_128/0',
      title: '你值得更好的',
      author: '张杰',
    },
    {
      url: 'https://puui.qpic.cn/video_caps/0/p0040iz2h39.q4.jpg/0',
      title: '你开心所以我开心',
      author: '安东阳、司徒兰芳',
    },
    {
      // url: 'http://127.0.0.1:7001/public/avatar/upload/20220302/1646199207589.jpg',
      url: 'https://puui.qpic.cn/video_caps/0/f0039igqjyz.q4.jpg/0',
      title: '爱归来',
      author: '黑鸭子组合',
    },
    {
      url: 'https://puui.qpic.cn/qqvideo_ori/0/u0017v7lg3p_228_128/0',
      title: '你值得更好的',
      author: '张杰',
    },
    {
      url: 'https://puui.qpic.cn/video_caps/0/p0040iz2h39.q4.jpg/0',
      title: '你开心所以我开心',
      author: '安东阳、司徒兰芳',
    },
    {
      url: 'https://puui.qpic.cn/video_caps/0/f0039igqjyz.q4.jpg/0',
      title: '爱归来',
      author: '黑鸭子组合',
    },
    {
      url: 'https://puui.qpic.cn/qqvideo_ori/0/u0017v7lg3p_228_128/0',
      title: '你值得更好的',
      author: '张杰',
    },
    {
      url: 'https://puui.qpic.cn/video_caps/0/p0040iz2h39.q4.jpg/0',
      title: '你开心所以我开心',
      author: '安东阳、司徒兰芳',
    },
    {
      // url: 'http://127.0.0.1:7001/public/avatar/upload/20220302/1646199207589.jpg',
      url: 'https://puui.qpic.cn/video_caps/0/f0039igqjyz.q4.jpg/0',
      title: '爱归来',
      author: '黑鸭子组合',
    },
    {
      url: 'https://puui.qpic.cn/qqvideo_ori/0/u0017v7lg3p_228_128/0',
      title: '你值得更好的',
      author: '张杰',
    },
    {
      url: 'https://puui.qpic.cn/video_caps/0/p0040iz2h39.q4.jpg/0',
      title: '你开心所以我开心',
      author: '安东阳、司徒兰芳',
    },
    {
      url: 'https://puui.qpic.cn/video_caps/0/f0039igqjyz.q4.jpg/0',
      title: '爱归来',
      author: '黑鸭子组合',
    },
    {
      url: 'https://puui.qpic.cn/qqvideo_ori/0/u0017v7lg3p_228_128/0',
      title: '你值得更好的',
      author: '张杰',
    },
    {
      url: 'https://puui.qpic.cn/video_caps/0/p0040iz2h39.q4.jpg/0',
      title: '你开心所以我开心',
      author: '安东阳、司徒兰芳',
    },
    {
      // url: 'http://127.0.0.1:7001/public/avatar/upload/20220302/1646199207589.jpg',
      url: 'https://puui.qpic.cn/video_caps/0/f0039igqjyz.q4.jpg/0',
      title: '爱归来',
      author: '黑鸭子组合',
    },
    {
      url: 'https://puui.qpic.cn/qqvideo_ori/0/u0017v7lg3p_228_128/0',
      title: '你值得更好的',
      author: '张杰',
    },
    {
      url: 'https://puui.qpic.cn/video_caps/0/p0040iz2h39.q4.jpg/0',
      title: '你开心所以我开心',
      author: '安东阳、司徒兰芳',
    },
    {
      url: 'https://puui.qpic.cn/video_caps/0/f0039igqjyz.q4.jpg/0',
      title: '爱归来',
      author: '黑鸭子组合',
    },
    {
      url: 'https://puui.qpic.cn/qqvideo_ori/0/u0017v7lg3p_228_128/0',
      title: '你值得更好的',
      author: '张杰',
    },
    {
      url: 'https://puui.qpic.cn/video_caps/0/p0040iz2h39.q4.jpg/0',
      title: '你开心所以我开心',
      author: '安东阳、司徒兰芳',
    },
    {
      // url: 'http://127.0.0.1:7001/public/avatar/upload/20220302/1646199207589.jpg',
      url: 'https://puui.qpic.cn/video_caps/0/f0039igqjyz.q4.jpg/0',
      title: '爱归来',
      author: '黑鸭子组合',
    },
    {
      url: 'https://puui.qpic.cn/qqvideo_ori/0/u0017v7lg3p_228_128/0',
      title: '你值得更好的',
      author: '张杰',
    },
    {
      url: 'https://puui.qpic.cn/video_caps/0/p0040iz2h39.q4.jpg/0',
      title: '你开心所以我开心',
      author: '安东阳、司徒兰芳',
    },
    {
      url: 'https://puui.qpic.cn/video_caps/0/f0039igqjyz.q4.jpg/0',
      title: '爱归来',
      author: '黑鸭子组合',
    },
    {
      url: 'https://puui.qpic.cn/qqvideo_ori/0/u0017v7lg3p_228_128/0',
      title: '你值得更好的',
      author: '张杰',
    },
    {
      url: 'https://puui.qpic.cn/video_caps/0/p0040iz2h39.q4.jpg/0',
      title: '你开心所以我开心',
      author: '安东阳、司徒兰芳',
    },
    {
      // url: 'http://127.0.0.1:7001/public/avatar/upload/20220302/1646199207589.jpg',
      url: 'https://puui.qpic.cn/video_caps/0/f0039igqjyz.q4.jpg/0',
      title: '爱归来',
      author: '黑鸭子组合',
    },
    {
      url: 'https://puui.qpic.cn/qqvideo_ori/0/u0017v7lg3p_228_128/0',
      title: '你值得更好的',
      author: '张杰',
    },
    {
      url: 'https://puui.qpic.cn/video_caps/0/p0040iz2h39.q4.jpg/0',
      title: '你开心所以我开心',
      author: '安东阳、司徒兰芳',
    },
    {
      url: 'https://puui.qpic.cn/video_caps/0/f0039igqjyz.q4.jpg/0',
      title: '爱归来',
      author: '黑鸭子组合',
    },
    {
      url: 'https://puui.qpic.cn/qqvideo_ori/0/u0017v7lg3p_228_128/0',
      title: '你值得更好的',
      author: '张杰',
    },
    {
      url: 'https://puui.qpic.cn/video_caps/0/p0040iz2h39.q4.jpg/0',
      title: '你开心所以我开心',
      author: '安东阳、司徒兰芳',
    },
    {
      // url: 'http://127.0.0.1:7001/public/avatar/upload/20220302/1646199207589.jpg',
      url: 'https://puui.qpic.cn/video_caps/0/f0039igqjyz.q4.jpg/0',
      title: '爱归来',
      author: '黑鸭子组合',
    },
    {
      url: 'https://puui.qpic.cn/qqvideo_ori/0/u0017v7lg3p_228_128/0',
      title: '你值得更好的',
      author: '张杰',
    },
    {
      url: 'https://puui.qpic.cn/video_caps/0/p0040iz2h39.q4.jpg/0',
      title: '你开心所以我开心',
      author: '安东阳、司徒兰芳',
    },
    {
      url: 'https://puui.qpic.cn/video_caps/0/f0039igqjyz.q4.jpg/0',
      title: '爱归来',
      author: '黑鸭子组合',
    },
    {
      url: 'https://puui.qpic.cn/qqvideo_ori/0/u0017v7lg3p_228_128/0',
      title: '你值得更好的',
      author: '张杰',
    },
    {
      url: 'https://puui.qpic.cn/video_caps/0/p0040iz2h39.q4.jpg/0',
      title: '你开心所以我开心',
      author: '安东阳、司徒兰芳',
    },
    {
      // url: 'http://127.0.0.1:7001/public/avatar/upload/20220302/1646199207589.jpg',
      url: 'https://puui.qpic.cn/video_caps/0/f0039igqjyz.q4.jpg/0',
      title: '爱归来',
      author: '黑鸭子组合',
    },
    {
      url: 'https://puui.qpic.cn/qqvideo_ori/0/u0017v7lg3p_228_128/0',
      title: '你值得更好的',
      author: '张杰',
    },
    {
      url: 'https://puui.qpic.cn/video_caps/0/p0040iz2h39.q4.jpg/0',
      title: '你开心所以我开心',
      author: '安东阳、司徒兰芳',
    },
    {
      url: 'https://puui.qpic.cn/video_caps/0/f0039igqjyz.q4.jpg/0',
      title: '爱归来',
      author: '黑鸭子组合',
    },
    {
      url: 'https://puui.qpic.cn/qqvideo_ori/0/u0017v7lg3p_228_128/0',
      title: '你值得更好的',
      author: '张杰',
    },
    {
      url: 'https://puui.qpic.cn/video_caps/0/p0040iz2h39.q4.jpg/0',
      title: '你开心所以我开心',
      author: '安东阳、司徒兰芳',
    },
    {
      // url: 'http://127.0.0.1:7001/public/avatar/upload/20220302/1646199207589.jpg',
      url: 'https://puui.qpic.cn/video_caps/0/f0039igqjyz.q4.jpg/0',
      title: '爱归来',
      author: '黑鸭子组合',
    },
  ]);
</script>
<style lang="less" scoped>
.recommend_mian{
  padding: 30px;
}
</style>

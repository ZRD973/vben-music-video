<template>

  <div style="text-align: center;margin-bottom: 10px;">
  <el-button style="text-align: center;" type="primary" @click="changeDay">切换时间范围 : {{model[index].day}}</el-button>
  </div>
  <div class="md:flex">
    <template v-for="(item, index) in growCardList" :key="item.title">
      <Card
        size="small"
        :loading="loading"
        :title="item.title"
        class="md:w-1/4 w-full !md:mt-0 !mt-4"
        :class="[index + 1 < 4 && '!md:mr-4']"
        :canExpan="false"
        style="border: 1px solid rgba(180, 180, 180, 0.4);"
      >
        <template #extra>
          <Tag :color="item.color">{{ item.action }}</Tag>
        </template>

        <div class="py-4 px-4 flex justify-between">
          <CountTo prefix="" :startVal="1" :endVal="item.value" class="text-2xl" />
          <Icon :icon="item.icon" :size="40" />
        </div>

        <div class="p-2 px-4 flex justify-between">
          <span>总{{ item.title }}</span>
          <CountTo prefix="" :startVal="1" :endVal="item.total" />
        </div>
      </Card>
    </template>
  </div>
</template>
<script lang="ts" setup>
  import { CountTo } from '/@/components/CountTo/index';
  import { Icon } from '/@/components/Icon';
  import { Tag, Card } from 'ant-design-vue';
  import { onMounted, ref } from 'vue';
  import { getTotalCount } from '/@/api/video/statistics';

  defineProps({
    loading: {
      type: Boolean,
    },
  });
  interface GrowCardItem {
    icon: string;
    title: string;
    value: number;
    total: number;
    color: string;
    action?: string;
  }
  const index = ref(2);
  const model = ref([
    {
      number: 1,
      day: '日',
    },
    {
      number: 7,
      day: '周',
    },
    {
      number: 30,
      day: '月',
    },
    {
      number: 365,
      day: '年',
    },
  ]);
  const changeDay = () => {
    if (index.value == 3) {
      index.value = 0;
    } else {
      index.value++;
    }
    for (let i = 0; i < growCardList.value.length; i++) {
      growCardList.value[i].action = model.value[index.value].day;
    }
    init();
    console.log(index.value);
  };
  const growCardList = ref<GrowCardItem[]>([
    {
      title: '视频量',
      icon: 'bxs:movie-play',
      // icon: 'icon-park:video-one',
      value: 0,
      total: 0,
      color: 'green',
      action: model.value[index.value].day,
    },
    {
      title: '用户量',
      icon: 'fa6-solid:user-group',
      // icon: 'icon-park:user',
      value: 0,
      total: 0,
      color: 'orange',
      action: model.value[index.value].day,
    },
    {
      title: '评论量',
      icon: 'majesticons:comment-text',
      // icon: 'icon-park:comments',
      value: 0,
      total: 0,
      color: 'purple',
      action: model.value[index.value].day,
    },
    {
      title: '播放量',
      icon: 'el:play-alt',
      value: 0,
      total: 0,
      color: 'blue',
      action: model.value[index.value].day,
    },
  ]);
  const init = () => {
    getTotalCount({
      day: model.value[index.value].number,
    }).then((res) => {
      growCardList.value[0].value = res.videoLimit;
      growCardList.value[0].total = res.videoTotal;
      growCardList.value[1].value = res.userLimit;
      growCardList.value[1].total = res.userTotal;
      growCardList.value[2].value = res.commentLimit;
      growCardList.value[2].total = res.commentTotal;
      growCardList.value[3].value = res.viewsLimit;
      growCardList.value[3].total = res.viewsTotal;
    });
  };
  onMounted(() => {
    init();
  });
</script>

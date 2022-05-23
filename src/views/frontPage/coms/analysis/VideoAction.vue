<template>
  <Card style="border: 1px solid rgba(180, 180, 180, 0.4);" title="视频总: 点赞、收藏" :loading="loading">
    <div ref="chartRef" :style="{ width, height }"></div>
  </Card>
</template>
<script lang="ts" setup>
  import { Ref, ref, watch } from 'vue';
  import { Card } from 'ant-design-vue';
  import { useECharts } from '/@/hooks/web/useECharts';
  import { getActionCount } from '/@/api/video/statistics';

  const props = defineProps({
    loading: Boolean,
    width: {
      type: String as PropType<string>,
      default: '100%',
    },
    height: {
      type: String as PropType<string>,
      default: '300px',
    },
  });
  getActionCount().then((res) => {
    console.log(111, res);
  });
  const chartRef = ref<HTMLDivElement | null>(null);
  const { setOptions } = useECharts(chartRef as Ref<HTMLDivElement>);
  watch(
    () => props.loading,
    async() => {
      if (props.loading) {
        return;
      }
      const { favour,collect, comment }  = await getActionCount();
      console.log("所有视频评论量：",comment);
      
      setOptions({
        title: {
          // text: 'Referer of a Website',
          // subtext: 'Fake Data',
          // left: 'center',
        },
        tooltip: {
          trigger: 'item',
        },
        legend: {
          orient: 'vertical',
          left: 'left',
        },
        series: [
          {
            color: ['#5ab1ef','#F56C6C','#67C23A'],
            name: '所有视频',
            type: 'pie',
            radius: '65%',
            data: [
              { value: favour, name: '点赞' },
              { value: collect, name: '收藏' },
              // { value: comment, name: '评论' },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
              },
            },
          },
        ],
        
      });
    },
    { immediate: true },
  );
</script>

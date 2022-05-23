<template>
  <div ref="chartRef" :style="{ height, width }"></div>
</template>
<script lang="ts" setup>
  import { onMounted, ref, Ref } from 'vue';
  import { useECharts } from '/@/hooks/web/useECharts';
  import { basicProps } from './props';
  import { getPlayCount } from '/@/api/video/statistics';
  import Moment from 'moment';
  defineProps({
    ...basicProps,
  });

  const chartRef = ref<HTMLDivElement | null>(null);
  const { setOptions } = useECharts(chartRef as Ref<HTMLDivElement>);

  onMounted(() => {
  let xAxisData:any = [];
    for (let i = 7; i > 0; i--) {
        const start = new Date();
        start.setTime(start.getTime() - 3600 * 1000 * 24 * (i-1));
        xAxisData.push(Moment(start.getTime() - 3600 * 1000 * 24).format("Do") + '—' + Moment(start).format("Do"))
    }

    getPlayCount().then(res=>{
      
      setOptions({
        title: {
          text: Moment(new Date()).format("LL"),
          left: 'center',
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            lineStyle: {
              width: 1,
              color: '#019680',
            },
          },
        },
        grid: { left: '1%', right: '1%', top: '2  %', bottom: 0, containLabel: true },
        xAxis: {
          type: 'category',
          data:xAxisData,
        },
        yAxis: {
          type: 'value',
          max: res.total,
          splitNumber: 8,
        },
        series: [
          {
            data:res.data,
            type: 'bar',
            barMaxWidth: 80,
            name: '播放量',
          },
        ],
      });
    })
  });
</script>

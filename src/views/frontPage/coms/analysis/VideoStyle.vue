<template>
  <Card style="border: 1px solid rgba(180, 180, 180, 0.4);" title="视频风格" :loading="loading">
    <div ref="chartRef" :style="{ width, height }"></div>
  </Card>
</template>
<script lang="ts" setup>
  import { Ref, ref, watch } from 'vue';
  import { Card } from 'ant-design-vue';
  import { useECharts } from '/@/hooks/web/useECharts';
  import { getStyleCount } from '/@/api/video/statistics';
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
    data:{
      type: Array,
    }
  });
  const chartRef = ref<HTMLDivElement | null>(null);
  const { setOptions } = useECharts(chartRef as Ref<HTMLDivElement>);
  const styleCount = ref([]);
  watch(() => props.loading, () => {
      if (props.loading) {
        return;
      }
      getStyleCount().then(res=>{
        styleCount.value= res;
        setOptions({
          tooltip: {
            trigger: 'item',
          },
          legend: {
            bottom: '-2%',
            left: 'center',
          },
          series: [
            {
              color: ['#5ab1ef','#F56C6C','#67e0e3', '#2ec7c9','#67C23A','#E6A23C','#f3d19e','#b6a2de','#909399','#1E1E1E',],
              name: '风格',
              type: 'pie',
              radius: ['40%', '65%'],
              avoidLabelOverlap: false,
              itemStyle: {
                borderRadius: 10,
                borderColor: '#fff',
                borderWidth: 2,
              },
              label: {
                show: false,
                position: 'center',
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: '28',
                  fontWeight: 'bold',
                },
              },
              labelLine: {
                show: false,
              },
              data:styleCount.value,
              animationType: 'scale',
              animationEasing: 'exponentialInOut',
              animationDelay: function () {
                return Math.random() * 100;
              },
            },
          ],
        });
      })
    },
    { immediate: true },
  );
</script>

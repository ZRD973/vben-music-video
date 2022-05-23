<template>
  <div class="screen_wrap">
    <div class="screen_line" v-for="(item, idx) in staticScreen" :key="idx">
      <span class="screen_label">{{ item.label }}</span>
      <span
        class="screen_item"
        v-for="(val, index) in item.options"
        :key="index"
        :class="{ current: screenData[item.type] == val.value }"
        @click="chooseItem(item.type, val.value)"
        >{{ val.label }}
      </span>
    </div>
  </div>
</template>


<script lang="ts" setup>
  import { onMounted, ref } from 'vue';
  import { StaticScreenItem }  from '/#/views';
  
  const props = defineProps({
    staticScreen:{
      type: Array as PropType<StaticScreenItem[]>,
      default(){return [
        { label: '标题', type: 'value', options: [
            { label: '项目一', value: '1' },
            { label: '项目二', value: '2' },
          ]
        }
      ]}     
    }
  });

  const emit = defineEmits(['chooseDone']);

  onMounted(() => {
    props.staticScreen.forEach((item:StaticScreenItem) => {
      screenData.value[item.type] = item.options[0].value;
    });
    emit('chooseDone', screenData.value);
  });

  const screenData  = ref({});
  const chooseItem = (type, value) => {
    screenData.value[type] = value;
    emit('chooseDone', screenData.value);
  };
  
</script>
<style lang="less" scoped>
  .screen_wrap {
    background: rgba(175, 175, 175, 0.5);
    position: relative;
    padding: 1px 26px;
    border-radius: 4px;
    background-color: #f8f8f8;
    word-break: break-all;
    margin-bottom: 10px;
    .screen_line {
      color: #666;
      padding: 0;
      position: relative;
      margin: 26px 0;
      padding-left: 90px;
      .screen_label {
        position: absolute;
        top: 0;
        left: 0;
        min-width: 50px;
        margin-right: 20px;
        padding: 0 5px;
        border-radius: 16px 0 16px 16px;
        background-color: #7f7f8c;
        color: #fff;
        line-height: 32px;
        text-align: center;
      }
      .screen_item {
        cursor: pointer;
        display: inline-block;
        margin: 2px;
        padding: 0 10px;
        border-radius: 15px;
        line-height: 28px;
        vertical-align: top;
      }
      .screen_item:hover {
        color: #ff5c38;
      }
      .current {
        position: relative;
        background-color: #f7eae8;
        color: #ff5c38;
        font-weight: 700;
      }
    }
    .screen_line::after {
      position: absolute;
      top: -14px;
      right: 0;
      left: 90px;
      height: 1px;
      background-color: #eee;
      content: "";
    }
    .screen_line:nth-of-type(1)::after {
      background-color: unset;
      content: "";
    }
  }
</style>

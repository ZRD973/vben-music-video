<template>
  <!-- 使用注意：滚动的盒子必须有个固定的高度，且设有 overflow-y:scroll; 否则会出现scrollTop=0的情况 -->
   <Popover placement="bottom">
     <template #content>
       <span>回到顶部</span>
     </template>
    <div class="GoTop" :class="isGoTopShow ? 'showBtn' : isFirstLoad ? '' : 'hideBtn'" @click="goTop" >
      <VerticalAlignTopOutlined style="font-size: 20px;" />
    </div>
  </Popover>
</template>

<script lang="ts" setup>
import { onMounted,onUnmounted, ref } from 'vue';
import { VerticalAlignTopOutlined } from '@ant-design/icons-vue';
import { Popover } from 'ant-design-vue';
  const el = ref<Document | any>();
  const props = defineProps({
    scrollObj:{
      type:String,
      default(){
        return "";
      }
    }
  });
  // 是否显示改组件
  const isGoTopShow = ref(false);
  // 是否是第一次加载  第一次加载组件不需要添加hideBtn类
  const isFirstLoad = ref(true);

  const goTop = () =>{
    el.value.scrollTo({ behavior: "smooth", top: 0, });
  }

  const handleScroll = () => { 
    let scrollTop = document.body.scrollTop;
      if (scrollTop >= 500 && isGoTopShow.value == false) {
        isGoTopShow.value = true;
        isFirstLoad.value ? (isFirstLoad.value = false) : "";
      } else if (scrollTop < 500 && isGoTopShow.value) {
        isGoTopShow.value = false;
      }
  };

  onMounted(()=>{
    if (props.scrollObj == "") {
      el.value = document.body;
    } else {
      el.value = document.querySelector(props.scrollObj);
    }
    window.addEventListener('scroll', handleScroll, true)
  });

  onUnmounted(()=>{
    window.removeEventListener('scroll', handleScroll);
  });
  

</script>

<style scoped>
.GoTop {
  position: fixed;
  background-color: rgba(0, 0, 0, 0.45);
  color: #fff;
  border-radius: 50%;
  height: 40px;
  width: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
  z-index: 10000;
  cursor: pointer;
  bottom: -50px;
  right: 40px;
}

.showBtn {
  animation: showBtn 0.7s ease;
  animation-fill-mode: forwards;
}

.hideBtn {
  animation: hideBtn 0.3s ease-in;
  animation-fill-mode: forwards;
}

.GoTop:hover {
  box-shadow: 0 20px 25px -8px rgba(0, 0, 0, 0.1),
    0 10px 10px -8px rgba(0, 0, 0, 0.04);
  background-color: #242425;
}

@keyframes showBtn {
  0% {
    bottom: -50px;
  }
  50% {
    bottom: 110px;
  }
  100% {
    bottom: 85px;
  }
}

@keyframes hideBtn {
  from {
    bottom: 85px;
  }
  to {
    bottom: -50px;
  }
}
</style>

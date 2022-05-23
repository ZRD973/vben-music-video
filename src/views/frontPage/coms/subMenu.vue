<template>
  <div class="sub-wrap">
    <div class="sub-content">
      <div v-for="(item, index) in subMenuData.subMenu"
        :class="{ active: subMenuIndex == index }"
        @click="subMenuData.handleChoose(index)">
        {{ item }}
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { onMounted, reactive, ref } from 'vue';
  import Bus from '/@/utils/bus';
  import { CLOSECAROUSEL, CLOSESCREEN } from '../../constant';
  import { EmitCarouselObj } from '/@/../types/views'
  const subMenuData = reactive({
    subMenu: ref<string[]>(['音乐精选', '音乐片库', '其他音乐']),
    handleChoose: (index) => {
      subMenuIndex.value = index;
      showCarousel();
      showScreen();
    },
  });
  const subMenuIndex = ref<number>(0);
  const showCarousel = () => {
    const emitObj:EmitCarouselObj = {
      isShowCarousel:subMenuIndex.value == 0 ? true : false,
      index:subMenuIndex.value
    }
    Bus.emit(CLOSECAROUSEL, emitObj);
  };

  const showScreen = () => {
    const emitObj:EmitCarouselObj = {
      isShowScreen:subMenuIndex.value == 1  ? true : false,
      index:subMenuIndex.value
    }
    Bus.emit(CLOSESCREEN, emitObj);
  };

  onMounted(() => {
    setTimeout(() => {
      showCarousel();
      showScreen();
    }, 0);
  });

</script>
<style lang="less" scoped>
  .sub-wrap {
    width: 100%;
    height: 40px;
    // background: #edebeb;
    opacity: 0.9;
    margin: 10px;
    .sub-content {
      width: 50%;
      height: 40px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #111;
      font-size: 16px;
    }
    .sub-content div{
      border-radius: 40px;
      padding: 6px 20px;
    }
    .sub-content div:hover {
      cursor: pointer;
      color: #dc7d2b;
      background-color: #F7EAE8;
    }
  }
  .active {
    color: #dc7d2b;
    background-color: #F7EAE8;
  }
</style>

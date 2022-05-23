<template>
  <ConfigProvider :locale="getAntdLocale">
    <AppProvider>
      <RouterView v-if="isRouterAlive" />
    </AppProvider>
  </ConfigProvider>
</template>

<script lang="ts" setup>
  import { ConfigProvider } from 'ant-design-vue';
  import { AppProvider } from '/@/components/Application';
  import { useTitle } from '/@/hooks/web/useTitle';
  import { useLocale } from '/@/locales/useLocale';
  import { ref, provide, nextTick } from 'vue';

  const isRouterAlive = ref(true);
  const reload = () => {
    isRouterAlive.value = false;
    nextTick(() => {
      isRouterAlive.value = true;
    });
  };
  provide('reload', reload);
  // support Multi-language
  const { getAntdLocale } = useLocale();

  // Listening to page changes and dynamically changing site titles
  useTitle();
</script>
<style>
  body {
    padding-right: 0px !important;
  }
</style>

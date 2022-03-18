<template>
  <Footer :class="prefixCls" ref="footerRef">
    <div :class="`${prefixCls}__links`">
      <a>联系方式</a>
      <GithubFilled :class="`${prefixCls}__github`" />
      <a>关于我们</a>
    </div>
    <div>Copyright &copy;2022 Zrd</div>
  </Footer>
</template>

<script lang="ts" setup>
  import { Layout } from 'ant-design-vue';
  import { GithubFilled } from '@ant-design/icons-vue';
  import { useDesign } from '/@/hooks/web/useDesign';

  const { prefixCls } = useDesign('layout-footer');
  const Footer = Layout.Footer;

  
</script>
<style lang="less" scoped>
  
  @prefix-cls: ~'@{namespace}-layout-footer';

  @normal-color: rgba(0, 0, 0, 0.45);

  @hover-color: rgba(126, 124, 124, 0.85);

  .@{prefix-cls} {
    color: @normal-color;
    text-align: center;

    &__links {
      margin-bottom: 8px;

      a {
        color: @normal-color;

        &:hover {
          color: @hover-color;
        }
      }
    }

    &__github {
      margin: 0 30px;

      &:hover {
        color: @hover-color;
      }
    }
  }
  .ant-layout-footer {
    background: #161722;
  }
</style>

<template>
  <div class="wrap">
    <div class="content">
      <div @click="goHome">
        <div class="logo"></div>
        <div class="title">流行音乐视频</div>
      </div>
      <ul class="menu">
        <li :class="{ active: navbarMenu.menuIndex == index }"
          v-for="(item, index) in navbarMenu.menu"
          @click="navbarMenu.changeMenu(item, index)"
          >{{ item.title }}</li>
      </ul>
      <div class="search">
        <a-input-search
          v-model:value="searchValue"
          placeholder="搜索你感兴趣的音乐"
          size="default"
          @search="onSearch"
        ></a-input-search>
      </div>
      <Dropdown>
        <div class="avatar">
          <img :src="avatar" alt="" />
        </div>
        <template #overlay>
          <Menu @click="handleMenuClick" theme="dark" style="background-color: #161722; color: #fff">
            <MenuItem key="center">
              <UserOutlined />
              个人中心
            </MenuItem>
            <MenuItem key="manage" v-if="role === 1">
              <ControlOutlined />
              管理平台
            </MenuItem>
            <MenuItem key="logout">
              <PoweroffOutlined />
              退出系统
            </MenuItem>
          </Menu>
        </template>
      </Dropdown>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { useGo } from '/@/hooks/web/usePage';
  import { PageEnum } from '/@/enums/pageEnum';
  import { Dropdown, Menu, MenuItem } from 'ant-design-vue';
  import { UserOutlined, PoweroffOutlined, ControlOutlined } from '@ant-design/icons-vue';
  import { onMounted, reactive, ref, computed } from 'vue';
  import { useUserStore } from '/@/store/modules/user';
  import headerImg from '/@/assets/images/header.jpg';
  import { useRoute } from 'vue-router';
  const userStore = useUserStore();
  const userInfo = userStore.getUserInfo;
  const role = ref(userInfo.role);
  const go = useGo();
  const goHome = () => {
    go(PageEnum.BASE_HOME);
  };
  const route = useRoute();
  onMounted(()=>{
    for (let index = 0; index < navbarMenu.menu.length; index++) {
      switch (route.path) {
        case PageEnum.BASE_HOME + navbarMenu.menu[index].path:
          navbarMenu.menuIndex = index;
          break;
      }
    }
  });
  const navbarMenu = reactive({
    menu: [
      { title: '首页', path: '/home' },
      { title: '推荐', path: '/recommend' },
      { title: '收藏', path: '/collects' },
      { title: '排行榜', path: '/ranks' },
    ],
    menuIndex: 0,
    changeMenu: (item, index) => {
      navbarMenu.menuIndex = index;
      go(PageEnum.BASE_HOME + item.path);
    },
  });

  const handleMenuClick = (e) => {
    switch (e.key) {
      case 'center':
        go('/personal');
        break;
      case 'manage':
        go('/music');
        break;
      case 'logout':
        userStore.confirmLoginOut();
        break;
    }
  };
  const searchValue = ref('');
  const onSearch = () => {
    go('/recommend');
  };

  const avatar = computed(() => {
      const {origin ,avatar} = userInfo;
      return origin + avatar || headerImg;
  });
</script>
<style lang="less" scoped>
  .wrap {
    width: 100%;
    height: 65px;
    background-color: #161722;
    position: fixed;
    top: 0;
    z-index: 999;
    .content {
      width: 80%;
      height: 65px;
      min-width: 865px;
      margin: 0 auto;
      position: relative;
      .logo {
        width: 50px;
        height: 50px;
        background: url(/@/assets/images/logo.jpg) round;
        background-size: cover;
        border-radius: 50%;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        cursor: pointer;
      }
      .title {
        color: aliceblue;
        font-size: 24px;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: 60px;
        user-select: none;
        cursor: pointer;
      }
      .title:hover{
        color: #dc7d2b;
      }
      .search {
        width: 300px;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: 30%;
      }
      .menu {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: 70%;
        display: flex;
        justify-content: space-around;
        font-size: 16px;
        font-weight: 400;
        color: rgb(201, 195, 195);
      }
      .menu li {
        margin: 0 8px;
        transition: all 0.3s ease-out;
        cursor: pointer;
        user-select:none;
      }
      .menu li:hover {
        color: #dc7d2b;
        font-weight: 500;
        font-size: 18px;
      }
    }
  }
  .avatar {
    cursor: pointer;
    width: 45px;
    height: 45px;
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    border-radius: 50%;
    // transition: all 0.5s ease-out;
  }
  :deep(.ant-input-search) {
    border-radius: 25px;
  }
  :deep(.ant-dropdown-menu-title-content) {
    color: #fff;
  }
  :deep(.ant-dropdown-menu-title-content:hover) {
    color:#dc7d2b;
  }
  .active {
    color: #dc7d2b;
    font-size: 16px;
    font-weight: 500;
  }
</style>

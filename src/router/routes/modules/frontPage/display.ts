import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const dashboard: AppRouteModule = {
  path: '/display',
  name: 'Display',
  component: import('/@/views/frontPage/index.vue'),
  redirect: '/display/home',
  meta: {
    title: t('展示'),
    hideMenu: true,
  },
  children: [
    {
      path: 'home',
      name: 'HomePage',
      component: () => import('/@/views/frontPage/homePage.vue'),
      meta: {
        title: t('首页'),
      },
    },
    {
      path: 'collects',
      name: 'CollectsPage',
      component: () => import('/@/views/frontPage/collects.vue'),
      meta: {
        title: t('收藏'),
      },
    },
    {
      path: 'recommend',
      name: 'RecommendPage',
      component: () => import('/@/views/frontPage/recommend.vue'),
      meta: {
        title: t('推荐'),
      },
    },
    {
      path: 'ranks',
      name: 'ranksPage',
      component: () => import('/@/views/frontPage/rankList.vue'),
      meta: {
        title: t('排行榜'),
      },
    },
    {
      path: 'video:path(.*)',
      name: 'videoPage',
      component: () => import('/@/views/frontPage/video.vue'),
      meta: {
        title: t('视频'),
      },
    },
  ],
};

export default dashboard;

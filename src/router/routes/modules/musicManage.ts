import type { AppRouteModule } from '/@/router/types';
import { RoleEnum } from '/@/enums/roleEnum';
import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const dashboard: AppRouteModule = {
  path: '/music',
  name: 'Music',
  component: LAYOUT,
  redirect: '/music/index',
  meta: {
    // hideChildrenInMenu: true,
    icon: 'dashicons:format-video',
    title: t('视频管理'),
    roles: [RoleEnum.SUPER],
    orderNo: 20,
  },
  children: [
    {
      path: 'index',
      name: 'MusicPage',
      component: () => import('/@/views/musicManage/index.vue'),
      meta: {
        title: t('音乐视频'),
        icon: 'akar-icons:video',
        hideMenu: false,
      },
    },
    {
      path: 'singer',
      name: 'singerPage',
      component: () => import('/@/views/musicManage/singer.vue'),
      meta: {
        title: t('歌手管理'),
        icon: 'openmoji:man-singer-medium-light-skin-tone',
        hideMenu: false,
      },
    },
    {
      path: 'type',
      name: 'videoType',
      component: () => import('/@/views/musicManage/type.vue'),
      meta: {
        title: t('类型管理'),
        icon: 'carbon:type-pattern',
        hideMenu: false,
      },
    },
  ],
};

export default dashboard;

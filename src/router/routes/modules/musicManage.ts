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
    icon: 'simple-icons:about-dot-me',
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
        icon: 'simple-icons:about-dot-me',
        hideMenu: false,
      },
    },
    {
      path: 'addvideo',
      name: 'addPage',
      component: () => import('/@/views/musicManage/addvideo.vue'),
      meta: {
        title: t('新增视频'),
        icon: 'simple-icons:about-dot-me',
        hideMenu: false,
      },
    },
  ],
};

export default dashboard;

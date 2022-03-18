import type { AppRouteModule } from '/@/router/types';
import { RoleEnum } from '/@/enums/roleEnum';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const dashboard: AppRouteModule = {
  path: '/comment',
  name: 'Comment',
  component: LAYOUT,
  redirect: '/comment/index',
  meta: {
    hideChildrenInMenu: true,
    icon: 'simple-icons:about-dot-me',
    title: t('评论管理'),
    orderNo: 30,
    roles: [RoleEnum.SUPER],
  },
  children: [
    {
      path: 'index',
      name: 'commentPage',
      component: () => import('/@/views/commentManage/index.vue'),
      meta: {
        title: t('评论'),
        icon: 'simple-icons:about-dot-me',
        hideMenu: true,
      },
    },
  ],
};

export default dashboard;

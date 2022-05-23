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
    icon: 'bx:comment-detail',
    title: t('评论管理'),
    orderNo: 30,
    roles: [RoleEnum.SUPER],
    hideMenu: true,
  },
  children: [
    {
      path: 'index',
      name: 'commentPage',
      component: () => import('/@/views/commentManage/index.vue'),
      meta: {
        title: t('评论'),
        icon: 'bx:comment-detail',
        hideMenu: true,
      },
    },
  ],
};

export default dashboard;

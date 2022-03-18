import type { AppRouteModule } from '/@/router/types';
import { RoleEnum } from '/@/enums/roleEnum';
import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const dashboard: AppRouteModule = {
  path: '/usermanage',
  name: 'Usermanage',
  component: LAYOUT,
  redirect: '/usermanage/index',
  meta: {
    hideChildrenInMenu: true,
    icon: 'simple-icons:about-dot-me',
    title: t('用户管理'),
    orderNo: 1,
    roles: [RoleEnum.SUPER],
  },
  children: [
    {
      path: 'index',
      name: 'usermanagePage',
      component: () => import('/@/views/userManage/index.vue'),
      meta: {
        title: t('用户管理'),
        icon: 'simple-icons:about-dot-me',
        hideMenu: true,
      },
    },
  ],
};

export default dashboard;


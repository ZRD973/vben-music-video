import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';
import { RoleEnum } from '/@/enums/roleEnum';


const personal: AppRouteModule = {
  path: '/personal',
  name: 'Personal',
  component:LAYOUT,
  // component: () => import('/@/views/account/center/index.vue'),
  redirect: '/personal/center',
  meta: {
    orderNo: 20,
    icon: 'ion:aperture-outline',
    title: t('个人中心'),
    hideMenu: true,
  },
      children: [
        {
          path: 'center',
          name: 'AccountCenterPage',
          component: () => import('/@/views/account/center/index.vue'),
          meta: {
            title: t('个人中心'),
          },
        },
        {
          path: 'setting',
          name: 'AccountSettingPage',
          component: () => import('/@/views/account/setting/index.vue'),
          meta: {
            title: t('个人设置'),
          },
        },
      ],
    
};

export default personal;

import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';


// const personal: AppRouteModule = {
//   path: '/personal/setting',
//   name: 'AccountSettingPage',
//   component: LAYOUT,
//   // component: () => import('/@/views/account/setting/index.vue'),
//   meta: {
//     orderNo: 20,
//     icon: 'ion:aperture-outline',
//     title: t('个人设置'),
//     hideMenu: true,
//   },
// };


const personal: AppRouteModule = {
  path: '/personal',
  name: 'Personal',
  component:LAYOUT,
  // component: () => import('/@/views/account/center/index.vue'),
  redirect: '/personal/setting',
  meta: {
    orderNo: 20,
    icon: 'ion:aperture-outline',
    title: t('个人设置'),
    hideMenu: true,
  },
      children: [
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

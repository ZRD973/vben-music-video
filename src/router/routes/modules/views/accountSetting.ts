import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';


const personal: AppRouteModule = {
  path: '/personal/setting',
  name: 'AccountSettingPage',
  component: () => import('/@/views/account/setting/index.vue'),
  meta: {
    orderNo: 20,
    icon: 'ion:aperture-outline',
    title: t('个人设置'),
    hideMenu: true,
  },
};

export default personal;

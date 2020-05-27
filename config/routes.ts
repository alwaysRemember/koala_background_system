/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-05-27 15:38:05
 * @LastEditTime: 2020-05-27 16:58:59
 * @FilePath: /backgorund_system/config/routes.ts
 */

import { IRouteData } from '@/interface/global';
import { EUserAuth } from '@/enums/UserAuthEnum';
const routers: Array<IRouteData> = [
  {
    path: '/login',
    component: './Login',
    meta: {
      auth: EUserAuth.PUBLIC,
      title: '用户登录',
    },
  },
];

export default routers;

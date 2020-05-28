/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-05-27 15:38:05
 * @LastEditTime: 2020-05-28 13:51:16
 * @FilePath: /koala_background_system/config/routes.ts
 */

import { IRoute } from 'umi';

const routers: Array<IRoute> = [
  {
    path: '/login',
    component: './Login',
    meta: {
      title: '用户登录',
    },
  },
];

export default routers;

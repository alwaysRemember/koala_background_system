/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-05-27 15:38:05
 * @LastEditTime: 2020-06-08 15:40:07
 * @FilePath: /koala_background_system/src/routes.ts
 */

import { IRoute } from 'umi';
import { IRouteData } from './interface/Global';
import { EUserAuth } from './enums/UserAuthEnum';

const routes: Array<IRouteData> = [
  {
    path: '/login',
    component: require('./pages/Login').default,
    meta: {
      title: '用户登录',
      auth: EUserAuth.PUBLIC,
    },
  },
  {
    path: '/server',
    component: require('./layout/Server').default,
    routes: [
      {
        path: '/server',
        component: require('./pages/ServerHome').default,
        meta: {
          title: '主页',
          auth: EUserAuth.PROXY,
        },
      },
    ],
  },
];

export default routes;

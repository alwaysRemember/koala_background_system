/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-05-27 15:38:05
 * @LastEditTime: 2020-06-09 14:57:01
 * @FilePath: /koala_background_system/src/routes.ts
 */

import { IRoute } from 'umi';
import { IRouteData } from './interface/Global';
import { EUserAuth } from './enums/UserAuthEnum';

export const serverRoutes: Array<IRouteData> = [
  {
    path: '/server',
    exact: true,
    wrappers: [require('./wrappers/Auth').default],
    component: require('./pages/ServerHome').default,
    meta: {
      title: '主页',
      auth: EUserAuth.PROXY,
    },
  },
  {
    path: '/server/userList',
    exact: true,
    wrappers: [require('./wrappers/Auth').default],
    component: require('./pages/UserList').default,
    meta: {
      title: '用户列表',
      auth: EUserAuth.PROXY,
    },
  },
];

const routes: Array<IRouteData> = [
  {
    path: '/login',
    exact: true,
    component: require('./pages/Login').default,
    meta: {
      title: '用户登录',
      auth: EUserAuth.PUBLIC,
    },
  },
  {
    path: '/server',
    component: require('./layout/Server').default,
    routes: serverRoutes,
  },
  {
    path: '/deniend',
    exact: true,
    component: require('./pages/PermissionDenied').default,
    meta: {
      title: '出错咯',
      auth: EUserAuth.PUBLIC,
    },
  },
];

export default routes;

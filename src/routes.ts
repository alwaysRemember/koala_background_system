/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-05-27 15:38:05
 * @LastEditTime: 2020-07-13 16:53:36
 * @FilePath: /koala_background_system/src/routes.ts
 */

import { IRoute } from 'umi';
import { IRouteData } from './interface/Global';
import { EUserAuth } from './enums/UserAuthEnum';

export let serverRoutes: Array<IRouteData> = [
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
    path: '/server/adminUserList',
    exact: true,
    wrappers: [require('./wrappers/Auth').default],
    component: require('./pages/AdminUserList').default,
    meta: {
      title: '代理列表',
      auth: EUserAuth.ADMIN,
    },
  },
  {
    path: '/server/addAdmin',
    exact: true,
    wrappers: [require('./wrappers/Auth').default],
    component: require('./pages/AddAdmin').default,
    meta: {
      title: '添加代理',
      auth: EUserAuth.ADMIN,
    },
  },
  {
    path: '/server/changePassword',
    exact: true,
    wrappers: [require('./wrappers/Auth').default],
    component: require('./pages/ChangePassword').default,
    meta: {
      title: '修改密码',
      auth: EUserAuth.PROXY,
    },
  },
  {
    path: '/server/categories',
    exact: true,
    wrappers: [require('./wrappers/Auth').default],
    component: require('./pages/Categories').default,
    meta: {
      title: '商品分类',
      auth: EUserAuth.ADMIN,
    },
  },
  {
    path: '/server/addCategories',
    exact: true,
    wrappers: [require('./wrappers/Auth').default],
    component: require('./pages/AddCategories').default,
    meta: {
      title: '添加分类',
      auth: EUserAuth.ADMIN,
    },
  },
  {
    path: '/server/appletUsers',
    exact: true,
    wrappers: [require('./wrappers/Auth').default],
    component: require('./pages/AppletUsers').default,
    meta: {
      title: '小程序用户列表',
      auth: EUserAuth.ADMIN,
    },
  },
  {
    path: '/server/addProduct',
    exact: true,
    wrappers: [require('./wrappers/Auth').default],
    component: require('./pages/AddProduct').default,
    meta: {
      title: '新增产品',
      auth: EUserAuth.PROXY,
    },
  },
];

serverRoutes.push({ component: require('./pages/404/index').default });

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
  { component: require('./pages/404/index').default },
];

export default routes;

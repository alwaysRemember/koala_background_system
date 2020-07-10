/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-06-09 15:00:10
 * @LastEditTime: 2020-07-10 14:20:31
 * @FilePath: /koala_background_system/src/layout/Server/menuData.ts
 */
import { ISubMenuItem, IMenuItem } from './interface';
import { EUserAuth } from '@/enums/UserAuthEnum';

export const menuList: Array<ISubMenuItem | IMenuItem> = [
  {
    path: '/server',
    menuTitle: '主页',
    auth: EUserAuth.PROXY,
  },
  {
    subMenuTitle: '商品分类管理',
    key: 'categories',
    auth: EUserAuth.ADMIN,
    children: [
      {
        path: '/server/categories',
        menuTitle: '商品分类列表',
        subMenuKey: 'categories',
      },
      {
        path: '/server/addCategories',
        menuTitle: '新增商品分类',
        subMenuKey: 'categories',
      },
    ],
  },
  {
    subMenuTitle: '代理管理',
    key: 'user',
    auth: EUserAuth.ADMIN,
    children: [
      {
        path: '/server/adminUserList',
        menuTitle: '代理列表',
        subMenuKey: 'user',
      },
      {
        path: '/server/addAdmin',
        menuTitle: '添加代理',
        subMenuKey: 'user',
      },
    ],
  },
  {
    path: '/server/appletUsers',
    menuTitle: '小程序用户列表',
    auth: EUserAuth.ADMIN,
  },
  {
    path: '/server/changePassword',
    menuTitle: '修改密码',
    auth: EUserAuth.PROXY,
  },
];

/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-06-09 15:00:10
 * @LastEditTime: 2020-07-30 16:57:13
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
        auth: EUserAuth.ADMIN,
      },
      {
        path: '/server/addCategories',
        menuTitle: '新增商品分类',
        subMenuKey: 'categories',
        auth: EUserAuth.ADMIN,
      },
    ],
  },
  {
    subMenuTitle: '商品管理',
    key: 'product',
    auth: EUserAuth.PROXY,
    children: [
      {
        path: '/server/productReviewList',
        menuTitle: '审核列表',
        subMenuKey: 'product',
        auth: EUserAuth.ADMIN,
      },
      {
        path: '/server/productList',
        menuTitle: '商品列表',
        subMenuKey: 'product',
        auth: EUserAuth.PROXY,
      },
      {
        path: '/server/addProduct',
        menuTitle: '添加商品',
        subMenuKey: 'product',
        auth: EUserAuth.PROXY,
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
        auth: EUserAuth.ADMIN,
      },
      {
        path: '/server/addAdmin',
        menuTitle: '添加代理',
        subMenuKey: 'user',
        auth: EUserAuth.ADMIN,
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

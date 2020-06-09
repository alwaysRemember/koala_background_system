/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-06-09 15:00:10
 * @LastEditTime: 2020-06-09 18:36:25
 * @FilePath: /koala_background_system/src/layout/Server/menuData.ts
 */
import { ISubMenuItem, IMenuItem } from './interface';

export const menuList: Array<ISubMenuItem | IMenuItem> = [
  {
    path: '/server',
    menuTitle: '主页',
  },
  {
    subMenuTitle: '用户管理',
    key: 'user',
    children: [
      {
        path: '/server/userList',
        menuTitle: '用户列表',
        subMenuKey: 'user',
      },
    ],
  },
  {
    path: '/server/changePassword',
    menuTitle: '修改密码',
  },
];

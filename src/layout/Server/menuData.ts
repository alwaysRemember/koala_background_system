/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-06-09 15:00:10
 * @LastEditTime: 2020-06-11 14:27:18
 * @FilePath: /koala_background_system/src/layout/Server/menuData.ts
 */
import { ISubMenuItem, IMenuItem } from './interface';

export const menuList: Array<ISubMenuItem | IMenuItem> = [
  {
    path: '/server',
    menuTitle: '主页',
  },
  {
    subMenuTitle: '代理管理',
    key: 'user',
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
    path: '/server/changePassword',
    menuTitle: '修改密码',
  },
];

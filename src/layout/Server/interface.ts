/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-06-09 15:00:17
 * @LastEditTime: 2020-06-09 16:11:38
 * @FilePath: /koala_background_system/src/layout/Server/interface.ts
 */

export interface ISubMenuItem {
  subMenuTitle: string;
  key: string;
  children: Array<IMenuItem>;
}

export interface IMenuItem {
  path: string;
  menuTitle: string;
  subMenuKey?: string;
}

/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-06-09 15:00:17
 * @LastEditTime: 2020-06-17 16:45:29
 * @FilePath: /koala_background_system/src/layout/Server/interface.ts
 */

import { EUserAuth } from '@/enums/UserAuthEnum';

export interface ISubMenuItem {
  subMenuTitle: string;
  key: string;
  children: Array<IMenuItem>;
  auth?: EUserAuth;
}

export interface IMenuItem {
  path: string;
  menuTitle: string;
  subMenuKey?: string;
  auth?: EUserAuth;
}

/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-06-16 14:42:32
 * @LastEditTime: 2020-06-16 15:07:44
 * @FilePath: /koala_background_system/src/pages/AdminUserList/components/Search/interface.ts
 */
import { EUserAuthSelectList } from '@/enums/UserAuthEnum';
import { MutableRefObject } from 'react';

export interface ISearch {
  searchFn: (username: string, userType: EUserAuthSelectList) => void;
  resetFn: (username: string, userType: EUserAuthSelectList) => void;
  cref: MutableRefObject<any>;
}

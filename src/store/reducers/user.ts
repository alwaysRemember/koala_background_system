/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-06-08 16:28:27
 * @LastEditTime: 2020-06-08 16:32:17
 * @FilePath: /koala_background_system/src/store/actions/reducers/user.ts
 */
import { IUserDataResponse } from '@/pages/Login/interface';
import { getLocal } from '@/utils';
import { EGlobal } from '@/enums/Global';
import { IReduxAction } from '@/interface/Global';
import { UPDATE_USER_INFO } from '@/store/constants';

/**
 * 用户信息
 * @param state
 * @param actions
 */
export const userInfo = (
  state: IUserDataResponse = getLocal(EGlobal.LOCAL_USER_INFO),
  actions: IReduxAction<IUserDataResponse>,
): IUserDataResponse => {
  switch (actions.type) {
    case UPDATE_USER_INFO:
      return actions.data;
    default:
      return state;
  }
};

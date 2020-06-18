/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-06-08 16:28:27
 * @LastEditTime: 2020-06-18 17:12:06
 * @FilePath: /koala_background_system/src/store/reducers/user.ts
 */
import { IUserDataResponse } from '@/pages/Login/interface';
import { getLocal } from '@/utils';
import { EGlobal } from '@/enums/Global';
import { IReduxAction } from '@/interface/Global';
import { UPDATE_USER_INFO } from '@/store/constants';
import { EUserAuth } from '@/enums/UserAuthEnum';

/**
 * 用户信息
 * @param state
 * @param actions
 */
export const userInfo = (
  state: IUserDataResponse = {
    token: '',
    userType: EUserAuth.PUBLIC,
    username: '',
  },
  actions: IReduxAction<IUserDataResponse>,
): IUserDataResponse => {
  switch (actions.type) {
    case UPDATE_USER_INFO:
      return actions.data;
    default:
      return state;
  }
};

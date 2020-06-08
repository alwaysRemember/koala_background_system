/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-06-08 16:23:17
 * @LastEditTime: 2020-06-08 16:27:27
 * @FilePath: /koala_background_system/src/actions/user.ts
 */
import { IUserDataResponse } from '@/pages/Login/interface';
import { IReduxAction } from '@/interface/Global';
import { UPDATE_USER_INFO } from '@/store/constants';

/**
 * 更新用户信息
 * @param data
 */
export const updateUserInfo = (
  data: IUserDataResponse,
): IReduxAction<IUserDataResponse> => ({
  type: UPDATE_USER_INFO,
  data,
});

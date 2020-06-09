/*
 * @Author: Always
 * @LastEditors: Always
 * @email: 740905172@qq.com
 * @Date: 2019-12-31 17:09:16
 * @LastEditTime: 2020-06-09 18:27:28
 * @FilePath: /koala_background_system/src/codeType.ts
 */
import { TResponseCode } from './interface/Http';
import { history } from 'umi';
import { HttpResponseCodeEnums } from './enums/HttpResponseCodeEnums';

export const codeType = (
  code: TResponseCode,
  message: string,
): Promise<any> => {
  return new Promise((res, rej) => {
    if (code === HttpResponseCodeEnums.ALERT) {
      window.message.error(message);
      rej();
      return;
    }
    if (code === HttpResponseCodeEnums.NO_LOGIN) {
      history.replace('/login');
      return;
    }
    res();
  });
};

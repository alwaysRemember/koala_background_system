/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-08-06 16:45:38
 * @LastEditTime: 2020-08-06 18:05:21
 * @FilePath: /koala_background_system/src/pages/AdminUserList/components/BindAppletUserModal/interface.ts
 */
export interface IBindAppletUserModalRef {
  setVisiable: (type: boolean) => void;
  getAppletUserId: () => number;
  setLoading: (type: boolean) => void;
}

export interface IBindAppletUser {
  userId: number;
  appletUserId: number;
}

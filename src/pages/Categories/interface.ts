/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-07-06 14:32:45
 * @LastEditTime: 2020-07-06 16:46:37
 * @FilePath: /koala_background_system/src/pages/Categories/interface.ts
 */

export interface ICategoriesItem {
  id: number;
  logo: string;
  name: string;
  isUse: boolean; // 是否使用
  isShowInHome: boolean; // 是否显示在首页
  createTime: Date;
  updateTime: Date;
}

export interface ICategories {
  total: number;
  list: Array<ICategoriesItem>;
}

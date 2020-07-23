/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-07-06 14:32:45
 * @LastEditTime: 2020-07-23 14:35:28
 * @FilePath: /koala_background_system/src/pages/Categories/interface.ts
 */

export interface IUpdateCategories {
  id: string;
  categoriesName: string;
  isUse: boolean; // 是否使用
  isShowOnHome: boolean; // 是否显示在首页
}

export interface ICategoriesItem extends IUpdateCategories {
  categoriesImg?: string;
  createTime?: Date;
  updateTime?: Date;
}

export interface ICategories {
  total: number;
  list: Array<ICategoriesItem>;
}

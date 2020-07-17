/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-07-14 14:15:29
 * @LastEditTime: 2020-07-17 16:31:30
 * @FilePath: /koala_background_system/src/pages/AddProduct/interface.ts
 */

import { EProductStatus } from '@/enums/EProduct';

export interface IBannerItem {
  id: number;
  name: string;
  size: number;
  url: string;
}
export interface IRequestProduct {
  name: string;
  productStatus: EProductStatus;
  categoriesId: number;
  productDetail: string;
}

// 新增产品
export interface IRequestAddProduct extends IRequestProduct {
  bannerList: Array<File>;
  video: File;
}

// 修改产品
export interface IRequestUpdateProduct extends IRequestProduct {
  addBannerList: Array<File>;
  delBannerList: Array<number>;
  addVideo: File;
  delVideo: number;
}

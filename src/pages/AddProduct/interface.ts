/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-07-14 14:15:29
 * @LastEditTime: 2020-07-20 14:27:28
 * @FilePath: /koala_background_system/src/pages/AddProduct/interface.ts
 */

import { EProductStatus } from '@/enums/EProduct';

interface IRequestFile {
  id: number;
  name: string;
  size: number;
  url: string;
}

export interface IBannerItem extends IRequestFile {}

export interface IVideo extends IRequestFile {}

export interface IRequestProduct {
  name: string;
  productStatus: EProductStatus;
  categoriesId: number;
  productDetail: string;
  bannerIdList: Array<number>;
  delBannerIdList: Array<number>;
  videoId: number;
  delVideoIdList: Array<number>;
}

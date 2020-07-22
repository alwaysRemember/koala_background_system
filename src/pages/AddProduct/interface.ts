/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-07-14 14:15:29
 * @LastEditTime: 2020-07-22 11:38:46
 * @FilePath: /koala_background_system/src/pages/AddProduct/interface.ts
 */

import { EProductStatus } from '@/enums/EProduct';

interface IRequestFile {
  id: number;
  name: string;
  size?: number;
  url: string;
}

export interface IBannerItem extends IRequestFile {}

export interface IVideo extends IRequestFile {}

export interface IProduct {
  productId?: number;
  name: string;
  productStatus: EProductStatus;
  categoriesId: number;
  amount: number;
  productBrief: string;
  productDetail: string;
  mediaIdList: Array<number>;
  delMediaIdList: Array<number>;
  bannerIdList: Array<number>;
  delBannerIdList: Array<number>;
  videoId: number | undefined;
  delVideoIdList: Array<number>;
}

export interface IProductResponse {
  name: string;
  productStatus: EProductStatus;
  categoriesId: number;
  amount: number;
  productBrief: string;
  productDetail: string;
  bannerList: Array<IBannerItem>;
  videoData: IVideo;
}

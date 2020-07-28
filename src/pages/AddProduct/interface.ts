/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-07-14 14:15:29
 * @LastEditTime: 2020-07-28 18:12:55
 * @FilePath: /koala_background_system/src/pages/AddProduct/interface.ts
 */

import { EProductStatus } from '@/enums/EProduct';

interface IRequestFile {
  id: string;
  name: string;
  size?: number;
  url: string;
}

export interface IBannerItem extends IRequestFile {}

export interface IVideo extends IRequestFile {}

export interface IMainImg extends IRequestFile {}

export interface IProduct {
  productId?: string;
  name: string;
  productStatus: EProductStatus;
  categoriesId: string;
  amount: number;
  productBrief: string;
  productDetail: string;
  mediaIdList: Array<string>;
  delMediaIdList: Array<string>;
  bannerIdList: Array<string>;
  delBannerIdList: Array<string>;
  mainImgId: string;
  delMainImgIdList: Array<string>;
  videoId: string;
  delVideoIdList: Array<string>;
}

export interface IProductResponse {
  name: string;
  productStatus: EProductStatus;
  categoriesId: string;
  amount: number;
  productBrief: string;
  productDetail: string;
  bannerList: Array<IBannerItem>;
  videoData: IVideo;
  mainImg: IMainImg;
}

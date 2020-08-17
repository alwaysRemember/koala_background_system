/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-07-14 14:15:29
 * @LastEditTime: 2020-08-17 16:17:44
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
  productType: boolean;
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
  productParameter: Array<IProductParameter>;
}

export interface IProductResponse {
  name: string;
  productStatus: EProductStatus;
  productType: boolean;
  categoriesId: string;
  amount: number;
  productBrief: string;
  productDetail: string;
  bannerList: Array<IBannerItem>;
  videoData: IVideo;
  mainImg: IMainImg;
  productParameter: Array<IProductParameter>;
}

export interface IProductParameter {
  key: string;
  value: string;
}

export interface IProductParameterRenderItem {
  index: number;
  label: string;
  value: string;
  onChange: (data: IProductParameter, index: number) => void;
}

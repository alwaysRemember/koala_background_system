/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-07-14 14:15:29
 * @LastEditTime: 2020-09-01 14:43:06
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
  productConfigList: Array<IProductConfig>;
  productConfigDelList: Array<number>;
  productDeliveryCity: string;
  productShipping: number; // 运费
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
  productConfigList: Array<IProductConfig>;
  productDeliveryCity: string;
  productShipping: number; // 运费
}

export interface IProductConfig {
  id?: number;
  name: string;
  amount: number;
  categoryName: string;
}

export interface IProductConfigList {
  title: string;
  list: Array<IProductConfig>;
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
  removeProductParameter: (index: number) => void;
}

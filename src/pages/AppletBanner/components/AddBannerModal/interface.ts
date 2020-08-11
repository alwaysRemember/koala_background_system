/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-08-07 14:11:35
 * @LastEditTime: 2020-08-10 17:40:06
 * @FilePath: /koala_background_system/src/pages/AppletBanner/components/AddBannerModal/interface.ts
 */

import { UploadFile } from 'antd/lib/upload/interface';

type setType = (type: boolean) => void;

export interface IFileItem extends UploadFile {
  id: number;
}
export interface IAddBannerModalRef {
  setVisible: setType;
}

export interface ISelectProductItem {
  id: string;
  productName: string;
}

export interface IBannerImgItem {
  id: number;
  name: string;
  url: string;
}

export interface IAppletHomeAddBannerRequest {
  productId: string;
  bannerImgId: number;
}

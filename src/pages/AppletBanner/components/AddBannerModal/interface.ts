/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-08-07 14:11:35
 * @LastEditTime: 2020-08-10 16:14:20
 * @FilePath: /koala_background_system/src/pages/AppletBanner/components/AddBannerModal/interface.ts
 */

type setType = (type: boolean) => void;
export interface IAddBannerModalRef {
  setVisible: setType;
}

export interface ISelectProductItem {
  id: string;
  productName: string;
}

export interface IBannerImgItem {
  id: string;
  name: string;
  url: string;
}

/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-07-17 18:06:14
 * @LastEditTime: 2020-07-20 14:28:27
 * @FilePath: /koala_background_system/src/pages/AddProduct/components/Banner/interface.ts
 */
import { UploadFile } from 'antd/lib/upload/interface';
import { IBannerItem } from '../../interface';

export interface IFileItem extends UploadFile {
  id: number;
}

export interface IBannerRef {
  getBannerIdList: () => Array<number>;
  getDelBannerIdList: () => Array<number>;
}

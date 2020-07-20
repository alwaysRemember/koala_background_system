/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-07-20 11:55:05
 * @LastEditTime: 2020-07-20 14:20:09
 * @FilePath: /koala_background_system/src/pages/AddProduct/components/Video/interface.ts
 */

import { UploadFile } from 'antd/lib/upload/interface';

export interface IFileItem extends UploadFile {
  id: number;
}

export interface IVideoRef {
  getDelVideoIdList: () => Array<number>;
}

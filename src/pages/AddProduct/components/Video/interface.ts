/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-07-20 11:55:05
 * @LastEditTime: 2020-07-23 15:09:23
 * @FilePath: /koala_background_system/src/pages/AddProduct/components/Video/interface.ts
 */

import { UploadFile } from 'antd/lib/upload/interface';

export interface IFileItem extends UploadFile {
  id: string;
}

export interface IVideoRef {
  getDelVideoIdList: () => Array<string>;
}

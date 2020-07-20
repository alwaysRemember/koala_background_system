/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-07-15 15:38:26
 * @LastEditTime: 2020-07-17 14:32:19
 * @FilePath: /koala_background_system/src/components/Editor/interface.ts
 */

export interface IEditor {
  getValue: () => string;
}

export interface IUploadItem {
  file: File;
  id?: string;
  progress: (progress: number) => void;
  libraryId: string;
  success: (res: {
    url: string;
    meta: {
      id: string;
      title: string;
      alt: string;
      loop: boolean;
      autoPlay: boolean;
      controls: boolean;
      poster: string;
    };
  }) => void;
  error: (err: { msg: string }) => void;
}

export interface IMediaLibraryItem {
  id: number;
  path: string;
  type: string;
}

// 从编辑器获取到的媒体数据
export interface IMediaLibraryResponseItem {
  url: string;
  type: string;
  meta?: {
    id: string;
  };
}

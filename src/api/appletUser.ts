/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-08-12 17:57:11
 * @LastEditTime: 2020-08-12 18:02:44
 * @FilePath: /koala_background_system/src/api/appletUser.ts
 */

import http from '../axios';
import { IAppletUsers, IAppletUserItem } from '@/pages/AppletUsers/interface';
import {
  IBannerImgItem,
  IAppletHomeAddBannerRequest,
  IAppletHomeBannerItem,
} from '@/pages/AppletBanner/components/AddBannerModal/interface';

/**
 * 获取小程序用户列表
 * @param params
 */
export const getAppletUsers = (params: { page: number; pageSize: number }) =>
  http.request<IAppletUsers>({
    url: '/backend-applet-user/get-applet-user-list',
    method: 'post',
    params,
    contentType: 'json',
  });

/**
 * 根据手机号获取小程序用户
 * @param params
 */
export const getAppletUserForPhone = (params: { phone: string }) =>
  http.request<Array<IAppletUserItem>>({
    url: '/backend-applet-user/get-user-for-phone',
    params,
    method: 'post',
    contentType: 'json',
  });

/**
 * 上传banner图片
 * @param params
 */
export const uploadBannerImg = (params: FormData) =>
  http.request<IBannerImgItem>({
    method: 'post',
    url: '/applet-home/upload-banner-img',
    params,
    contentType: 'formData',
  });

/**
 * 删除banner图片
 * @param params
 */
export const removeAppletHomeBannerImg = (params: { id: number }) =>
  http.request({
    method: 'post',
    url: '/applet-home/remove-banner-img',
    params,
    contentType: 'json',
  });

/**
 * 添加小程序首页banner
 * @param params
 */
export const appletHomeAddBanner = (params: IAppletHomeAddBannerRequest) =>
  http.request({
    method: 'post',
    url: '/applet-home/add-banner',
    params,
    contentType: 'json',
  });

/**
 * 获取小程序主页中的banner
 */
export const getAppletHomeBannerList = () =>
  http.request<Array<IAppletHomeBannerItem>>({
    method: 'get',
    url: '/applet-home/get-banner-list',
    contentType: 'json',
  });

/**
 * 删除小程序主页中的banner
 * @param params
 */
export const deleteAppletHomeBanner = (params: { id: number }) =>
  http.request({
    method: 'post',
    url: '/applet-home/delete-banner',
    params,
    contentType: 'json',
  });

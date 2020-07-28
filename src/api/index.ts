/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-05-28 15:37:50
 * @LastEditTime: 2020-07-28 17:11:05
 * @FilePath: /koala_background_system/src/api/index.ts
 */
import http from '../axios';
import { IUserData, IUserDataResponse } from '@/pages/Login/interface';
import { IRequestData } from '@/pages/ChangePassword/interface';
import { IAddAdminData } from '@/pages/AddAdmin/interface';
import {
  IAdminUserListRequestParams,
  IAdminUserListResponse,
  IAdminUserItem,
} from '@/pages/AdminUserList/interface';
import {
  ICategories,
  IUpdateCategories,
  ICategoriesItem,
} from '@/pages/Categories/interface';
import { IAppletUsers } from '@/pages/AppletUsers/interface';
import { IMediaLibraryItem } from '@/pages/AddProduct/components/Editor/interface';
import {
  IBannerItem,
  IVideo,
  IProduct,
  IProductResponse,
  IMainImg,
} from '@/pages/AddProduct/interface';
import {
  ISelectUserItem,
  IRequestProduct,
} from '@/pages/ProductList/interface';
import { IProductItem } from '@/components/ProductsTable/interface';

/**
 * 用户登录
 * @param params
 */
export const userLogin = (params: IUserData) =>
  http.request<IUserDataResponse>({
    url: '/backend-user/login',
    method: 'post',
    params,
    contentType: 'json',
  });

/**
 * 修改当前登录用户的密码
 * @param params
 */
export const changeUserPassword = (params: IRequestData) =>
  http.request({
    url: '/backend-user/change-password',
    method: 'post',
    params,
    contentType: 'json',
  });

/**
 * 添加代理
 * @param params
 */
export const addUser = (params: IAddAdminData) =>
  http.request({
    url: '/backend-user/add-user',
    method: 'post',
    params,
    contentType: 'json',
  });

/**
 * 获取代理列表数据
 * @param params
 */
export const getAdminUserList = (params: IAdminUserListRequestParams) =>
  http.request<IAdminUserListResponse>({
    url: '/backend-user/find-user-list',
    method: 'post',
    params,
    contentType: 'json',
  });

/**
 * 修改代理用户
 * @param params
 */
export const updateAdminUser = (params: IAdminUserItem) =>
  http.request({
    url: '/backend-user/update-admin-user',
    method: 'post',
    params,
    contentType: 'json',
  });

/**
 * 删除代理用户
 * @param params
 */
export const deleteAdminUser = (params: { userId: number }) =>
  http.request({
    url: '/backend-user/delete-admin-user',
    method: 'post',
    params,
    contentType: 'json',
  });

/**
 * 获取商品分类数据
 * @param params
 */
export const getCategoriesData = (params: { page: number; pageSize: number }) =>
  http.request<ICategories>({
    url: '/backend-categories/get-categories',
    method: 'post',
    params,
    contentType: 'json',
  });

/**
 * 更新商品分类数据
 * @param params
 */
export const updateCategories = (params: IUpdateCategories) =>
  http.request({
    url: '/backend-categories/update-categories',
    method: 'post',
    params,
    contentType: 'json',
  });

/**
 * 创建商品分类标签
 * @param params
 */
export const createCategories = (params: FormData) =>
  http.request({
    url: '/backend-categories/add-categories',
    method: 'post',
    params,
    contentType: 'formData',
  });

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
 * 获取使用中的产品标签
 * @param params
 */
export const getUsingCategories = () =>
  http.request<{ list: Array<ICategoriesItem> }>({
    method: 'get',
    url: '/backend-categories/get-using-categories',
    contentType: 'json',
  });

/**
 * 上传文件到媒体库
 * @param params
 */
export const uploadMediaLibrary = (params: FormData) =>
  http.request<{ filePath: string; id: number }>({
    method: 'post',
    url: '/media-library/upload-file',
    params,
    contentType: 'formData',
  });

/**
 * 获取媒体库数据
 * @param params
 */
export const getMediaLibraryList = (params: { productId: string }) =>
  http.request<Array<IMediaLibraryItem>>({
    method: 'post',
    url: '/media-library/get-file-list',
    params,
    contentType: 'json',
  });

/**
 * 上传banner
 * @param params
 */
export const uploadProductBanner = (params: FormData) =>
  http.request<IBannerItem>({
    method: 'post',
    url: '/product/upload-product-banner',
    params,
    contentType: 'formData',
  });

/**
 * 上传video
 * @param params
 */
export const uploadProductVideo = (params: FormData) =>
  http.request<IVideo>({
    method: 'post',
    url: '/product/upload-product-video',
    params,
    contentType: 'formData',
  });

/**
 * 上传产品主图
 * @param params
 */
export const uploadProductMainImg = (params: FormData) =>
  http.request<IMainImg>({
    method: 'post',
    url: '/product/upload-product-main-img',
    params,
    contentType: 'formData',
  });

/**
 * 上传产品
 * @param params
 */
export const uploadProduct = (params: IProduct) =>
  http.request<{ id: number }>({
    method: 'post',
    url: '/product/upload-product',
    params,
    contentType: 'json',
  });

/**
 * 获取产品详情
 * @param params
 */
export const getProductDetail = (params: { productId: number }) =>
  http.request<IProductResponse>({
    method: 'post',
    url: '/product/get-product-detail',
    params,
    contentType: 'json',
  });

/**
 * 获取所有用户
 */
export const getAllUserList = () =>
  http.request<Array<ISelectUserItem>>({
    method: 'get',
    url: '/backend-user/get-all-user-list',
  });

/**
 * 获取产品列表数据
 * @param params
 */
export const getProductList = (params: IRequestProduct) =>
  http.request<{ total: number; list: Array<IProductItem> }>({
    method: 'post',
    url: '/product-list/get-product-list',
    params,
    contentType: 'json',
  });

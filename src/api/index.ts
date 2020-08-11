/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-05-28 15:37:50
 * @LastEditTime: 2020-08-11 18:10:17
 * @FilePath: /koala_background_system/src/api/index.ts
 */
import http from '../axios';
import { IUserData, IUserDataResponse } from '@/pages/Login/interface';
import { IRequestData } from '@/pages/ChangePassword/interface';
import { IAddAdminData, IAppletUserItem } from '@/pages/AddAdmin/interface';
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
import { EProductStatus } from '@/enums/EProduct';
import { IBindAppletUser } from '@/pages/AdminUserList/components/BindAppletUserModal/interface';
import {
  ISelectProductItem,
  IBannerImgItem,
  IAppletHomeAddBannerRequest,
  IAppletHomeBannerItem,
} from '@/pages/AppletBanner/components/AddBannerModal/interface';

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

/**
 * 删除产品
 * @param params
 */
export const delProduct = (params: { productId: string }) =>
  http.request({
    method: 'post',
    url: 'product/del-product',
    params,
    contentType: 'json',
  });

/**
 * 获取审核中的产品
 * @param params
 */
export const getProductReviewList = (params: {
  page: number;
  pageSize: number;
}) =>
  http.request<{ total: number; list: Array<IProductItem> }>({
    method: 'post',
    url: 'product-list/get-product-review-list',
    params,
    contentType: 'json',
  });

/**
 * 更新产品状态
 * @param params
 */
export const updateProductStatus = (params: {
  productId: string;
  productStatus: EProductStatus;
}) =>
  http.request({
    method: 'post',
    url: 'product/update-product-status',
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
 * 关联管理员和小程序用户
 * @param params
 */
export const bindAppletUser = (params: IBindAppletUser) =>
  http.request({
    url: '/backend-user/bind-applet-user',
    params,
    method: 'post',
    contentType: 'json',
  });

/**
 * 根据产品id获取产品
 * @param params
 */
export const getProductByProductId = (params: { productId: string }) =>
  http.request<Array<ISelectProductItem>>({
    method: 'post',
    url: '/product-list/get-product-by-productId',
    params,
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

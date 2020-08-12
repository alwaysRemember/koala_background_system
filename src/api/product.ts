/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-08-12 17:58:12
 * @LastEditTime: 2020-08-12 18:02:14
 * @FilePath: /koala_background_system/src/api/product.ts
 */

import http from '../axios';
import { IMediaLibraryItem } from '@/pages/AddProduct/components/Editor/interface';
import {
  IBannerItem,
  IVideo,
  IMainImg,
  IProduct,
  IProductResponse,
} from '@/pages/AddProduct/interface';
import { IRequestProduct } from '@/pages/ProductList/interface';
import { IProductItem } from '@/components/ProductsTable/interface';
import { EProductStatus } from '@/enums/EProduct';
import { ISelectProductItem } from '@/pages/AppletBanner/components/AddBannerModal/interface';

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

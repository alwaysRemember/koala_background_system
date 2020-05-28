/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-05-28 15:59:48
 * @LastEditTime: 2020-05-28 16:15:36
 * @FilePath: /koala_background_system/src/utils/index.ts
 */

/**
 * 获取缓存的数据
 * @param key
 */
export const getLocal = <T>(key: string): T => {
  const data = window.localStorage.getItem(key);
  return (data && JSON.parse(data)) || {};
};

/**
 * 设置缓存数据
 * @param key
 * @param value
 */
export const setLocal = (key: string, value: string): void => {
  window.localStorage.setItem(key, value);
};

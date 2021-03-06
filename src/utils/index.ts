/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-05-28 15:59:48
 * @LastEditTime: 2020-10-12 14:12:07
 * @FilePath: /koala_background_system/src/utils/index.ts
 */

export const setClassName = (classNameList: Array<string>) =>
  classNameList.join(' ');

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

/**
 * 删除缓存
 * @param key
 */
export const removeLocal = (key: string): void => {
  window.localStorage.removeItem(key);
};

export const dateFormat = (
  time: Date,
  format: 'yy-mm' | 'yy-mm-dd' | 'yy-mm-dd-hh-ii' | 'hh-ii' | 'hh-ii-ss',
): string => {
  let val: string = '';
  switch (format) {
    case 'yy-mm':
      val = `${time.getFullYear()}年${time.getMonth() + 1}月`;
      break;
    case 'yy-mm-dd':
      val = `${time.getFullYear()}-${time.getMonth() + 1}-${zero(
        time.getDate(),
      )}`;
      break;
    case 'yy-mm-dd-hh-ii':
      val = `${time.getFullYear()}-${time.getMonth() + 1}-${zero(
        time.getDate(),
      )}  ${zero(time.getHours())}:${zero(time.getMinutes())}`;
      break;
    case 'hh-ii':
      val = `${zero(time.getHours())}:${zero(time.getMinutes())}`;
      break;
    case 'hh-ii-ss':
      val = `${zero(time.getHours())}:${zero(time.getMinutes())}:${zero(
        time.getSeconds(),
      )}`;
      break;
  }
  return val;
};

const zero = (num: number): string => {
  if (num < 10) {
    return `0${num}`;
  }
  return String(num);
};

/**
 * 金额转换
 * @param value
 * @param type
 */
export const transferAmount = (
  value: number | string,
  type: 'yuan' | 'fen' = 'yuan',
): number | string => {
  switch (type) {
    case 'yuan':
      return (Number(value) / 100).toFixed(2);
    case 'fen':
      return Number(value) * 100;
  }
};

/**
 * 校验用户名(v>=6 && 数字字母)
 * @param value
 */
export const checkUserName = (value: string): boolean =>
  /^^[0-9a-zA-Z]{6,11}$/.test(value);

/**
 * 校验密码(6-16位 && 数字字母组合)
 * @param value
 */
export const checkPassword = (value: string): boolean =>
  /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/.test(value);

/**
 * 校验邮箱
 * @param value
 */
export const checkEmail = (value: string): boolean =>
  /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(value);

/**
 * 在新窗口打开资源
 * @param href
 */
export const openInNewTab = (href: string) => {
  if (!href) return;
  const a = document.createElement('a');
  a.href = href;
  a.target = '_blank';
  a.click();
};

/**
 * 获取当前时间的00:00:00 || 23:59:59
 * @param type
 * @param date
 */
export const getTime = (type: 'start' | 'end', date: Date): string => {
  date = new Date(date);
  const t: string = `${date.getFullYear()}-${date.getMonth() +
    1}-${date.getDate()}`;
  switch (type) {
    case 'start':
      return new Date(t).getTime() + '';
    case 'end':
      return (
        new Date(
          new Date(new Date(t).toLocaleDateString()).getTime() +
            24 * 60 * 60 * 1000 -
            1,
        ).getTime() + ''
      );
  }
};

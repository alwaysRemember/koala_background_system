/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-05-27 15:13:50
 * @LastEditTime: 2020-05-27 16:27:01
 * @FilePath: /backgorund_system/typings.d.ts
 */ 
declare module '*.css';
declare module "*.png";
declare module '*.less';
interface Window {
  // axios请求中止函数
  cancelRequestFnList: Array<Function>;
  message: any;
}

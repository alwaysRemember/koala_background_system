/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-05-28 13:36:22
 * @LastEditTime: 2020-08-20 14:36:53
 * @FilePath: /koala_background_system/typings.d.ts
 */
declare module '*.css';
declare module '*.less';
declare module '*.png';
declare module '*.json';
declare module '*.svg' {
  export function ReactComponent(
    props: React.SVGProps<SVGSVGElement>,
  ): React.ReactElement;
  const url: string;
  export default url;
}

interface Window {
  // axios请求中止函数
  cancelRequestFnList: Array<Function>;
  message: any;
}

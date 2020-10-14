import { MutableRefObject } from 'react';
import { IShipModalConfirmMethodParams } from '../../interface';

/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-10-14 15:06:27
 * @LastEditTime: 2020-10-14 16:45:25
 * @FilePath: /koala_background_system/src/pages/OrderDetail/components/ShipModal/interface.ts
 */
export interface IShipModalProps {
  cref: MutableRefObject<IShipModalRef | undefined>;
  courierCode: string;
  courierName: string;
  courierNum: string;
  shipModalConfirm: (parmas: IShipModalConfirmMethodParams) => void;
}
export interface ISelectOptionsProps {
  label: string;
  value: string;
}

export interface IShipModalRef {
  changeShowType: (type: boolean) => void;
}

import { getOrderDetail, updateOrderLogisticsInfo } from '@/api';
import { Descriptions, Button, Tag, Tooltip, Image } from 'antd';
import React, { useState, useEffect, useRef } from 'react';
import {
  EOrderType,
  EOrderTypeTransferColor,
  EOrderTypeTransferVal,
} from '../OrderList/enum';
import styles from './index.less';
import {
  IOrderDetailResponse,
  IShipModalConfirmMethodParams,
} from './interface';
import * as clipboard from 'clipboard-polyfill';
import { transferAmount } from '@/utils';
import { IShipModalRef } from './components/ShipModal/interface';
import ShipModal from './components/ShipModal';

const OrderDetail = ({
  location: {
    query: { orderId },
  },
}: any) => {
  const [data, setData] = useState<IOrderDetailResponse>({
    deliveryInfo: {
      name: '',
      phone: '',
      area: '',
      address: '',
    },
    productList: [],
    logisticsInfo: null,
    orderAmount: 0,
    orderShopping: 0,
    orderType: EOrderType.PENDING_PAYMENT,
    orderId,
  });

  const shipModalRef = useRef<IShipModalRef>();

  const getData = async () => {
    try {
      const data = await getOrderDetail({ orderId });
      setData(data);
    } catch (e) {}
  };

  /**
   * 发货modal确认按钮
   * @param params
   */
  const shipModalConfirm = async (params: IShipModalConfirmMethodParams) => {
    try {
      await updateOrderLogisticsInfo(
        Object.assign<{}, IShipModalConfirmMethodParams, { orderId: string }>(
          {},
          params,
          { orderId: data.orderId },
        ),
      );
      getData();
    } catch (e) {}
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <div className={styles['order-detail-wrapper']}>
      <Descriptions
        title="订单信息"
        column={{
          xs: 1,
          sm: 2,
          md: 2,
        }}
        bordered
        className={styles['info-group']}
      >
        <Descriptions.Item label="订单编号">
          <Tooltip title={data.orderId}>
            <span className={styles['order-id']}>
              {data.orderId.substring(0, 8)}...
            </span>
          </Tooltip>
          <Button
            size="small"
            type="primary"
            onClick={() => {
              clipboard.writeText(data.orderId).then(() => {
                window.message.success('复制成功', 1);
              });
            }}
          >
            复制订单号
          </Button>
        </Descriptions.Item>
        <Descriptions.Item label="订单金额">
          {transferAmount(data.orderAmount, 'yuan')} 元
        </Descriptions.Item>
        <Descriptions.Item label="订单运费">
          {transferAmount(data.orderShopping, 'yuan')} 元
        </Descriptions.Item>
        <Descriptions.Item label="订单状态">
          <Tag color={EOrderTypeTransferColor[data.orderType]}>
            {EOrderTypeTransferVal[data.orderType]}
          </Tag>
        </Descriptions.Item>
      </Descriptions>
      <Descriptions
        title="用户收货信息"
        bordered
        className={styles['info-group']}
        column={{
          xs: 1,
          sm: 2,
          md: 2,
        }}
      >
        <Descriptions.Item label="收件人">
          {data.deliveryInfo.name}
        </Descriptions.Item>
        <Descriptions.Item label="手机号">
          {data.deliveryInfo.phone}
        </Descriptions.Item>
        <Descriptions.Item label="详细地址">
          {data.deliveryInfo.area}
          {data.deliveryInfo.address}
        </Descriptions.Item>
      </Descriptions>
      <Descriptions
        bordered
        title="物流信息"
        className={styles['info-group']}
        column={{
          xs: 1,
          sm: 2,
          md: 2,
        }}
      >
        <Descriptions.Item label="快递公司">
          {data.logisticsInfo?.courierName || '空'}
        </Descriptions.Item>
        <Descriptions.Item label="快递单号">
          <p>{data.logisticsInfo?.courierNum || '空'}</p>
          {!!data.logisticsInfo?.courierNum && (
            <Button
              size="small"
              type="primary"
              onClick={() => {
                clipboard
                  .writeText(data.logisticsInfo?.courierNum || '')
                  .then(() => {
                    window.message.success('复制成功', 1);
                  });
              }}
            >
              复制单号
            </Button>
          )}
        </Descriptions.Item>
        {(data.orderType === EOrderType.TO_BE_DELIVERED ||
          data.orderType === EOrderType.TO_BE_RECEIVED) && (
          <Descriptions.Item label="操作">
            <Button
              type="primary"
              onClick={() => shipModalRef.current?.changeShowType(true)}
            >
              {data.orderType === EOrderType.TO_BE_DELIVERED
                ? '发货'
                : '修改物流信息'}
            </Button>
          </Descriptions.Item>
        )}
      </Descriptions>

      <Descriptions title="商品列表" className={styles['info-group']}>
        {data.productList.map(
          ({ img, name, buyQuantity, amount, remark, productId }, index) => (
            <Descriptions.Item key={productId}>
              <Descriptions
                title={`商品 ${index + 1}`}
                bordered
                layout="vertical"
                column={{
                  xs: 2,
                  sm: 3,
                  md: 3,
                  lg: 3,
                  xl: 6,
                  xxl: 6,
                }}
              >
                <Descriptions.Item label="商品ID">
                  <Tooltip title={productId}>
                    <p className={styles['order-id']}>
                      {productId.substring(0, 8)}...
                    </p>
                  </Tooltip>
                  <Button
                    size="small"
                    type="primary"
                    onClick={() => {
                      clipboard.writeText(productId).then(() => {
                        window.message.success('复制成功', 1);
                      });
                    }}
                  >
                    复制订单号
                  </Button>
                </Descriptions.Item>
                <Descriptions.Item label="商品主图">
                  <Image
                    src={img}
                    width={150}
                    className={styles['product-img']}
                  />
                </Descriptions.Item>
                <Descriptions.Item label="商品名称">{name}</Descriptions.Item>
                <Descriptions.Item label="商品单价">
                  {transferAmount(amount, 'yuan')} 元
                </Descriptions.Item>
                <Descriptions.Item label="购买数量">
                  X {buyQuantity}
                </Descriptions.Item>
                <Descriptions.Item label="商品总价">
                  {transferAmount(buyQuantity * amount, 'yuan')} 元
                </Descriptions.Item>
                <Descriptions.Item label="商品备注">{remark}</Descriptions.Item>
              </Descriptions>
            </Descriptions.Item>
          ),
        )}
      </Descriptions>

      {/* 发货modal */}
      <ShipModal
        cref={shipModalRef}
        courierName={data.deliveryInfo.name}
        courierCode={data.logisticsInfo?.courierCode || ''}
        courierNum={data.logisticsInfo?.courierNum || ''}
        shipModalConfirm={shipModalConfirm}
      />
    </div>
  );
};
export default OrderDetail;
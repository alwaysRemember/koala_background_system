import {
  Descriptions,
  Input,
  DatePicker,
  Slider,
  Select,
  Button,
  Switch,
  Table,
  Tag,
} from 'antd';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'umi';
import {
  EDefaultSelect,
  EDefaultSelectTransVal,
} from '../../components/SearchSelect/enums';
import {
  EOrderAmountSelectType,
  EOrderType,
  EOrderTypeTransferColor,
  EOrderTypeTransferVal,
} from './enum';
import styles from './index.less';
import moment from 'moment';
import SearchSelect, { IListItem } from '../../components/SearchSelect';
import { IGetDataParams, IGetOrderListRequest, IOrderItem } from './interface';
import { dateFormat, getTime, transferAmount } from '@/utils';
import { useGetUserList } from '@/hooks';
import { ISelectUserItem } from '@/hooks/interface';
import { getOrderList } from '@/api';
import { ColumnsType } from 'antd/lib/table';

const { RangePicker } = DatePicker;
const DEFAULT_VALUE = {
  string: '',
  number: 0,
  select: EDefaultSelect.ALL,
};

const OrderList = () => {
  const history = useHistory();
  // 用户列表
  const { isAdmin, userList } = useGetUserList();
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [totalSize, setTotalSize] = useState<number>(1);
  const [orderList, setOrderList] = useState<Array<IOrderItem>>([]);

  // 搜索框
  const [orderId, setOrderId] = useState<string>('');
  const [minOrderAmount, setMinOrderAmount] = useState<number>(0);
  const [maxOrderAmount, setMaxOrderAmount] = useState<number>(0);
  const [minOrderCreateDate, setMinOrderCreateDate] = useState<moment.Moment>(
    moment().subtract(30, 'days'),
  );
  const [maxOrderCreateDate, setMaxOrderCreateDate] = useState<moment.Moment>(
    moment(),
  );
  const [orderType, setOrderType] = useState<EOrderType | EDefaultSelect>(
    EDefaultSelect.ALL,
  );
  const [userId, setUserId] = useState<number | EDefaultSelect>(
    EDefaultSelect.ALL,
  );

  // 基础
  const [orderAmountSelectType, setOrderAmountSelectType] = useState<
    EOrderAmountSelectType
  >(EOrderAmountSelectType.HUNDRED); // 订单金额等级
  const [isSelectCreateDate, setIsSelectCreateDate] = useState<boolean>(false); // 是否启用下单时间搜索项

  const [tableLoading, setTableLoading] = useState<boolean>(false);

  const columns: ColumnsType<IOrderItem> = [
    {
      title: '订单ID',
      align: 'center',
      dataIndex: 'orderId',
      width: 140,
      fixed: 'left',
    },
    {
      title: '订单总金额',
      align: 'center',
      dataIndex: 'payAmount',
      width: 140,
      render: (value: number) => `${transferAmount(String(value), 'yuan')}元`,
    },
    {
      title: '订单状态',
      align: 'center',
      dataIndex: 'orderType',
      width: 140,
      render: (value: EOrderType) => (
        <Tag
          color={EOrderTypeTransferColor[value]}
          className={styles['order-type']}
        >
          {EOrderTypeTransferVal[value]}
        </Tag>
      ),
    },
    {
      title: '订单运费',
      align: 'center',
      dataIndex: 'orderShopping',
      width: 140,
      render: (value: number) => `${transferAmount(String(value), 'yuan')}元`,
    },
    {
      title: '订单创建时间',
      align: 'center',
      dataIndex: 'createTime',
      width: 140,
      render: (date: Date) => dateFormat(new Date(date), 'yy-mm-dd-hh-ii'),
    },
    {
      title: '订单修改时间',
      align: 'center',
      dataIndex: 'updateTime',
      width: 140,
      render: (date: Date) => dateFormat(new Date(date), 'yy-mm-dd-hh-ii'),
    },
    {
      title: '操作',
      align: 'center',
      width: 140,
      fixed: 'right',
      render: (_, record: IOrderItem) => (
        <Button
          type="primary"
          size="small"
          onClick={() => {
            history.push(`/server/orderDetail?orderId=${record.orderId}`);
          }}
        >
          查看详情
        </Button>
      ),
    },
  ];

  const submitClick = () => {
    getData(1);
  };

  /**
   * 重置搜索框并且请求
   */
  const resetClick = () => {
    _resetData();
    getData(1, {
      orderId: DEFAULT_VALUE.string,
      minOrderAmount: DEFAULT_VALUE.number,
      maxOrderAmount: DEFAULT_VALUE.number,
      minOrderCreateDate: DEFAULT_VALUE.string,
      maxOrderCreateDate: DEFAULT_VALUE.string,
      orderType: DEFAULT_VALUE.select,
      userId: DEFAULT_VALUE.select,
    });
  };

  /**
   * 请求数据
   * @param page 请求页数
   * @param data 强制请求的参数
   */
  const getData = async (page: number, data?: IGetDataParams) => {
    setTableLoading(true);
    let params: IGetOrderListRequest = {
      page,
      pageSize,
      orderId,
      minOrderAmount: transferAmount(minOrderAmount, 'fen') as number,
      maxOrderAmount: transferAmount(maxOrderAmount, 'fen') as number,
      minOrderCreateDate: isSelectCreateDate
        ? getTime('start', new Date(minOrderCreateDate.format()))
        : '',
      maxOrderCreateDate: isSelectCreateDate
        ? getTime('end', new Date(maxOrderCreateDate.format()))
        : '',
      orderType,
      userId,
    };
    // 替换的数据拼接
    if (data) {
      params = Object.assign<{}, IGetOrderListRequest, IGetDataParams>(
        {},
        params,
        data,
      );
    }
    try {
      const { total, list } = await getOrderList(params);
      setTotalSize(total);
      setOrderList(list);
    } catch (e) {}
    setTableLoading(false);
  };

  /**
   * 重置数据
   */
  const _resetData = () => {
    setOrderId(DEFAULT_VALUE.string);
    setMinOrderAmount(DEFAULT_VALUE.number);
    setMaxOrderAmount(DEFAULT_VALUE.number);
    setMinOrderCreateDate(moment().subtract(30, 'days'));
    setMaxOrderCreateDate(moment());
    setOrderType(DEFAULT_VALUE.select);
    setUserId(DEFAULT_VALUE.select);
    setIsSelectCreateDate(false);
  };

  /**
   * 根据订单金额等级设置滑动输入条的最大值
   */
  const _orderAmountSlideMaxNumber = (): number => {
    switch (orderAmountSelectType) {
      case EOrderAmountSelectType.HUNDRED:
        return 100;
      case EOrderAmountSelectType.THOUSAND:
        return 1000;
      case EOrderAmountSelectType.TEN_THOUSAND:
        return 10000;
      case EOrderAmountSelectType.ONE_HUNDRED_THOUSAND:
        return 100000;
    }
  };

  /**
   * 选择框数组转换
   * @param list
   * @param cb
   */
  const _transferSelectList = <T extends {}>(
    list: Array<T>,
    cb: (item: T) => IListItem,
  ): Array<IListItem> => {
    return [...Object.keys(EDefaultSelect)]
      .map((item: string | number) => ({
        key: item,
        value: EDefaultSelectTransVal[item as EDefaultSelect] as string,
      }))
      .concat(list.map((item: T) => cb(item)));
  };

  useEffect(() => {
    getData(1);
  }, [pageSize]);

  return (
    <div className={styles['order-list-wrapper']}>
      {/* 搜索 */}
      <div className={styles['search-wrapper']}>
        <Descriptions
          size="middle"
          column={{ xxl: 4, xl: 3, lg: 2, md: 2, sm: 1, xs: 1 }}
          layout="vertical"
        >
          <Descriptions.Item label="订单ID">
            <Input
              placeholder="用户的订单ID"
              value={orderId}
              onChange={e => setOrderId(e.target.value)}
            />
          </Descriptions.Item>
          <Descriptions.Item
            label={
              <span>
                下单时间&nbsp;
                <Switch
                  size="small"
                  checked={isSelectCreateDate}
                  onChange={value => setIsSelectCreateDate(value)}
                />
              </span>
            }
          >
            <RangePicker
              disabled={!isSelectCreateDate}
              value={[minOrderCreateDate, maxOrderCreateDate]}
              onChange={dates => {
                if (!dates) return;
                setMinOrderCreateDate(moment(dates[0]?.format()));
                setMaxOrderCreateDate(moment(dates[1]?.format()));
              }}
            />
          </Descriptions.Item>
          <Descriptions.Item label="订单状态">
            <SearchSelect<EOrderType>
              value={orderType}
              onChange={value => setOrderType(value)}
              list={_transferSelectList<EOrderType>(
                [...Object.values(EOrderType)],
                (item: EOrderType): IListItem => ({
                  key: item,
                  value: EOrderTypeTransferVal[item],
                }),
              )}
            />
          </Descriptions.Item>
          <Descriptions.Item
            label="订单金额"
            className={styles['amount-slider-wrapper']}
          >
            <span>金额等级:&nbsp;</span>
            <Select
              value={orderAmountSelectType}
              onChange={value => setOrderAmountSelectType(value)}
            >
              {[...Object.values(EOrderAmountSelectType)].map(value => (
                <Select.Option key={value} value={value}>
                  {value}
                </Select.Option>
              ))}
            </Select>
            <Slider
              range
              min={0}
              max={_orderAmountSlideMaxNumber()}
              value={[minOrderAmount, maxOrderAmount]}
              onChange={value => {
                if (!value || typeof value !== 'object') return;
                setMinOrderAmount(value[0]);
                setMaxOrderAmount(value[1]);
              }}
            />
            <span>
              {minOrderAmount.toFixed(2)}&nbsp; - &nbsp;{' '}
              {maxOrderAmount.toFixed(2)}
            </span>
          </Descriptions.Item>
          {isAdmin && (
            <Descriptions.Item label="商品归属人">
              <SearchSelect<number>
                value={userId}
                onChange={value => setUserId(value)}
                list={_transferSelectList<ISelectUserItem>(
                  userList,
                  (item: ISelectUserItem): IListItem => ({
                    key: item.userId,
                    value: item.username,
                  }),
                )}
              />
            </Descriptions.Item>
          )}
          <Descriptions.Item>
            <Button
              type="primary"
              className={styles['btn']}
              onClick={submitClick}
            >
              搜索
            </Button>
            <Button
              type="primary"
              className={styles['btn']}
              danger
              onClick={resetClick}
            >
              重置
            </Button>
          </Descriptions.Item>
        </Descriptions>
      </div>
      <Table
        columns={columns}
        dataSource={orderList}
        bordered
        loading={tableLoading}
        rowKey={(record: IOrderItem) => record.orderId}
        scroll={{
          x: 980,
        }}
        pagination={{
          current: page,
          pageSize: pageSize,
          hideOnSinglePage: true,
          total: totalSize,
          showSizeChanger: true,
          onChange: (page: number) => {
            setPage(page);
            getData(page);
          },
          onShowSizeChange: (_, pageSize) => setPageSize(pageSize),
        }}
      />
    </div>
  );
};

export default OrderList;

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Descriptions, Button, Input } from 'antd';
import styles from './index.less';
import CategoriesSelect from '@/components/CategoriesSelect';
import { EProductStatus, EProductStatusTransVal } from '@/enums/EProduct';
import { ISelectUserItem, IRequestProduct } from './interface';
import { getAllUserList, getProductList } from '@/api';
import { useMappedState } from 'redux-react-hook';
import { IUserDataResponse } from '../Login/interface';
import { EUserAuth } from '@/enums/UserAuthEnum';
import SearchSelect, { IListItem } from './components/SearchSelect';
import {
  EDefaultSelect,
  EDefaultSelectTransVal,
} from './components/SearchSelect/enums';
import SearchAmount from './components/SearchAmount';
import ProductsTable from '@/components/ProductsTable';
import {
  IProductItem,
  IProductsTableRef,
} from '@/components/ProductsTable/interface';

const ProductList = () => {
  const { userInfo }: { userInfo: IUserDataResponse } = useMappedState(
    useCallback(state => state, []),
  );

  const isAdmin: boolean = userInfo.userType === EUserAuth.ADMIN; // 是否为管理员

  // 搜索条件
  const [selectCategoriesId, setSelectCategoriesId] = useState<string>(
    EDefaultSelect.ALL,
  ); // 商品分类id
  const [productStatus, setProductStatus] = useState<
    EProductStatus | EDefaultSelect
  >(EDefaultSelect.ALL); // 商品状态
  const [userId, setUserId] = useState<number | EDefaultSelect>(
    EDefaultSelect.ALL,
  ); // 商品归属人
  const [minAmount, setMinAmount] = useState<string>('');
  const [maxAmount, setMaxAmount] = useState<string>('');
  const [productId, setProductId] = useState<string>('');

  // 用户列表
  const [userList, setUserList] = useState<Array<ISelectUserItem>>([]);

  // 分页数据
  const [total, setTotal] = useState<number>(1);
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [data, setData] = useState<Array<IProductItem>>([]);

  const productsTableRef = useRef<IProductsTableRef>();

  const getUserList = async () => {
    try {
      const list = await getAllUserList();
      setUserList(list);
    } catch (e) {}
  };

  /**
   * 请求表格数据
   * @param params 参数
   */
  const getData = async (params?: IRequestProduct) => {
    productsTableRef.current?.setLoading(true);
    params = params
      ? Object.assign({}, params, {
          pageSize,
        })
      : {
          categoriesId: selectCategoriesId,
          productStatus,
          userId,
          minAmount: Number(minAmount) ? _stringTransferNumber(minAmount) : 0,
          maxAmount: Number(maxAmount) ? _stringTransferNumber(maxAmount) : 0,
          page,
          pageSize,
          productId,
        };
    try {
      const { total, list } = await getProductList(params);
      setTotal(total);
      setData(list);
    } catch (e) {}
    productsTableRef.current?.setLoading(false);
  };

  const submitClick = () => {
    const { ALL } = EDefaultSelect;
    if (
      selectCategoriesId === ALL &&
      productStatus === ALL &&
      userId === ALL &&
      !minAmount &&
      !maxAmount &&
      !productId
    ) {
      window.message.warn('没有搜索条件');
      return;
    }
    // 非默认page只需要设置page就可以进行请求
    if (page !== 1) {
      setPage(1);
    } else {
      getData();
    }
  };

  const resetClick = () => {
    _resetData();
    if (page === 1) {
      getData({
        categoriesId: EDefaultSelect.ALL,
        productStatus: EDefaultSelect.ALL,
        userId: EDefaultSelect.ALL,
        minAmount: 0,
        maxAmount: 0,
        page: 1,
        pageSize,
        productId,
      });
    } else {
      setPage(1);
    }
  };

  /**
   * 最大价格输入框失焦事件
   */
  const maxAmountInputBlur = () => {
    _compareAmount('max').catch(() => {
      setMaxAmount('');
      window.message.error('最大金额小于最小金额');
    });
  };

  /**
   * 最小加个输入框失焦事件
   */
  const minAmountInputBlur = () => {
    _compareAmount('min').catch(() => {
      setMinAmount('');
      window.message.error('最小金额大于最大金额');
    });
  };

  /**
   * 金额输入框失焦条件判断
   * @param type
   */
  const _compareAmount = (type: 'max' | 'min'): Promise<null> => {
    const min = Number(minAmount) ? _stringTransferNumber(minAmount) : 0;
    const max = Number(maxAmount) ? _stringTransferNumber(maxAmount) : 0;
    return new Promise((res, rej) => {
      if (type === 'min') {
        if (min <= max || max === 0) {
          res();
        } else {
          rej();
        }
      } else {
        if (max >= min || min === 0) {
          res();
        } else {
          rej();
        }
      }
    });
  };

  const _resetData = () => {
    const { ALL } = EDefaultSelect;
    setSelectCategoriesId(ALL);
    setProductStatus(ALL);
    setUserId(ALL);
    setMinAmount('');
    setMaxAmount('');
    setProductId('');
  };

  /**
   *
   * @param amount
   */
  const _stringTransferNumber = (amount: string): number =>
    Number(amount.replace(/[\,|\.]/g, ''));

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
    isAdmin && getUserList();
  }, []);
  useEffect(() => {
    getData();
  }, [page]);

  useEffect(() => {
    if (page === 1 && pageSize !== 10) {
      getData();
    } else {
      setPage(1);
    }
  }, [pageSize]);

  return (
    <div className={styles['product-list-wrapper']}>
      <div className={styles['search-wrapper']}>
        <Descriptions
          size="middle"
          column={{ xxl: 4, xl: 3, lg: 2, md: 2, sm: 1, xs: 1 }}
          layout="vertical"
        >
          <Descriptions.Item label="商品分类">
            <CategoriesSelect
              isSearchSelect={true}
              selectIdChange={(id: string) => setSelectCategoriesId(id)}
            />
          </Descriptions.Item>
          <Descriptions.Item label="商品ID">
            <Input
              style={{ width: '200px' }}
              placeholder="请输入商品ID"
              value={productId}
              onChange={e => {
                setProductId(e.target.value);
              }}
            />
          </Descriptions.Item>
          <Descriptions.Item label="商品状态">
            <SearchSelect<EProductStatus>
              value={productStatus}
              onChange={value => setProductStatus(value)}
              list={_transferSelectList<EProductStatus>(
                [...Object.values(EProductStatus)],
                (item: EProductStatus): IListItem => ({
                  key: item,
                  value: EProductStatusTransVal[item],
                }),
              )}
            />
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
          <Descriptions.Item label="商品价格">
            <SearchAmount
              value={minAmount}
              onChange={value => setMinAmount(value)}
              onBlur={minAmountInputBlur}
            />
            &nbsp;-&nbsp;
            <SearchAmount
              value={maxAmount}
              onChange={value => setMaxAmount(value)}
              onBlur={maxAmountInputBlur}
            />
          </Descriptions.Item>
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
      {/* 表格 */}
      <ProductsTable
        tableData={data}
        total={total}
        page={page}
        pageSize={pageSize}
        pageChange={page => setPage(page)}
        pageSizeChange={pageSize => setPageSize(pageSize)}
        cref={productsTableRef}
        changeTable={getData}
      />
    </div>
  );
};

export default ProductList;

import React, {
  useState,
  useImperativeHandle,
  useCallback,
  useEffect,
} from 'react';
import { IProductItem, IProductsTable } from './interface';
import { Table, Popover, Button, Popconfirm } from 'antd';
import { transferAmount, dateFormat } from '@/utils';
import styles from './index.less';
import { useHistory } from 'umi';
import { EProductStatus, EProductStatusTransVal } from '@/enums/EProduct';
import { delProduct } from '@/api';
import { ColumnsType, ColumnType } from 'antd/lib/table';
const ProductsTable = ({
  pageChange,
  pageSize,
  pageSizeChange,
  columns = [],
  total,
  tableData,
  page,
  cref,
  changeTable,
}: IProductsTable) => {
  useImperativeHandle(cref, () => ({
    setLoading: loading => {
      setLoading(loading);
    },
  }));
  const history = useHistory();
  const [loading, setLoading] = useState<boolean>(true);

  const [tableColumns, setTableColumns] = useState<ColumnsType<IProductItem>>([
    {
      title: '商品主图',
      align: 'center',
      dataIndex: 'productMainImg',
      width: 140,
      render: (url: string) => (
        <img
          src={url}
          onClick={() => {
            const a = document.createElement('a');
            a.href = url;
            a.target = '_blank';
            a.click();
          }}
          className={styles['product-main-img']}
        />
      ),
    },
    {
      title: '商品名称',
      align: 'center',
      dataIndex: 'productName',
      width: 140,
    },
    {
      title: '商品状态',
      align: 'center',
      dataIndex: 'productStatus',
      width: 100,
      render: (status: EProductStatus) => EProductStatusTransVal[status],
    },
    {
      title: '所属用户',
      align: 'center',
      dataIndex: 'username',
      width: 140,
    },
    {
      title: '所属分类',
      align: 'center',
      dataIndex: 'categoriesName',
      width: 140,
    },
    {
      title: '商品金额',
      align: 'center',
      dataIndex: 'productAmount',
      width: 100,
      render: (value: number) => transferAmount(value),
    },
    {
      title: '商品简介',
      align: 'center',
      dataIndex: 'productBrief',
      width: 200,
      render: (value: string) => (
        <Popover
          content={<p className={styles['product-brief-hover']}>{value}</p>}
        >
          <p className={styles['product-brief']}>{value}</p>
        </Popover>
      ),
    },
    {
      title: '创建时间',
      align: 'center',
      dataIndex: 'createTime',
      width: 140,
      render: (date: Date) => dateFormat(new Date(date), 'yy-mm-dd-hh-ii'),
    },
    {
      title: '修改时间',
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
      render: (_, record) => (
        <div className={styles['operating']}>
          <Popconfirm
            title="确定删除此商品么?"
            onConfirm={async () => {
              setLoading(true);
              try {
                await delProduct({
                  productId: record.productId,
                });
                changeTable();
              } catch (e) {}
              setLoading(false);
            }}
            okText="确定"
            cancelText="取消"
          >
            <Button type="primary" danger size="small">
              删除
            </Button>
          </Popconfirm>
          <Button
            type="primary"
            size="small"
            onClick={() => {
              history.push(`/server/addProduct?productId=${record.productId}`);
            }}
          >
            编辑
          </Button>
        </div>
      ),
    },
  ]);
  useEffect(() => {
    /* title相同的columns使用传入的数据替换 */
    columns?.length &&
      setTableColumns(
        tableColumns.map(item => {
          let j: number = -1;
          columns.forEach((i, index) => {
            if (i.title === item.title) {
              j = index;
            }
          });
          return j != -1 ? columns[j] : item;
        }),
      );
  }, [columns]);
  return (
    <Table
      columns={tableColumns}
      dataSource={tableData}
      bordered
      loading={loading}
      rowKey={(record: IProductItem) => record.productId}
      scroll={{
        x: 1140,
      }}
      pagination={{
        current: page,
        pageSize: pageSize,
        hideOnSinglePage: true,
        total: total,
        showSizeChanger: true,
        onChange: (page: number) => {
          pageChange(page);
        },
        onShowSizeChange: (_, pageSize) => pageSizeChange(pageSize),
      }}
    />
  );
};

export default ProductsTable;

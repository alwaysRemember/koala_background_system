import React from 'react';
import { IProductItem, IProductsTable } from './interface';
import { Table, Popover, Button, Popconfirm } from 'antd';
import { transferAmount, dateFormat } from '@/utils';
import styles from './index.less';
import { useHistory } from 'umi';
const ProductsTable = ({
  pageChange,
  pageSize,
  pageSizeChange,
  columns = [],
  total,
  tableData,
  loading,
  page,
}: IProductsTable) => {
  const history = useHistory();
  columns = columns.concat([
    {
      title: '商品名称',
      align: 'center',
      dataIndex: 'productName',
      width: 140,
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
            onConfirm={() => {
              console.log('删除');
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
  return (
    <Table
      columns={columns}
      dataSource={tableData}
      bordered
      loading={loading}
      rowKey={(record: IProductItem) => record.productId}
      scroll={{
        x: 1000,
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

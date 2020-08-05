import React, { useState, useEffect } from 'react';
import { Table, Avatar } from 'antd';
import { IAppletUserItem } from './interface';
import { getAppletUsers } from '@/api';
import { ColumnsType } from 'antd/lib/table';
import { dateFormat } from '@/utils';

const AppletUsers = () => {
  const [data, setData] = useState<Array<IAppletUserItem>>([]);

  const [total, setTotal] = useState<number>(1);
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [loading, setLoading] = useState<boolean>(false);

  const columns: ColumnsType<IAppletUserItem> = [
    {
      title: '用户名',
      dataIndex: 'nickName',
      align: 'center',
      width: 200,
    },
    {
      title: '头像',
      dataIndex: 'avatarUrl',
      align: 'center',
      width: 100,
      render: (text: string) => <Avatar size="large" src={text} />,
    },
    {
      title: '手机号',
      dataIndex: 'phone',
      align: 'center',
      width: 200,
    },
    {
      title: '性别',
      dataIndex: 'gender',
      align: 'center',
      width: 100,
      render: (gender: number) =>
        gender === 1 ? '男' : gender === 2 ? '女' : '未知',
    },
    {
      title: '国家',
      dataIndex: 'country',
      align: 'center',
      width: 100,
    },
    {
      title: '省',
      dataIndex: 'province',
      align: 'center',
      width: 100,
    },
    {
      title: '详细地址',
      dataIndex: 'city',
      align: 'center',
      width: 200,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      align: 'center',
      width: 200,
      render: (date: Date) => dateFormat(new Date(date), 'yy-mm-dd-hh-ii'),
    },
    {
      title: '修改时间',
      dataIndex: 'updateTime',
      align: 'center',
      width: 200,
      render: (date: Date) => dateFormat(new Date(date), 'yy-mm-dd-hh-ii'),
    },
  ];

  const getData = async () => {
    setLoading(true);
    2;
    try {
      const { total, list } = await getAppletUsers({ page, pageSize });
      setTotal(total);
      setData(list);
      setLoading(false);
    } catch (e) {}
  };

  const pageSizeChange = (current: number, size: number) => {
    setPageSize(size);
  };

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
    <Table
      columns={columns}
      dataSource={data}
      bordered
      loading={loading}
      rowKey={(record: IAppletUserItem) => record.userId}
      scroll={{
        x: 1400,
      }}
      pagination={{
        current: page,
        pageSize: pageSize,
        hideOnSinglePage: true,
        total: total,
        showSizeChanger: true,
        onChange: (page: number) => {
          setPage(page);
        },
        onShowSizeChange: pageSizeChange,
      }}
    />
  );
};

export default AppletUsers;

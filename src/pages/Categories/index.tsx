import React, { useState, useEffect, useCallback } from 'react';
import { Table, Avatar, Input, Switch, Modal } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { ICategoriesItem, IUpdateCategories } from './interface';
import { dateFormat } from '@/utils';
import { getCategoriesData, updateCategories } from '@/api';

/**
 * 商品分类
 */
const Categories = () => {
  const [loading, setLoading] = useState(true);

  const [data, setData] = useState<Array<ICategoriesItem>>([]);
  const [dataClone, setDataClone] = useState<Array<ICategoriesItem>>([]);
  const [currentChangeData, setCurrentChangeData] = useState<ICategoriesItem>();

  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [total, setTotal] = useState<number>(1);

  const columns: ColumnsType<ICategoriesItem> = [
    {
      title: 'logo',
      align: 'center',
      dataIndex: 'categoriesIconUrl',
      width: 120,
      render: (text: string) => <Avatar size="large" src={text} />,
    },
    {
      title: '标签名',
      align: 'center',
      dataIndex: 'categoriesName',
      width: 200,
      render: (text: string, record: ICategoriesItem, index: number) => (
        <Input
          value={text}
          onChange={e => {
            e.persist();
            recordChange(e.target.value, index, 'categoriesName');
          }}
          onPressEnter={() => setCurrentChangeData(record)}
        />
      ),
    },
    {
      title: '使用状态',
      align: 'center',
      dataIndex: 'isUse',
      width: 200,
      render: (_: string, record: ICategoriesItem, index: number) => (
        <Switch
          checked={record.isUse}
          onChange={(checked: boolean) => recordChange(checked, index, 'isUse')}
        />
      ),
    },
    {
      title: '显示状态',
      align: 'center',
      dataIndex: 'isShowOnHome',
      width: 200,
      render: (_: string, record: ICategoriesItem, index: number) => (
        <Switch
          checked={record.isShowOnHome}
          onChange={(checked: boolean) =>
            recordChange(checked, index, 'isShowOnHome')
          }
        />
      ),
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      align: 'center',
      width: 200,
      render: (text: Date) => dateFormat(new Date(text), 'yy-mm-dd-hh-ii'),
    },
    {
      title: '修改时间',
      dataIndex: 'updateTime',
      align: 'center',
      width: 200,
      render: (text: Date) => dateFormat(new Date(text), 'yy-mm-dd-hh-ii'),
    },
  ];

  const getData = async () => {
    setLoading(true);
    try {
      const { total, list } = await getCategoriesData({ page, pageSize });
      setTotal(total);
      setData(list);
      setDataClone(list);
      setLoading(false);
    } catch (e) {}
  };

  /**
   * 一页显示数据条数切换
   * @param current
   * @param size
   */
  const pageSizeChange = (current: number, size: number) => {
    setPageSize(size);
  };

  /**
   * 数据改变
   * @param value
   * @param index
   * @param key
   */
  const recordChange = (
    value: string | boolean,
    index: number,
    key: 'categoriesName' | 'isUse' | 'isShowOnHome',
  ) => {
    let list: Array<ICategoriesItem> = JSON.parse(JSON.stringify(data));

    list[index][key] = value as never;
    setData(list);
    // 判断非input的情况
    key !== 'categoriesName' && setCurrentChangeData(list[index]);
  };

  /**
   * 重置修改的数据
   * @param id
   */
  const resetUpdateData = () => {
    const { id } = currentChangeData as ICategoriesItem;
    const currentDataInClone = dataClone.filter(
      (item: ICategoriesItem) => item.id === id,
    )[0];

    if (currentDataInClone) {
      setData(list =>
        list.map((item: ICategoriesItem) =>
          item.id === id ? currentDataInClone : item,
        ),
      );
    }
  };

  /**
   * 显示修改确认弹窗
   */
  const showConfirmChangeDataModal = () => {
    const {
      categoriesName,
      isUse,
      isShowOnHome,
    } = currentChangeData as ICategoriesItem;
    Modal.confirm({
      title: '确认',
      content: `是否修改标签名为 ${categoriesName} ,使用状态为 ${
        isUse ? '“使用”' : '“不使用”'
      },显示状态为 ${isShowOnHome ? '“显示”' : '“不显示”'}`,
      okText: '确认',
      cancelText: '取消',
      onCancel: () => {
        resetUpdateData();
      },
      onOk: async () => {
        try {
          await updateCategories({
            id: currentChangeData?.id,
            categoriesName: currentChangeData?.categoriesName,
            isShowOnHome: currentChangeData?.isShowOnHome,
            isUse: currentChangeData?.isUse,
          } as IUpdateCategories);
          await window.message['success']('修改成功', 1);
          getData();
        } catch (e) {
          resetUpdateData();
        }
      },
    });
  };

  useEffect(() => {
    currentChangeData && showConfirmChangeDataModal();
  }, [currentChangeData]);

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
      rowKey={(record: ICategoriesItem) => record.id}
      scroll={{
        x: 1120,
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

export default Categories;

import React, { useRef, useState, useEffect } from 'react';
import { Table, Input, Modal, Button, Popconfirm } from 'antd';
import { Base64 } from 'js-base64';
import styles from './index.less';
import Search from './components/Search';
import UserTypeSelect from './components/UserTypeSelect';
import { EUserAuthSelectList, EUserAuth } from '@/enums/UserAuthEnum';
import { getAdminUserList, updateAdminUser, deleteAdminUser } from '@/api';
import {
  IAdminUserListRequestDefaultParams,
  IAdminUserItem,
} from './interface';
import { ColumnsType } from 'antd/lib/table';
import { dateFormat } from '@/utils';

const AdminUserList = () => {
  const [page, setPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [data, setData] = useState<Array<IAdminUserItem>>([]);
  const [dataClone, setDataClone] = useState<Array<IAdminUserItem>>([]); // 用于数据改变后的撤回操作
  const [loading, setLoading] = useState<boolean>(true);

  const [currentChangeData, setCurrentChangeData] = useState<
    IAdminUserItem | undefined
  >(undefined); // 当前改变的数据

  const searchRef = useRef<any>();

  const columns: ColumnsType<IAdminUserItem> = [
    {
      title: '用户名',
      align: 'center',
      dataIndex: 'username',
      width: 140,
      fixed: 'left',
    },
    {
      title: '用户密码',
      dataIndex: 'password',
      align: 'center',
      width: 200,
      render: (text: string, record: IAdminUserItem, index: number) => {
        return (
          <Input.Password
            value={text}
            onChange={e => usernameSearchInputChange(e, index)}
            onPressEnter={() => usernameSearchPressEnter(record)}
          />
        );
      },
    },
    {
      title: '用户类型',
      dataIndex: 'userType',
      align: 'center',
      width: 150,
      render: (text: string, _, index: number) => {
        return (
          <UserTypeSelect
            value={text}
            onChange={(value: string) => userTypeSearchSelect(value, index)}
            data={Object.keys(EUserAuth).filter((key: string) =>
              Boolean(Number(key)),
            )}
          />
        );
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      align: 'center',
      width: 150,
      render: (text: Date) => dateFormat(new Date(text), 'yy-mm-dd-hh-ii'),
    },
    {
      title: '修改时间',
      dataIndex: 'updateTime',
      align: 'center',
      width: 150,
      render: (text: Date) => dateFormat(new Date(text), 'yy-mm-dd-hh-ii'),
    },
    {
      title: '操作',
      key: 'action',
      align: 'center',
      width: 150,
      render: (_, { userId }: IAdminUserItem) => (
        <Popconfirm
          title="是否确认删除？"
          okText="确认"
          cancelText="取消"
          onConfirm={() => tableDeleteAdminUser(userId)}
        >
          <Button danger type="primary" size="small">
            删除
          </Button>
        </Popconfirm>
      ),
    },
  ];

  /**
   * 获取数据
   * @param params
   */
  const getData = async (params?: IAdminUserListRequestDefaultParams) => {
    setLoading(true);
    const searchInfo: IAdminUserListRequestDefaultParams = searchRef.current.getSearchData();
    try {
      const { list, total } = await getAdminUserList({
        username:
          params?.username !== undefined
            ? params.username
            : searchInfo.username,
        userType: params?.userType ? params.userType : searchInfo.userType,
        page,
        number: pageSize,
      });

      setTotal(total);

      const d = list.map((item: IAdminUserItem) => {
        item.password = Base64.decode(item.password as string);
        return item;
      });

      setData(d);
      setDataClone(d);
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };

  /**
   * 搜索操作
   * @param username
   * @param userType
   */
  const search = (username: string, userType: EUserAuthSelectList) => {
    if (page === 1) {
      getData({ username, userType });
    } else {
      setPage(1);
    }
  };

  /**
   * 重置操作
   * @param username
   * @param userType
   */
  const reset = (username: string, userType: EUserAuthSelectList) => {
    if (page === 1) {
      getData({ username, userType });
    } else {
      setPage(1);
    }
  };

  const pageSizeChange = (current: number, size: number) => {
    setPageSize(size);
  };

  const resetUpdateData = (userId: number) => {
    // 从copy的数组中拿出当前修改的源数据
    const currentDataInClone = dataClone.filter(
      (item: IAdminUserItem) => item.userId === userId,
    )[0];

    if (currentDataInClone) {
      // 修改当前的数据
      setData(list =>
        list.map((item: IAdminUserItem) =>
          item.userId === userId ? currentDataInClone : item,
        ),
      );
    }
  };

  /**
   * 确认修改用户数据弹窗
   */
  const showConfirmChangeDataModal = () => {
    const {
      userId,
      username,
      password,
      userType,
    } = currentChangeData as IAdminUserItem;
    Modal.confirm({
      title: '确认',
      content: `是否确认修改用户名为: ${username}的用户, 密码为: ${password}, 用户类型为: ${EUserAuth[userType]}?`,
      okText: '确认',
      cancelText: '取消',
      onCancel: () => {
        resetUpdateData(userId);
      },
      onOk: async () => {
        try {
          await updateAdminUser({
            userId,
            username,
            password: Base64.encode(currentChangeData?.password as string),
            userType,
          });
          await window.message['success']('修改成功', 1);
          getData();
        } catch (e) {
          resetUpdateData(userId);
        }
      },
    });
  };

  /**
   * 用户名搜索框输入
   * @param e
   * @param index 当前行下标
   */
  const usernameSearchInputChange = (e: any, index: number) => {
    e.persist();
    let list = JSON.parse(JSON.stringify(data));
    list[index].password = e.target.value;
    setData(list);
  };

  /**
   * 用户名搜索框enter
   * @param record
   */
  const usernameSearchPressEnter = (record: IAdminUserItem) => {
    const { userType, password }: IAdminUserItem = dataClone.filter(
      (item: IAdminUserItem) => item.userId === record.userId,
    )[0];
    // 判断数据是否修改了
    if (userType === record.userType && password === record.password) return;
    setCurrentChangeData(record);
  };

  /**
   * 用户类型搜索
   * @param value
   * @param index
   */
  const userTypeSearchSelect = (value: string, index: number) => {
    let list = JSON.parse(JSON.stringify(data));
    list[index].userType = value;
    setData(list);
    setCurrentChangeData(list[index]);
  };

  /**
   * 删除用户事件
   * @param userId
   */
  const tableDeleteAdminUser = async (userId: number) => {
    try {
      setLoading(true);
      await deleteAdminUser({ userId });
      await window.message['success']('删除成功', 1);
      getData();
    } catch (e) {
      setLoading(false);
    }
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

  useEffect(() => {
    if (currentChangeData) {
      showConfirmChangeDataModal();
    }
  }, [currentChangeData]);

  return (
    <div className={styles['user-list-wrapper']}>
      <Search resetFn={reset} searchFn={search} cref={searchRef} />
      <div className={styles['table']}>
        <Table
          columns={columns}
          dataSource={data}
          bordered
          loading={loading}
          rowKey={(record: IAdminUserItem) => record.userId}
          scroll={{
            x: 600,
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
      </div>
    </div>
  );
};

export default AdminUserList;

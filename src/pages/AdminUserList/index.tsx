import React, { useRef, useState, useEffect, ReactNode } from 'react';
import { Table, Input, Modal, Button, Popconfirm } from 'antd';
import { Base64 } from 'js-base64';
import styles from './index.less';
import Search from './components/Search';
import UserTypeSelect from './components/UserTypeSelect';
import { EUserAuthSelectList, EUserAuth } from '@/enums/UserAuthEnum';
import {
  getAdminUserList,
  updateAdminUser,
  deleteAdminUser,
  bindAppletUser,
} from '@/api';
import {
  IAdminUserListRequestDefaultParams,
  IAdminUserItem,
  IEditableCellProps,
} from './interface';
import { ColumnsType, ColumnType } from 'antd/lib/table';
import { dateFormat, checkPassword, checkEmail } from '@/utils';
import BindAppletUserModal from './components/BindAppletUserModal';
import { IBindAppletUserModalRef } from './components/BindAppletUserModal/interface';

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

  const [currentUserId, setCurrentUserId] = useState<number>();

  const searchRef = useRef<any>();
  const bindAppletUserModalRef = useRef<IBindAppletUserModalRef>();

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
    },
    {
      title: '用户类型',
      dataIndex: 'userType',
      align: 'center',
      width: 150,
      render: (text: EUserAuth, _, index: number) => {
        return (
          <UserTypeSelect
            value={text}
            onChange={(value: string) => userTypeSelectChange(value, index)}
            data={Object.keys(EUserAuth).filter((key: string) =>
              Boolean(Number(key)),
            )}
          />
        );
      },
    },
    {
      title: '用户联系邮箱',
      dataIndex: 'email',
      align: 'center',
      width: 200,
    },
    {
      title: '小程序用户名',
      dataIndex: 'appletUserName',
      align: 'center',
      width: 200,
    },
    {
      title: '小程序用户手机号',
      dataIndex: 'appletUserPhone',
      align: 'center',
      width: 200,
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
        <>
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
          <Button
            type="primary"
            size="small"
            style={{ marginTop: '6px' }}
            onClick={() => {
              bindAppletUserModalRef.current?.setVisiable(true);
              setCurrentUserId(userId);
            }}
          >
            绑定小程序
          </Button>
        </>
      ),
    },
  ];

  /**
   * 定义可编辑的表格数据
   * @param param0
   */
  const EditableCell: React.FC<IEditableCellProps> = ({
    editable,
    record,
    dataIndex,
    children,
    className,
    style,
    index,
  }) => {
    let node: ReactNode;
    let value: string;
    switch (dataIndex) {
      case 'password':
        value = record.password as string;
        break;
      case 'email':
        value = record.email;
        break;
      default:
        value = '';
    }

    const [inputValue, setInputValue] = useState<string>(value);

    const save = () => {
      const item = JSON.parse(JSON.stringify(record));
      item[dataIndex] = inputValue;
      const list = JSON.parse(JSON.stringify(data));
      list[index] = item;
      setData(list);
      listItemInputPressEnter(item);
    };

    if (editable) {
      switch (dataIndex) {
        case 'password':
          node = (
            <Input.Password
              value={inputValue}
              onChange={e => {
                e.persist();
                setInputValue(e.target.value);
              }}
              onPressEnter={save}
              onBlur={save}
            />
          );
          break;
        case 'email':
          node = (
            <Input
              type="email"
              value={inputValue}
              onChange={e => {
                e.persist();
                setInputValue(e.target.value);
              }}
              onPressEnter={save}
              onBlur={save}
            />
          );
          break;
        default:
          node = 'Unknown data';
      }
    } else {
      node = children;
    }

    return (
      <td className={className} style={style}>
        {node}
      </td>
    );
  };

  const components = {
    body: {
      cell: EditableCell,
    },
  };

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
      email,
    } = currentChangeData as IAdminUserItem;

    // 校验邮箱格式/密码是否正确
    if (!checkPassword(password as string)) {
      window.message['error']('用户密码格式不正确', 1);
      return;
    }
    if (!checkEmail(email)) {
      window.message['error']('用户邮箱格式不正确', 1);
      return;
    }

    Modal.confirm({
      title: '确认',
      content: `是否确认修改用户名为: ${username}的用户, 密码为: ${password}, 用户类型为: ${EUserAuth[userType]}, 用户邮箱为: ${email} ?`,
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
            email,
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
   * 表格中输入框enter
   * @param record
   */
  const listItemInputPressEnter = (record: IAdminUserItem) => {
    const { userType, password, email }: IAdminUserItem = dataClone.filter(
      (item: IAdminUserItem) => item.userId === record.userId,
    )[0];
    // 判断数据是否修改了
    if (
      userType === record.userType &&
      password === record.password &&
      email === record.email
    )
      return;
    setCurrentChangeData(record);
  };

  /**
   * 用户类型搜索
   * @param value
   * @param index
   */
  const userTypeSelectChange = (value: string, index: number) => {
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

  /**
   * 管理员用户绑定小程序用户
   */
  const bindAppletUserModalSubmit = async () => {
    bindAppletUserModalRef.current?.setLoading(true);
    try {
      await bindAppletUser({
        userId: currentUserId as number,
        appletUserId: bindAppletUserModalRef.current?.getAppletUserId() as number,
      });
      window.message.success('关联成功');
    } catch (e) {}
    bindAppletUserModalRef.current?.setVisiable(false);
    bindAppletUserModalRef.current?.setLoading(false);
    setCurrentUserId(undefined);
    getData();
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

  const renderColumns = columns.map(item => {
    const key = (item as ColumnType<IAdminUserItem>).dataIndex;
    if (key === 'password' || key === 'email') {
      return {
        ...item,
        onCell: (record: ColumnType<IAdminUserItem>, index: number) => ({
          editable: true,
          dataIndex: key,
          record,
          index,
        }),
      };
    }
    return item;
  });

  return (
    <div className={styles['user-list-wrapper']}>
      <Search resetFn={reset} searchFn={search} cref={searchRef} />
      <div className={styles['table']}>
        <Table
          components={components}
          columns={renderColumns as ColumnsType<IAdminUserItem>}
          dataSource={data}
          bordered
          loading={loading}
          rowKey={(record: IAdminUserItem) => record.userId}
          scroll={{
            x: 1200,
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
      <BindAppletUserModal
        cref={bindAppletUserModalRef}
        bindAppletUserModalSubmit={bindAppletUserModalSubmit}
      />
    </div>
  );
};

export default AdminUserList;

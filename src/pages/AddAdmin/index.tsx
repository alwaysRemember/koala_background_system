import React, { useState, useEffect } from 'react';
import { Input, Select, Button, Tooltip } from 'antd';
import { Base64 } from 'js-base64';
import styles from './index.less';
import { IAddAdminData } from './interface';
import { EUserAuth } from '@/enums/UserAuthEnum';
import { addUser } from '@/api';
import { checkPassword, checkUserName } from '@/utils';
import SelectAppletUser from './components/SelectAppletUser';

const { Option } = Select;

const AddAdmin = () => {
  const [data, setData] = useState<IAddAdminData>({
    username: '',
    password: '',
    email: '',
    userType: EUserAuth.PROXY,
    appletUserId: undefined,
  });

  const [btnLoading, setBtnLoading] = useState<boolean>(false); // 按钮loading状态
  const [btnDisabled, setBtnDisabled] = useState<boolean>(false); // 登录是否失效

  /**
   * 监听输入框
   * @param key  输入框类型
   * @param e
   */
  const onChange = (key: 'username' | 'password' | 'email', e: any) => {
    e.persist();
    const { value } = e.target;
    setData(prev =>
      Object.assign({}, prev, {
        [key]:
          key === 'username' ? value.replace(/[\u4e00-\u9fa5]/g, '') : value,
      }),
    );
  };

  const submit = async () => {
    setBtnLoading(true);
    try {
      await addUser(
        Object.assign({}, data, {
          password: Base64.encode(data.password as string),
        }),
      );
      setBtnLoading(false);
      window.message.success('添加用户成功');
      setData({
        username: '',
        password: '',
        email: '',
        userType: EUserAuth.PROXY,
        appletUserId: undefined,
      });
    } catch (e) {
      setBtnLoading(false);
    }
  };

  useEffect(() => {
    setBtnDisabled(
      !(checkPassword(data.password as string) && checkUserName(data.username)),
    );
  }, [data]);

  return (
    <div className={styles['add-admin-wrapper']}>
      <div className={styles['add-admin-item']}>
        <div>
          <p className={styles['label']}>用户名</p>
          <Tooltip placement="top" title="用户名不支持中文以及特殊符号">
            <Input
              size="small"
              value={data.username}
              disabled={btnLoading}
              className={styles['input']}
              onChange={e => onChange('username', e)}
              placeholder="请输入用户名"
            />
          </Tooltip>
        </div>
      </div>
      <div className={styles['add-admin-item']}>
        <div>
          <p className={styles['label']}>密码</p>
          <Tooltip placement="top" title="请输入6-16位数字或英文的密码">
            <Input
              size="small"
              value={data.password}
              disabled={btnLoading}
              className={styles['input']}
              onChange={e => onChange('password', e)}
              placeholder="请输入密码"
            />
          </Tooltip>
        </div>
      </div>
      <div className={styles['add-admin-item']}>
        <div>
          <p className={styles['label']}>邮箱</p>
          <Tooltip placement="top" title="请输入常用的邮箱">
            <Input
              size="small"
              value={data.email}
              type="email"
              disabled={btnLoading}
              className={styles['input']}
              onChange={e => onChange('email', e)}
              placeholder="请输入用户名"
            />
          </Tooltip>
        </div>
      </div>
      <div className={styles['add-admin-item']}>
        <div>
          <p className={styles['label']}>权限</p>
          <Select
            value={(data.userType as unknown) as string}
            onChange={(value: string) => {
              setData(prev =>
                Object.assign({}, prev, {
                  userType: Number(value),
                }),
              );
            }}
            className={styles['select']}
            disabled={btnLoading}
          >
            {Object.keys(EUserAuth)
              .filter((key: string) => Boolean(Number(key)))
              .map((key: string) => {
                const label: number = Number(key);
                return (
                  <Option value={label} key={key}>
                    {EUserAuth[label]}
                  </Option>
                );
              })}
          </Select>
        </div>
      </div>
      <div className={styles['add-admin-item']}>
        <div>
          <p className={styles['label']}>绑定小程序</p>
          <div className={styles['input']}>
            <SelectAppletUser
              setAppletUserId={id => {
                setData(prev =>
                  Object.assign({}, prev, {
                    appletUserId: id,
                  }),
                );
              }}
            />
          </div>
        </div>
      </div>
      <Button
        disabled={btnDisabled}
        size="large"
        type="primary"
        loading={btnLoading}
        className={styles['submit']}
        onClick={submit}
      >
        创建用户
      </Button>
    </div>
  );
};

export default AddAdmin;

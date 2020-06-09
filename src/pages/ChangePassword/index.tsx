import React, { useCallback, useState, useEffect } from 'react';
import { Input, Button } from 'antd';
import { Base64 } from 'js-base64';
import styles from './index.less';
import { useMappedState } from 'redux-react-hook';
import { IUserDataResponse } from '../Login/interface';
import { IRequestData } from './interface';
import { changeUserPassword } from '@/api';
const ChangePassword = () => {
  const { userInfo }: { userInfo: IUserDataResponse } = useMappedState(
    useCallback(state => state, []),
  );

  const [btnLoading, setBtnLoading] = useState<boolean>(false); // 按钮loading状态
  const [btnDisabled, setBtnDisabled] = useState<boolean>(false); // 登录是否失效

  const [data, setData] = useState<IRequestData>({
    username: userInfo.username,
    oldPassword: '',
    newPassword: '',
  });

  const inputChange = (key: 'oldPassword' | 'newPassword', e: any) => {
    e.persist();
    setData(prev =>
      Object.assign({}, prev, {
        [key]: e.target.value,
      }),
    );
  };

  const submit = async () => {
    if (
      !/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/.test(
        data.oldPassword as string,
      )
    ) {
      window.message.warning('旧密码格式错误，格式为6-16位数数字、字母混合');
      return;
    }
    if (
      !/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/.test(
        data.newPassword as string,
      )
    ) {
      window.message.warning('新密码格式错误，格式为6-16位数数字、字母混合');
      return;
    }
    setBtnLoading(true);

    try {
      await changeUserPassword(
        Object.assign<object, IRequestData, IRequestData>({}, data, {
          oldPassword: Base64.encode(data.oldPassword as string),
          newPassword: Base64.encode(data.newPassword as string),
        }),
      );
      setBtnLoading(false);
      window.message.success('修改成功');
    } catch (e) {
      setBtnLoading(false);
    }
  };

  useEffect(() => {
    setBtnDisabled(
      !(
        /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/.test(
          data.newPassword as string,
        ) &&
        /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/.test(
          data.oldPassword as string,
        )
      ),
    );
  }, [data]);

  return (
    <ul className={styles['change-password-wrapper']}>
      <li>
        <span className={styles['label']}>用户名</span>
        <Input
          size="small"
          value={userInfo.username}
          disabled
          className={styles['input']}
        />
      </li>
      <li>
        <span className={styles['label']}>旧密码</span>
        <Input
          size="small"
          value={data.oldPassword}
          placeholder="请输入当前的密码"
          className={styles['input']}
          onPressEnter={submit}
          onChange={e => {
            inputChange('oldPassword', e);
          }}
        />
      </li>
      <li>
        <span className={styles['label']}>新密码</span>
        <Input
          size="small"
          value={data.newPassword}
          placeholder="请输入新的密码"
          className={styles['input']}
          onPressEnter={submit}
          onChange={e => {
            inputChange('newPassword', e);
          }}
        />
      </li>
      <li>
        <Button
          disabled={btnDisabled}
          size="large"
          type="primary"
          loading={btnLoading}
          className={styles['submit']}
          onClick={submit}
        >
          登录
        </Button>
      </li>
    </ul>
  );
};

export default ChangePassword;

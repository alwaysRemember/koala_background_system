import React, { useState, ChangeEventHandler, useEffect } from 'react';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { history } from 'umi';
import { Base64 } from 'js-base64';
import { Row, Col, Input, Button } from 'antd';
import styles from './index.less';
import { IUserData, IUserDataResponse } from './interface';
import { userLogin } from '@/api';
import { useDispatch } from 'redux-react-hook';
import { updateUserInfo } from '@/store/actions';
import { checkPassword, checkUserName } from '@/utils';

/**
 * 登录
 */
const Login = () => {
  const [btnLoading, setBtnLoading] = useState<boolean>(false); // 按钮loading状态
  const [btnDisabled, setBtnDisabled] = useState<boolean>(false); // 登录是否失效

  const dispatch = useDispatch();

  const [userData, setUserData] = useState<IUserData>({
    username: '',
    password: '',
  });

  /**
   * 监听输入框
   * @param key  输入框类型
   * @param e
   */
  const onChange = (key: 'username' | 'password', e: any) => {
    e.persist();
    const { value } = e.target;
    setUserData(prev =>
      Object.assign({}, prev, {
        [key]:
          key === 'username' ? value.replace(/[\u4e00-\u9fa5]/g, '') : value,
      }),
    );
  };

  /**
   * 数据提交
   */
  const submit = async () => {
    // 校验用户名
    if (!userData.username) {
      window.message.warning('请输入用户名');
      return;
    }

    // 校验密码
    if (!checkPassword(userData.password as string)) {
      window.message.warning('请输入正确的密码，格式为6-16位数数字、字母混合');
      return;
    }

    setBtnLoading(true);
    try {
      const data: IUserDataResponse = await userLogin({
        username: userData.username,
        password: Base64.encode(userData.password as string),
      });
      setBtnLoading(false);
      dispatch(updateUserInfo(data));
      history.replace('/server');
    } catch (e) {
      setBtnLoading(false);
    }
  };

  // 设置按钮是否可点
  useEffect(() => {
    setBtnDisabled(
      !(
        checkUserName(userData.username) &&
        checkPassword(userData.password as string)
      ),
    );
  }, [userData]);

  return (
    <div className={styles['login-wrapper']}>
      <Row className={styles['login-con']}>
        <Col xxl={6} xl={8} lg={10} md={14} sm={16} xs={22}>
          <div className={styles['login']}>
            <h1 className={styles['login-title']}>KOALA后台管理系统</h1>
            <div className={styles['login-input-wrapper']}>
              <Input
                disabled={btnLoading}
                className={styles['input']}
                size="large"
                placeholder="请输入您的用户名"
                value={userData.username}
                prefix={<UserOutlined />}
                onPressEnter={submit}
                onChange={e => onChange('username', e)}
              />
              <Input.Password
                disabled={btnLoading}
                className={styles['input']}
                size="large"
                value={userData.password}
                placeholder="请输入您的密码"
                prefix={<LockOutlined />}
                onPressEnter={submit}
                onChange={e => onChange('password', e)}
              />
            </div>
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
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Login;

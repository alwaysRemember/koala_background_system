import React, { useState, ChangeEventHandler } from 'react';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Row, Col, Input, Button } from 'antd';
import styles from './index.less';
import { IUserData } from './interface';

/**
 * 登录
 */
const Login = () => {
  const [btnLoading, setBtnLoading] = useState<boolean>(false); // 按钮loading状态

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
    setUserData(prev =>
      Object.assign({}, prev, {
        [key]: e.target.value,
      }),
    );
  };

  /**
   * 数据提交
   */
  const submit = () => {
    setBtnLoading(true);
  };

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
                onChange={e => onChange('username', e)}
              />
              <Input.Password
                disabled={btnLoading}
                className={styles['input']}
                size="large"
                value={userData.password}
                placeholder="请输入您的密码"
                prefix={<LockOutlined />}
                onChange={e => onChange('password', e)}
              />
            </div>
            <Button
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

import React, { useState, ReactNode, useEffect } from 'react';
import { Select, Tooltip, Tag, Spin } from 'antd';
import { IAppletUserItem } from '../../interface';
import { getAppletUserForPhone } from '@/api';
import styles from './index.less';

const SelectAppletUser = ({
  setAppletUserId,
}: {
  setAppletUserId: (id: number) => void;
}) => {
  const [value, setValue] = useState<number>();
  const [list, setList] = useState<Array<IAppletUserItem>>([]);
  const [loading, setLoading] = useState<boolean>(false);
  let timer: NodeJS.Timeout;

  const search = (value: string) => {
    timer && clearTimeout(timer);
    timer = setTimeout(() => {
      getData(value);
    }, 500);
  };
  const change = (value: string) => {
    console.log(value);
    setValue(Number(value));
  };

  const getData = async (phone: string) => {
    if (!phone) return;
    setLoading(true);
    try {
      const list = await getAppletUserForPhone({ phone });
      setList(list);
    } catch (e) {}
    setLoading(false);
  };

  useEffect(() => {
    value !== undefined && setAppletUserId(value);
  }, [value]);

  return (
    <Tooltip placement="top" title="请输入手机号搜索当前代理对应的小程序账号">
      <Select
        style={{ width: '100%' }}
        showSearch
        value={(value as unknown) as string}
        defaultActiveFirstOption={false}
        showArrow={false}
        filterOption={false}
        onSearch={search}
        onChange={change}
        notFoundContent={loading ? <Spin size="small" /> : '暂无数据'}
      >
        {list.map(item => (
          <Select.Option key={item.userId} value={item.userId}>
            <div className={styles['select-item']}>
              <p>{item.nickName}</p>
              <p>{item.phone}</p>
            </div>
          </Select.Option>
        ))}
      </Select>
    </Tooltip>
  );
};

export default SelectAppletUser;

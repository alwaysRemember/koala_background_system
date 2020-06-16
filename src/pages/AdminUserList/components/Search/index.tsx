import React, { useState, useImperativeHandle } from 'react';
import styles from './index.less';
import { Input, Select, Button } from 'antd';
import { EUserAuthSelectList } from '@/enums/UserAuthEnum';
import { ISearch } from './interface';
import { IAdminUserListRequestDefaultParams } from '../../interface';

const { Option } = Select;
const Search = ({ searchFn, resetFn, cref }: ISearch) => {
  useImperativeHandle(cref, () => ({
    getSearchData: (): IAdminUserListRequestDefaultParams => {
      return {
        username,
        userType,
      };
    },
  }));

  const [username, setUsername] = useState<string>('');
  const [userType, setUserType] = useState<EUserAuthSelectList>(
    EUserAuthSelectList.ALL,
  );

  const reset = () => {
    username && setUsername('');
    userType !== EUserAuthSelectList.ALL &&
      setUserType(EUserAuthSelectList.ALL);
    resetFn('', EUserAuthSelectList.ALL);
  };

  const search = () => {
    if (!username && userType === EUserAuthSelectList.ALL) {
      window.message.warning('请输入搜索项');
      return;
    }
    searchFn(username, userType);
  };

  return (
    <div className={styles['search-wrapper']}>
      <div className={styles['search-item']}>
        <span className={styles['label']}>用户名</span>
        <Input
          className={styles['value']}
          placeholder="请输入用户名"
          value={username}
          onChange={e => {
            e.persist();
            setUsername(e.target.value);
          }}
        />
      </div>
      <div className={styles['search-item']}>
        <span className={styles['label']}>用户权限</span>
        <Select
          value={(userType as unknown) as string}
          className={styles['value']}
          onChange={(value: string) => {
            setUserType(Number(value));
          }}
        >
          {Object.keys(EUserAuthSelectList)
            .filter((key: string) => Boolean(Number(key)))
            .map((key: string) => {
              const label: number = Number(key);
              return (
                <Option value={label} key={key}>
                  {EUserAuthSelectList[label]}
                </Option>
              );
            })}
        </Select>
      </div>
      <div className={styles['search-item']}>
        <Button className={styles['btn']} type="primary" onClick={search}>
          搜索
        </Button>
        <Button className={styles['btn']} danger type="primary" onClick={reset}>
          重置
        </Button>
      </div>
    </div>
  );
};

export default Search;

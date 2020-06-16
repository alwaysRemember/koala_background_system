import React from 'react';
import { Select } from 'antd';
import { EUserAuth } from '@/enums/UserAuthEnum';

export default ({
  value,
  data,
  onChange,
}: {
  value: string;
  data: Array<any>;
  onChange: (value: string) => void;
}) => (
  <Select value={value} onChange={onChange}>
    {data.map((key: string) => {
      const label: number = Number(key);
      return (
        <Select.Option value={label} key={key}>
          {EUserAuth[label]}
        </Select.Option>
      );
    })}
  </Select>
);

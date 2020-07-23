import React from 'react';
import { Select } from 'antd';
import { EDefaultSelect } from './enums';

export interface IListItem {
  key: string | number;
  value: string;
}

const SearchSelect = <T extends {}>({
  value,
  onChange,
  list,
}: {
  value: T | EDefaultSelect;
  onChange: (value: T | EDefaultSelect) => void;
  list: Array<IListItem>;
}) => {
  return (
    <Select
      style={{ width: 200 }}
      value={value as string | number}
      onChange={value => onChange(value as T | EDefaultSelect)}
    >
      {list.map((item: IListItem) => (
        <Select.Option key={item.key} value={item.key}>
          {item.value}
        </Select.Option>
      ))}
    </Select>
  );
};
export default SearchSelect;

import React, { ReactElement } from 'react';
import { InputNumber } from 'antd';

const SearchAmount: (params: {
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
}) => ReactElement = ({ value, onChange, onBlur }) => {
  return (
    <InputNumber
      style={{
        width: 120,
      }}
      min={0}
      value={(value as unknown) as number}
      formatter={value =>
        (value as string).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      }
      parser={value => (value as string).replace(/\$\s?|(,*)/g, '')}
      onChange={value => onChange(Number(value).toFixed(2))}
      onFocus={() => onChange('')}
      onBlur={onBlur}
    />
  );
};

export default SearchAmount;

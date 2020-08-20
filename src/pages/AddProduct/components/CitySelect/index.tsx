import React from 'react';
import cityData from '../../../../common/json/city.json';
import { Cascader } from 'antd';
import { CascaderOptionType, CascaderValueType } from 'antd/lib/cascader';

/**
 * 城市选择器
 * @param param0
 */
const CitySelect = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (
    value: CascaderValueType,
    selectOptions: Array<CascaderOptionType> | undefined,
  ) => void;
}) => {
  return (
    <Cascader
      options={cityData.data}
      value={value.split(',')}
      onChange={onChange}
    />
  );
};

export default CitySelect;

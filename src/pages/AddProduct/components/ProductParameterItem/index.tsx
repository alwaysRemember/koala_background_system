import React, { useState } from 'react';
import { IProductParameterRenderItem } from '../../interface';
import styles from './index.less';
import { Descriptions, Input } from 'antd';
const ProductParameterItem = ({
  index,
  value,
  label,
  onChange,
}: IProductParameterRenderItem) => {
  const [inputKey, setKey] = useState<string>(label);
  const [inputValue, setValue] = useState<string>(value);

  const blur = () => {
    onChange({ key: inputKey, value: inputValue }, index);
  };
  return (
    <div className={styles['product-parameter-item']}>
      <Descriptions bordered size="small" column={1}>
        <Descriptions.Item label="LABEL">
          <Input
            value={inputKey}
            onChange={e => {
              setKey(e.target.value);
            }}
            onBlur={() => {
              if (!inputKey) {
                window.message.error('请输入产品参数标题！');
                return;
              }
              blur();
            }}
          />
        </Descriptions.Item>
        <Descriptions.Item label="VALUE">
          <Input.TextArea
            value={inputValue}
            rows={3}
            onChange={e => {
              setValue(e.target.value);
            }}
            onBlur={() => {
              if (!inputKey) {
                window.message.error('请输入产品参数内容！');
                return;
              }
              blur();
            }}
          />
        </Descriptions.Item>
      </Descriptions>
    </div>
  );
};

export default ProductParameterItem;

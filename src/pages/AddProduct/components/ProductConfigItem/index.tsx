import React, { useState, useEffect } from 'react';
import { IProductConfigItem } from './interface';
import styles from './index.less';
import { Descriptions, Input, InputNumber, Button, Tooltip } from 'antd';
import { DeleteOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { IProductConfig } from '../../interface';

const ProductConfigChildren = ({
  data,
  index,
  onBlur,
  removeProductConfigChildren,
}: {
  data: IProductConfig;
  index: number;
  onBlur: (data: IProductConfig, index: number) => void;
  removeProductConfigChildren: (index: number) => void;
}) => {
  const [name, setName] = useState<string>(data.name);
  const [amount, setAmount] = useState<number>(data.amount);
  const [costAmount, setCostAmount] = useState<number>(data.costAmount);

  /**
   * 输入框失焦事件
   */
  const inputBlur = () => {
    onBlur({ ...data, ...{ name, amount, costAmount } }, index);
  };

  useEffect(() => {
    setName(data.name);
    setAmount(data.amount);
    setCostAmount(data.costAmount);
  }, [data]);
  return (
    <div className={styles['product-config-children-wrapper']}>
      <Descriptions bordered size="small" column={1} title={`配置 ${index}`}>
        <Descriptions.Item label="名称">
          <Input
            value={name}
            onChange={e => setName(e.target.value)}
            onBlur={inputBlur}
          />
        </Descriptions.Item>
        <Descriptions.Item label="金额（分）">
          <Tooltip title="此金额是基于产品金额累加的金额">
            <InputNumber
              min={0}
              value={amount}
              onChange={value => setAmount(value as number)}
              onBlur={inputBlur}
            />
          </Tooltip>
        </Descriptions.Item>
        <Descriptions.Item label="成本金额（分）">
          <Tooltip title="此金额是基于产品成本金额累加的金额">
            <InputNumber
              min={0}
              value={costAmount}
              onChange={value => setCostAmount(value as number)}
              onBlur={inputBlur}
            />
          </Tooltip>
        </Descriptions.Item>
      </Descriptions>
      <MinusCircleOutlined
        className={styles['remove-item']}
        onClick={() => removeProductConfigChildren(index)}
      />
    </div>
  );
};

const ProductConfigItem = ({
  data,
  dataChange,
  removeProductConfig,
  removeProductConfigChildrenItem,
}: IProductConfigItem) => {
  const [title, setTitle] = useState<string>(data.title);
  const [list, setList] = useState<Array<IProductConfig>>(data.list);

  const onBlur = (data: IProductConfig, index: number) => {
    const listClone = JSON.parse(JSON.stringify(list));
    listClone[index] = data;
    dataChange({ title, list: listClone });
    setList(listClone);
  };

  const addConfigItem = () => {
    setList(prev =>
      prev.concat([
        { name: '', amount: 0, categoryName: title, costAmount: 0 },
      ]),
    );
  };

  /**
   * 删除分类的子配置
   * @param index
   */
  const removeProductConfigChildren = (index: number) => {
    const listClone = JSON.parse(JSON.stringify(list));
    listClone.splice(index, 1);
    const { id } = list[index];
    if (id) {
      removeProductConfigChildrenItem(id);
    }
    dataChange({ title, list: listClone });
    setList(listClone);
  };

  useEffect(() => {
    setTitle(data.title);
    setList(data.list);
  }, [data]);

  return (
    <div className={styles['product-config-item-wrapper']}>
      <div className={styles['product-config-item']}>
        <div className={styles['product-config-item-title']}>
          <span className={styles['label']}>分类标题: </span>
          <span className={styles['value']}>
            <Input
              placeholder="请输入分类标题"
              value={title}
              onChange={e => setTitle(e.target.value)}
              onBlur={() => {
                dataChange({ title, list });
              }}
            />
          </span>
        </div>
        {list.map((item, index) => (
          <ProductConfigChildren
            data={item}
            key={index}
            index={index}
            onBlur={onBlur}
            removeProductConfigChildren={removeProductConfigChildren}
          />
        ))}
      </div>
      <Button
        type="primary"
        className={styles['add-config-item']}
        onClick={addConfigItem}
      >
        新增配置项
      </Button>
      <DeleteOutlined
        className={styles['remove']}
        onClick={() => removeProductConfig()}
      />
    </div>
  );
};

export default ProductConfigItem;

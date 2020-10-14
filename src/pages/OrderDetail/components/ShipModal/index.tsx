import React, { useEffect, useImperativeHandle, useState } from 'react';
import { ISelectOptionsProps, IShipModalProps } from './interface';
import { Modal, Select, Input } from 'antd';
import styles from './index.less';
import courierData from '../../../../common/json/courier.json';

const ShipModal = ({
  cref,
  courierCode,
  courierName,
  courierNum,
  shipModalConfirm,
}: IShipModalProps) => {
  useImperativeHandle(cref, () => ({
    changeShowType: type => {
      setShow(type);
    },
  }));

  const [show, setShow] = useState<boolean>(false);
  const [num, setNum] = useState<string>(courierNum);
  const [name, setName] = useState<string>(courierName);
  const [code, setCode] = useState<string>(courierCode);
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);

  const confirm = () => {
    // 条件判断
    const conditionList: Array<{ type: boolean; msg: string }> = [
      {
        type: !code,
        msg: '请选择快递公司',
      },
      {
        type: !/^[A-Za-z-0-9]+$/.test(num),
        msg: '快递运单号不正确',
      },
    ];
    // 获取错误
    const isError:
      | { type: boolean; msg: string }
      | undefined = conditionList.find(data => data.type);

    if (isError) {
      window.message.error(isError.msg);
      return;
    }
    // 数据确认框
    Modal.confirm({
      title: '数据确认',
      content: `是否确认快递公司为: ${name}, 快递运单号为: ${num}`,
      onOk: async () => {
        setConfirmLoading(true);
        try {
          await shipModalConfirm({ num, code, name });
        } catch (e) {}
        setConfirmLoading(false);
      },
    });
  };

  const cancel = () => {
    setShow(false);
  };

  const selectChange = (_: string, { value, label }: ISelectOptionsProps) => {
    setCode(value);
    setName(label);
  };
  const selectSearch = (value: string) => {};

  useEffect(() => {
    setNum(courierNum);
    setCode(courierCode);
  }, [courierCode, courierNum]);

  return (
    <Modal
      title={`${name ? '修改' : '添加'}物流信息`}
      visible={show}
      onOk={confirm}
      onCancel={cancel}
      confirmLoading={confirmLoading}
      okText="确认"
      cancelText="取消"
    >
      <div className={styles['ship-modal-con']}>
        <Select
          style={{
            width: '100%',
          }}
          showSearch
          defaultValue={(code && code) || undefined}
          placeholder="选择快递公司"
          onSelect={(value, option) => {
            selectChange(value, option as ISelectOptionsProps);
          }}
          onSearch={selectSearch}
          filterOption={(input, option) =>
            option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
          options={courierData}
        />
        <Input
          style={{
            marginTop: '20px',
          }}
          placeholder="请输入快递运单号"
          value={(num && num) || undefined}
          onChange={({
            target: { value },
          }: React.ChangeEvent<HTMLInputElement>) => setNum(value)}
          allowClear
        />
      </div>
    </Modal>
  );
};

export default ShipModal;

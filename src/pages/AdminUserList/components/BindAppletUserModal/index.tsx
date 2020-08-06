import React, { useState, MutableRefObject, useImperativeHandle } from 'react';
import Modal from 'antd/lib/modal/Modal';
import { Button } from 'antd';
import { IBindAppletUserModalRef } from './interface';
import SelectAppletUser from '@/pages/AddAdmin/components/SelectAppletUser';

const BindAppletUserModal = ({
  cref,
  bindAppletUserModalSubmit,
}: {
  cref: MutableRefObject<IBindAppletUserModalRef | undefined>;
  bindAppletUserModalSubmit: () => void;
}) => {
  useImperativeHandle(cref, () => ({
    setVisiable: type => setVisible(type),
    getAppletUserId: () => appletUserId as number,
    setLoading: type => setLoading(type),
  }));

  const [visible, setVisible] = useState<boolean>(false); // 绑定小程序用户弹窗显示状态
  const [appletUserId, setAppletUserId] = useState<number>();
  const [loading, setLoading] = useState<boolean>(false);

  const cancel = () => {
    setVisible(false);
  };

  const submit = async () => {
    if (!appletUserId) {
      window.message.error('请选择要关联的小程序用户');
      return;
    }
    bindAppletUserModalSubmit();
  };

  return (
    <Modal
      visible={visible}
      title="选择绑定的小程序用户"
      onOk={submit}
      onCancel={cancel}
      footer={[
        <Button key="back" onClick={cancel}>
          取消
        </Button>,
        <Button key="submit" type="primary" loading={loading} onClick={submit}>
          绑定
        </Button>,
      ]}
    >
      <SelectAppletUser setAppletUserId={setAppletUserId} />
    </Modal>
  );
};

export default BindAppletUserModal;

import { Modal } from 'antd';

function onTestDeleteConfirm({ onOk }) {
  Modal.confirm({
    title: 'Are you sure want to delete this test?',
    cancelText: 'No',
    okText: 'Yes',
    okType: 'danger',
    onOk: onOk
  });
}

export default onTestDeleteConfirm;

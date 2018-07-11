import { Modal } from 'antd';

function onExerciseDeleteConfirm({ onOk }) {
  Modal.confirm({
    title: 'Are you sure want to delete this exercise?',
    cancelText: 'No',
    okText: 'Yes',
    okType: 'danger',
    onOk: onOk
  });
}

export default onExerciseDeleteConfirm;

import { Modal } from 'antd';

function onExerciseDeleteConfirm({ onOk }) {
  Modal.confirm({
    title: 'Are you sure want to delete this exercise?',
    okText: 'Yes',
    okType: 'danger',
    cancelText: 'No',
    onOk: onOk
  });
}

export default onExerciseDeleteConfirm;

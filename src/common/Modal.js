import ReactDOM from 'react-dom';
import { Modal } from 'antd';

// NOTE: add custom method to show modal, similar to `Modal.confirm`
Modal.show = ({ modal, onDismiss = () => {}, onConfirm = () => {} }) => {
  const root = document.getElementById('root');
  const container = root.appendChild(document.createElement('div'));

  const mount = () => {
    ReactDOM.render(
      // NOTE: enhance `props` of React element with callbacks
      {
        ...modal,
        props: {
          ...modal.props,
          onDismiss: () => {
            onDismiss();
            unmount();
          },
          onConfirm: () => {
            onConfirm();
            unmount();
          }
        }
      },
      container
    );
  };

  // NOTE: 350 ms > animation duration (300 ms)
  const unmount = () => {
    setTimeout(() => {
      ReactDOM.unmountComponentAtNode(container);
      root.removeChild(container);
    }, 350);
  };

  mount();
};

export default Modal;

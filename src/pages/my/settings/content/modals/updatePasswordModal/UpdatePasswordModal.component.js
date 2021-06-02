import React from 'react';

import BasicModal from '../Modal.component';

const Modal = (props) => (
  <BasicModal {...props} title="更改密码">
    <span>Modal Content</span>
  </BasicModal>
);

export default Modal;
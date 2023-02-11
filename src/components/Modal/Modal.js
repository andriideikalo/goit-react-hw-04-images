import { createPortal } from 'react-dom';
// import React, { Component } from 'react';
import { Overlay, ModalContent } from './ModalStyles';
import { useEffect } from 'react';

const modalRoot = document.querySelector('#modal-root');

// export default class Modal extends Component {
export default function Modal({ onCloseModal, image }) {
  // componentDidMount() {
  //   window.addEventListener('keydown', this.onEscClick);
  // }

  useEffect(() => {
    window.addEventListener('keydown', onEscClick);
  });

  // componentWillUnmount() {
  //   window.removeEventListener('keydown', this.onEscClick);
  // }

  useEffect(() => {
    window.removeEventListener('keydown', onEscClick);
  });

  const onEscClick = e => {
    if (!e.key === 'Escape') return;

    onCloseModal();
  };

  const onBackdropClick = e => {
    if (e.target !== e.currentTarget) return;

    onCloseModal();
  };

  // render() {
  // const { image } = this.props;
  return createPortal(
    <Overlay onClick={onBackdropClick}>
      <ModalContent>
        <img src={image} alt={image.tags} />
      </ModalContent>
    </Overlay>,
    modalRoot
  );
  // }
}

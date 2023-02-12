import { createPortal } from 'react-dom';
// import React, { Component } from 'react';
import { Overlay, ModalContent } from './ModalStyles';
import { useEffect } from 'react';

const modalRoot = document.querySelector('#modal-root');

// export default class Modal extends Component {
export default function Modal({ onCloseModal, image }) {


  useEffect(() => {
    const onEscClick = e => {
      if (!e.key === 'Escape') return;
      onCloseModal();
    };
    window.addEventListener('keydown', onEscClick);
    
    return () =>  window.removeEventListener('keydown', onEscClick);
  }, [onCloseModal]);

  

  const onBackdropClick = e => {
    if (e.target !== e.currentTarget) return;

    onCloseModal();
  };


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

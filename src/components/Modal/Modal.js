import { createPortal } from 'react-dom';
import React, { Component } from 'react';
import { Overlay, ModalContent } from './ModalStyles';

const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.onEscClick);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onEscClick);
  }
  onEscClick = e => {
    if (!e.key === 'Escape') return;

    this.props.onCloseModal();
  };

  onBackdropClick = e => {
    if (e.target !== e.currentTarget) return;

    this.props.onCloseModal();
  };

  render() {
    const { image } = this.props;
    return createPortal(
      <Overlay onClick={this.onBackdropClick}>
        <ModalContent>
          <img src={image} alt={image.tags} />
        </ModalContent>
      </Overlay>,
      modalRoot
    );
  }
}

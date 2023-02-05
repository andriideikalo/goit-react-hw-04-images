import { PropTypes } from 'prop-types';
import React from 'react';
import { ButtonStyles, ButtonSection } from './ButtonStyles';

export const Button = ({ onClick }) => (
  <ButtonSection>
    <ButtonStyles type="button" className="Button" onClick={onClick}>
      Load more
    </ButtonStyles>
  </ButtonSection>
);

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Button;

import { PropTypes } from 'prop-types';
import React, { Component } from 'react';
import {
  SearchForm,
  SearchFormButton,
  SearchFormButtonLabel,
  SearchFormInput,
  SearchbarStyles,
} from './SearchbarStyles';
import { FaSearch } from 'react-icons/fa';
export class Searchbar extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  state = {
    query: '',
  };

  handleInput = e => {
    this.setState({ query: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (!this.state.query) {
      alert('Empty query');
      return;
    }
    this.props.onSubmit(this.state.query);
    this.setState({ query: '' });
  };

  render() {
    return (
      <SearchbarStyles>
        <SearchForm onSubmit={this.handleSubmit}>
          <SearchFormButton type="submit">
            <FaSearch />
            <SearchFormButtonLabel>Search</SearchFormButtonLabel>
          </SearchFormButton>

          <SearchFormInput
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleInput}
            value={this.state.query}
          />
        </SearchForm>
      </SearchbarStyles>
    );
  }
}

export default Searchbar;

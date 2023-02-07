import React, { Component } from 'react';
// import api from './API/API';
import { fetchImges } from './API/API';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Button from './Button/Button';
import Modal from './Modal/Modal';

export class App extends Component {
  state = {
    images: [],
    modalImage: null,
    query: '',
    page: 1,
    lastPage: false,
    showModal: false,
    isLoading: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const { page, query } = this.state;
    if (prevState.query !== query || prevState.page !== page) {
      fetchImges(query, page)
        .then(res => {
          this.setState(prevState => ({
            images: [...prevState.images, ...res.data.hits],
            lastPage: page < Math.ceil(res.data.totalHits / 12),
          }));

          // if (page !== prevState.page) {
          //   this.setState(prevState => ({
          //     images: [...prevState.images, ...res.data.hits],
          //     lastPage: page < Math.ceil(res.data.totalHits / 12),
          //   }));
          // } else if (query !== prevState.query) {
          //   this.setState({
          //     images: res.data.hits,
          //     lastPage: page < Math.ceil(res.data.totalHits / 12),
          //   });
          // }
        })
        .catch(console.log)
        .finally(() => this.setState({ isLoading: false }));
    }
  }

  onSearchSubmit = query => {
    if (query === this.state.query) return;

    this.setState({
      query: query,
      page: 1,
      images: [],
      lastPage: false,
      showModal: false,
      isLoading: true,
    });
  };

  onLoadMore = () => {
    this.setState(prev => ({ page: prev.page + 1, isLoading: true }));
  };
  toggleIsLoading = () => {
    this.setState(prevState => ({ isLoading: !prevState.isLoading }));
  };

  onImageClick = largeImage =>
    this.setState({ showModal: true, modalImage: largeImage });

  onCloseModal = () => this.setState({ showModal: false });

  render() {
    const { isLoading, showModal, images, modalImage, lastPage } = this.state;
    return (
      <>
        <Searchbar onSubmit={this.onSearchSubmit} />
        {images.length > 0 && (
          <ImageGallery images={images} onImageClick={this.onImageClick} />
        )}
        {showModal && (
          <Modal image={modalImage} onCloseModal={this.onCloseModal}></Modal>
        )}
        {isLoading && <Loader />}
        {lastPage && !isLoading && <Button onClick={this.onLoadMore} />}
      </>
    );
  }

  // <div
  //   style={{
  //     height: '100vh',
  //     display: 'flex',
  //     justifyContent: 'center',
  //     alignItems: 'center',
  //     fontSize: 40,
  //     color: '#010101',
  //   }}
  // >
  //   React template
  // </div>
}

export default App;

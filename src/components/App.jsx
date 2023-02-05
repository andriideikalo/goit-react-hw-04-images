// import React, { Component } from 'react';
import { useState, useEffect } from 'react';
import { fetchImges } from './API/API';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Button from './Button/Button';
import Modal from './Modal/Modal';

export default function App() {
  const [images, setImages] = useState([]);
  const [modalImage, setModalImage] = useState(null);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(false);
  const [lastPage, setLastPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (setQuery !== query || setPage !== page) {
      fetchImges(query, page)
        .then(res => {
          setImages(prevState => [...prevState, ...res.data.hits]);
          setLastPage(Math.ceil(res.data.totalHits / 12));
        })
        .catch(console.log)
        .finally(toggleIsLoading);
    }
  }, [page, query]);

  const onSearchSubmit = query => {
    if (query === setQuery) return;

    setQuery(query);
    setPage(1);
    setImages([]);
    setLastPage(false);
    setShowModal(false);
    setIsLoading(true);
  };

  const onLoadMore = () => {
    this.setState(prev => ({ page: prev.page + 1, isLoading: true }));
  };
  const toggleIsLoading = () => {
    setIsLoading(prevState => ({ isLoading: !prevState.isLoading }));
  };

  const onImageClick = largeImage =>
    this.setState({ showModal: true, modalImage: largeImage });

  const onCloseModal = () => setModalImage({ showModal: false });

  return (
    <>
      <Searchbar onSubmit={onSearchSubmit} />
      {images.length > 0 && (
        <ImageGallery images={images} onImageClick={onImageClick} />
      )}
      {showModal && (
        <Modal image={modalImage} onCloseModal={onCloseModal}></Modal>
      )}
      {isLoading && <Loader />}
      {lastPage && !isLoading && <Button onClick={onLoadMore} />}
    </>
  );
}

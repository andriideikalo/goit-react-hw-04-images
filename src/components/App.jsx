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
    if (query === '') {
      return;
    }
    fetchImges(query, page)
      .then(res => {
        setImages(prevState => [...prevState, ...res.data.hits]);
        setLastPage(Math.ceil(res.data.totalHits / 12));
      })
      .catch(console.log)
      .finally(() => setIsLoading(prevState => !prevState));
  }, [page, query]);

  const onSearchSubmit = query => {
    setQuery(query);
    setPage(1);
    setImages([]);
    setLastPage(false);
    setShowModal(false);
    setIsLoading(true);
  };

  const onLoadMore = e => {
    e.preventDefault();
    setPage(prev => prev + 1);
  };
  // const toggleIsLoading = () => {
  //   setIsLoading(prevState => ({ isLoading: !prevState.isLoading }));
  // };

  const onImageClick = largeImage =>
    setImages({ showModal: true, modalImage: largeImage });

  const onCloseModal = () => setModalImage(true);

  return (
    <>
      <Searchbar onSubmit={onSearchSubmit} />
      {images.length > 0 && (
        <ImageGallery images={images} onClick={onImageClick} />
      )}
      {showModal && (
        <Modal image={modalImage} onCloseModal={onCloseModal}></Modal>
      )}
      {isLoading && <Loader />}
      {lastPage && !isLoading && <Button onClick={onLoadMore} />}
    </>
  );
}

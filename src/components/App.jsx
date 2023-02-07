import { useState, useEffect } from 'react';
import { fetchImges } from './API/API';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Button from './Button/Button';
import Modal from './Modal/Modal';

const App = () => {
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
          query(prevState => ({
            images: [...prevState.images, ...res.data.hits],
            lastPage: page < Math.ceil(res.data.totalHits / 12),
          }));
        })
        .catch(console.log)
        .finally(() => this.setState({ isLoading: false }));
    }
  }, [page, query]);

  const onSearchSubmit = query => {
    if (query === this.state.query) return;

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

  const onImageClick = largeImage =>
    this.setState({ showModal: true, modalImage: largeImage });

  const onCloseModal = () => this.setState({ showModal: false });

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
};

export default App;

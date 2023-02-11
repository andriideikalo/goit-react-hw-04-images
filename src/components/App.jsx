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
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (query === '') {
      return;
    }
    fetchImges(query, page)
      .then(res => {
        setImages(prevState => [...prevState, ...res.data.hits]);
        setLastPage(page < Math.ceil(res.data.totalHits / 12));
      })
      .catch(console.log)
      .finally(() => setIsLoading(false));
  }, [query, page]);

  // componentDidUpdate(prevProps, prevState) {
  //   const { page, query } = this.state;
  //   if (prevState.query !== query || prevState.page !== page) {
  //     fetchImges(query, page)
  //       .then(res => {
  //         this.setState(prevState => ({
  //           images: [...prevState.images, ...res.data.hits],
  //           lastPage: page < Math.ceil(res.data.totalHits / 12),
  //         }));
  //       })
  //       .catch(console.log)
  //       .finally(() => this.setState({ isLoading: false }));
  //   }
  // }

  const onSearchSubmit = query => {
    // if (query === setQuery) return;

    setQuery(query);
    setPage(1);
    setImages([]);
    setLastPage(false);
    setShowModal(false);
    setIsLoading(true);
  };

  const onLoadMore = () => {
    // this.setState(prev => ({ page: prev.page + 1, isLoading: true }));
    setPage(prev => prev.page + 1);
    setIsLoading(true);
  };

  const onImageClick = largeImage =>
    // this.setState({ showModal: true, modalImage: largeImage });
    {
      setShowModal(true);
      setModalImage(largeImage);
    };

  const onCloseModal = () =>
    // this.setState({ showModal: false })
    setShowModal(false);

  // render() {
  // const { isLoading, showModal, images, modalImage, lastPage } = this.state;
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
  // }
}

// export default App;

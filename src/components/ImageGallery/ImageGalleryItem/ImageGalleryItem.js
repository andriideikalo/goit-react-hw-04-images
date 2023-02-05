import React from 'react';
import {
  ImageGalleryItemStyles,
  ImageGalleryItemImage,
} from './ImageGalleryItemStyles';

export const ImageGalleryItem = ({ image, onImageClick }) => (
  <ImageGalleryItemStyles onClick={() => onImageClick(image.largeImageURL)}>
    <ImageGalleryItemImage
      src={image.webformatURL}
      alt={image.tags}
      className="ImageGalleryItem-image"
    />
  </ImageGalleryItemStyles>
);

export default ImageGalleryItem;

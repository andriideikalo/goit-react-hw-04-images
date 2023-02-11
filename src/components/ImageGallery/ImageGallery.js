import React from 'react';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import { GalleryStyles } from './ImageGalleryStyles';
import { nanoid } from 'nanoid';

const id = nanoid();

export const ImageGallery = ({ images, onImageClick }) => (
  <GalleryStyles>
    {images.map(image => (
      <ImageGalleryItem key={id} image={image} onImageClick={onImageClick} />
    ))}
  </GalleryStyles>
);

export default ImageGallery;

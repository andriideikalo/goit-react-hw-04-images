import React from 'react';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import { GalleryStyles } from './ImageGalleryStyles';

//

export const ImageGallery = ({ images, onImageClick }) => (
  <GalleryStyles>
    {images.map(image => (
      <ImageGalleryItem
        key={image.id}
        image={image}
        onImageClick={onImageClick}
      />
    ))}
  </GalleryStyles>
);

export default ImageGallery;

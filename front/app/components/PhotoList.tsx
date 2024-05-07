'use client'
import React, { useState } from 'react';
import ImageLazyLoad from './ImageLazyLoad';
import Photo from '../interfaces/photo';

interface PhotoListParams {
  photos: Photo[];
}

const PhotoList: React.FC<PhotoListParams> = ({ photos }) => {
  const [currentPage] = useState<number>(1);
  const [photosToShow, setPhotosToShow] = useState<number>(20);

  const indexOfLastPhoto = currentPage * photosToShow;
  const indexOfFirstPhoto = indexOfLastPhoto - photosToShow;
  const currentPhotos = photos.slice(indexOfFirstPhoto, indexOfLastPhoto);

  const totalPhotos = photos.length;


  const handleLoadMore = () => {
    setPhotosToShow((prevPhotosToShow) => prevPhotosToShow + 20);
  };

  return (
    <div className="container mx-auto">
      <div className="mb-4">
        {currentPhotos.map((photo) => (
          <div key={photo.photoId} className="flex mb-8">
            <div className="w-1/3 pr-4">
              <ImageLazyLoad filename={photo.filename} />
            </div>
            <div className="w-2/3">
              <h2 className="text-xl font-semibold mb-2">{photo.title}</h2>
              <p className="text-gray-700 mb-2">{photo.description}</p>
              <p className="text-gray-500">{photo.uploadAt}</p>
            </div>
          </div>
        ))}
      </div>
      {photosToShow < totalPhotos && (
        <div className="flex justify-center mb-4">
          <button
            className="bg-gray-200 px-4 py-2 rounded-full"
            onClick={handleLoadMore}
          >
            Load more...
          </button>
        </div>
      )}
    </div>
  );
};

export default PhotoList;

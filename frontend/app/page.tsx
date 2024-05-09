'use client'
import React, { useEffect, useState } from 'react';
import FormUploadPhoto from './components/PhotoForm';
import ImageLazyLoad from './components/ImageLazyLoad';
import BtnPhotoDelete from './components/BtnPhotoDelete';
import Photo from './interfaces/photo';
import { list } from './services/photoService';

const Page: React.FC = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [exclusiveStartKey, setExclusiveStartKey] = useState<string>('');

  const fetchPhotos = async () => {
    try {
      const data = await list(exclusiveStartKey);
      setPhotos([...photos, ...data.photos]);
      setExclusiveStartKey(data.lastEvaluatedKey || '');
    } catch (error) {
      console.error('Error fetching photos:', error);
    }
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  const handlePhotoUploaded = () => {
    fetchPhotos();
  };

  const handleLoadMore = () => {
    fetchPhotos();
  };

  const handleDeletePhoto = () => {
    fetchPhotos();
  };

  return (
    <div>
      <FormUploadPhoto onPhotoUploaded={handlePhotoUploaded} />
      {photos.length > 0 && <div className="container mx-auto">
        <div className="mb-4">
          {photos.map((photo) => (
            <div key={photo.photoId} className="flex mb-8">
              <div className="w-1/3 pr-4">
                <ImageLazyLoad filename={photo.filename} />
              </div>
              <div className="w-2/3">
                <h2 className="text-xl font-semibold mb-2">{photo.title}</h2>
                <p className="text-gray-700 mb-2">{photo.description}</p>
                <p className="text-gray-500">{photo.uploadAt}</p>
                <BtnPhotoDelete photoId={photo.photoId} onPhotoDeleted={handleDeletePhoto} />
              </div>
            </div>
          ))}
        </div>
        {exclusiveStartKey && (
          <div className="flex justify-center mb-4">
            <button
              className="bg-gray-200 px-4 py-2 rounded-full"
              onClick={handleLoadMore}
            >
              Load more...
            </button>
          </div>
        )}
      </div>}
    </div>
  );
};

export default Page;

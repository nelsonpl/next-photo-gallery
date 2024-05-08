'use client'
import React, { useEffect, useState } from 'react';
import PhotoList from './components/PhotoList';
import FormUploadPhoto from './components/PhotoForm';
import Photo from './interfaces/photo';
import { list } from './services/photoService';

const Page: React.FC = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);

  const fetchPhotos = async () => {
    try {
      const data = await list();
      setPhotos(data);
    } catch (error) {
      console.error('Error fetching photos:', error);
    }
  };

  const handlePhotoUploaded = () => {
    fetchPhotos();
  };

  const handlePhotoDeleted = () => {
    fetchPhotos();
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  return (
    <div>
      <FormUploadPhoto onPhotoUploaded={handlePhotoUploaded} />
      {photos.length > 0 && <PhotoList photos={photos} onPhotoDeleted={handlePhotoDeleted} />}
    </div>
  );
};

export default Page;

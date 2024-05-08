'use client'
import React, { useEffect, useState } from 'react';
import PhotoList from './components/PhotoList';
import FormUploadPhoto from './components/PhotoForm';
import Photo from './interfaces/photo';

const Page: React.FC = () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
  const [photos, setPhotos] = useState<Photo[]>([]);

  const fetchPhotos = async () => {
    try {
      const response = await fetch(`${apiUrl}/listPhoto`);
      const data = await response.json();
      setPhotos(data.photos);
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

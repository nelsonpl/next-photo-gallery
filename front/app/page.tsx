import React from 'react';
import PhotoList from './photoList';
import FormUploadPhoto from './formUploadPhoto';

interface Photo {
  uploadAt: string;
  photoId: string;
  imageUrl: string;
  description: string;
  title: string;
}

const Page: React.FC = async () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';

  const response = await fetch(`${apiUrl}/listPhoto`);
  const photos: Photo[] = (await response.json()).photos;

  return (
    <div>
      <FormUploadPhoto />
      {photos?.length && <PhotoList photos={photos} />}

    </div>
  );
};

export default Page;
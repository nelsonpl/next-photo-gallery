'use client'
import React, { useState } from 'react';
import axios from 'axios';

interface PhotoListParams {
  photoId: string;
  onPhotoDeleted: () => void;
}

const BtnPhotoDelete: React.FC<PhotoListParams> = ({ photoId, onPhotoDeleted }) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
  const [loading, setLoading] = useState<boolean>(false);

  const handleDeletePhoto = async (photoId: string) => {
    setLoading(true);

    try {
      await axios.delete(`${apiUrl}/deletePhoto/${photoId}`);
      onPhotoDeleted();
    } catch (error) {
      console.error('Failed to delete photo:', error);
    }

    setLoading(false);
  };

  return (
    <button
      className={`bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`} disabled={loading}
      onClick={() => handleDeletePhoto(photoId)}
    >
      {loading ? 'Deleting...' : 'Delete'}
    </button>
  );
};

export default BtnPhotoDelete;

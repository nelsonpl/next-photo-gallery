'use client'
import React, { useState } from 'react';

interface Photo {
  uploadAt: string;
  photoId: string;
  imageUrl: string;
  description: string;
  title: string;
}

interface PhotoListParams {
  photos: Photo[];
}

const PhotoList: React.FC<PhotoListParams> = ({ photos }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const photosPerPage = 20;
  const indexOfLastPhoto = currentPage * photosPerPage;
  const indexOfFirstPhoto = indexOfLastPhoto - photosPerPage;
  const currentPhotos = photos.slice(indexOfFirstPhoto, indexOfLastPhoto);

  const scrollToNextPage = () => {
    setCurrentPage((prevPage) => (prevPage === Math.ceil(photos.length / photosPerPage) ? 1 : prevPage + 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToPrevPage = () => {
    setCurrentPage((prevPage) => (prevPage === 1 ? Math.ceil(photos.length / photosPerPage) : prevPage - 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-semibold mb-4">Gallery of Photos</h1>
      <div className="mb-4">
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Image</th>
            </tr>
          </thead>
          <tbody>
            {currentPhotos.map((photo) => (
              <tr key={photo.photoId}>
                <td>{photo.title}</td>
                <td>{photo.description}</td>
                <td>
                  <img src={photo.imageUrl} alt={photo.title} className="w-20 h-20 object-cover" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between">
        <button
          className="bg-gray-200 px-3 py-1 rounded-full"
          onClick={scrollToPrevPage}
        >
          Previous
        </button>
        <button
          className="bg-gray-200 px-3 py-1 rounded-full"
          onClick={scrollToNextPage}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PhotoList;

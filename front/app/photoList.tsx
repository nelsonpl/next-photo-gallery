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

const PhotoList: React.FC<PhotoListParams> = (params) => {
  return (
    <div>
      <h1>Lista de Fotos</h1>
      <ul>
        {params.photos.map((photo) => (
          <li key={photo.photoId}>
            <h2>{photo.title}</h2>
            <p>{photo.description}</p>
            <img src={photo.imageUrl} alt="" />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PhotoList;

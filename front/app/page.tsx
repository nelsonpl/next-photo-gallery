import PhotoList from './photoList';
interface Photo {
  uploadAt: string;
  photoId: string;
  imageUrl: string;
  description: string;
  title: string;
}

const api = "https://xwf3amzv87.execute-api.us-east-2.amazonaws.com/Prod"

const Page: React.FC = async () => {

  const response = await fetch(`${api}/listPhoto`);
  const photos: Photo[] = (await response.json()).photos;

  console.log('photos', photos)

  return (
    <div>
      <PhotoList photos={photos} />
    </div>
  );
};

export default Page;

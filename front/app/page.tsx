import PhotoList from './photoList';
interface Photo {
  uploadAt: string;
  photoId: string;
  imageFileName: string;
  description: string;
  title: string;
}

const api = "https://xwf3amzv87.execute-api.us-east-2.amazonaws.com/Prod"

const Page: React.FC = async () => {

  const response = await fetch(`${api}/listPhoto`);
  const photos: Photo[] = (await response.json()).photos;

  return (
    <PhotoList photos={photos} />
  );
};

export default Page;

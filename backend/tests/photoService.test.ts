import PhotoService from '../src/services/photoService';
import IPhotoRepository from '../src/repositories/photoRepository';
import Photo from '../src/models/photo';

const mockRepository: IPhotoRepository = {
  save: async (title: string, description: string, filename: string): Promise<Photo> => ({
    photoId: 'mockedId',
    title,
    description,
    filename,
    uploadAt: new Date().toISOString(),
  }),
  list: async (pageSize: number, exclusiveStartKey: any): Promise<{ photos: Photo[]; lastEvaluatedKey: string | null }> => ({
    photos: [],
    lastEvaluatedKey: null,
  }),
  delete: async (photoId: string): Promise<void> => undefined,
};

describe('PhotoService', () => {
  it('should save a photo', async () => {
    // Arrange
    const photoService = new PhotoService(mockRepository);
    const title = 'Test Title';
    const description = 'Test Description';
    const filename = 'test.jpg';

    // Act
    const savedPhoto = await photoService.save(title, description, filename);

    // Assert
    expect(savedPhoto.photoId).toBeDefined();
    expect(savedPhoto.title).toEqual(title);
    expect(savedPhoto.description).toEqual(description);
    expect(savedPhoto.filename).toEqual(filename);
    expect(savedPhoto.uploadAt).toBeDefined();
  });
});

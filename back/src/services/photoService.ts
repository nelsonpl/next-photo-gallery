import { IPhotoRepository } from '../interfaces/photoRepository';
import { IPhotoService } from '../interfaces/photoService';
import Photo from '../models/photo';

class PhotoService implements IPhotoService {
  constructor(private photoRepository: IPhotoRepository) {}

  async save(title: string, description: string, filename: string): Promise<Photo> {
    return await this.photoRepository.save(title, description, filename);
  }

  async list(pageSize: number, exclusiveStartKey: any): Promise<{ photos: Photo[]; lastEvaluatedKey: string | null }> {
    return await this.photoRepository.list(pageSize, exclusiveStartKey);
  }

  async delete(photoId: string): Promise<void> {
    await this.photoRepository.delete(photoId);
  }
}

export default PhotoService;
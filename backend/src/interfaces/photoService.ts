import Photo from "../models/photo";

export interface IPhotoService {
  save(title: string, description: string, filename: string): Promise<Photo>;
  list(pageSize: number, exclusiveStartKey: any): Promise<{ photos: Photo[]; lastEvaluatedKey: string | null }>;
  delete(photoId: string): Promise<void>;
}
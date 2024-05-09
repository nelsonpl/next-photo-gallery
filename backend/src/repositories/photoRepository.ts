import * as AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';
import { IPhotoRepository } from '../interfaces/photoRepository';
import Photo from '../models/photo';

const dynamoDB = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = process.env.TABLE_NAME || '';

class PhotoRepository implements IPhotoRepository {
  async save(title: string, description: string, filename: string): Promise<Photo> {
    const photoId = uuidv4();
    const newItem: Photo = {
      photoId,
      title,
      description,
      filename,
      uploadAt: new Date().toISOString(),
    };

    const params: AWS.DynamoDB.DocumentClient.PutItemInput = {
      TableName: TABLE_NAME,
      Item: newItem,
    };

    await dynamoDB.put(params).promise();

    return newItem;
  }

  async list(pageSize: number, exclusiveStartKey: any): Promise<{ photos: Photo[]; lastEvaluatedKey: string | null }> {
    const params: AWS.DynamoDB.DocumentClient.ScanInput = {
      TableName: TABLE_NAME,
      Limit: pageSize,
      ExclusiveStartKey: exclusiveStartKey,
    };

    const data = await dynamoDB.scan(params).promise();

    let lastEvaluatedKey = null;
    if (data.LastEvaluatedKey) {
      lastEvaluatedKey = encodeURIComponent(JSON.stringify(data.LastEvaluatedKey));
    }

    return {
      photos: data.Items as Photo[] || [],
      lastEvaluatedKey,
    };
  }

  async delete(photoId: string): Promise<void> {
    const params: AWS.DynamoDB.DocumentClient.DeleteItemInput = {
      TableName: TABLE_NAME,
      Key: {
        photoId,
      },
    };

    await dynamoDB.delete(params).promise();
  }
}

export default PhotoRepository;
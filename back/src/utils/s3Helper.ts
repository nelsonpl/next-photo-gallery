import * as AWS from 'aws-sdk';

const s3 = new AWS.S3();
const BUCKET_NAME = process.env.BUCKET_NAME || '';

export async function uploadImage(filename: string, fileData: Buffer): Promise<void> {
    const params: AWS.S3.PutObjectRequest = {
        Bucket: BUCKET_NAME,
        Key: filename,
        Body: fileData,
        ContentType: 'image/jpeg',
    };

    await s3.upload(params).promise();
}

export async function getImage(filename: string): Promise<Buffer> {
    const params: AWS.S3.GetObjectRequest = {
        Bucket: BUCKET_NAME,
        Key: filename,
    };

    const data = await s3.getObject(params).promise();
    return data.Body as Buffer;
}

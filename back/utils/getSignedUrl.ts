import AWS from 'aws-sdk';

const s3 = new AWS.S3();

interface GetSignedUrlParams {
  key: string;
  bucket: string;
}

export const getSignedUrl = async ({ key, bucket }: GetSignedUrlParams) => {
  console.log('getSignedUrl', key, bucket);
  const params: AWS.S3.GetObjectRequest = {
    Bucket: bucket,
    Key: key,
  };

  const signedUrl = await s3.getSignedUrlPromise('getObject', params);

  return signedUrl;
};

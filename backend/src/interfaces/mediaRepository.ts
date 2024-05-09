interface IMediaRepository {
  upload(filename: string, data: Buffer, contentType: string): Promise<void>;
  getSignedUrl(filename: string): Promise<string>;
}

export default IMediaRepository;

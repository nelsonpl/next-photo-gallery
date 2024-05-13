# Check if environment variables are set
if [ -z "$S3_BUCKET_NAME" ]; then
  echo "Error: Environment variables are not properly configured."
  exit 1
fi

# Build the React/Next.js project
echo "Building the project..."
npm run build

# Sync built files with S3 bucket
echo "Syncing files with S3 bucket..."
aws s3 sync out s3://$S3_BUCKET_NAME
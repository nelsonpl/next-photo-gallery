#!/bin/bash

if [ -z "$STACK_NAME" ]; then
  echo "ERROR: STACK_NAME variable is not set. Please set it before running this script."
  exit 1
fi

region=${REGION:-us-west-2}

target_origin_id="${STACK_NAME}-target"

bucket_name="${STACK_NAME}-bucket"

echo "Building frontend..."
yarn build

echo "Creating S3 bucket..."
aws s3api create-bucket --bucket "$bucket_name" --region "$region"

echo "Uploading files to S3 bucket..."
aws s3 sync ./dist "s3://$bucket_name"

echo "Creating CloudFront distribution..."
distribution_id=$(aws cloudfront create-distribution --distribution-config file://cloudfront-config.json --region "$region" | jq -r '.Distribution.Id')

echo "Deployment complete!"
echo "You can access your frontend at:"
echo "https://${distribution_id}.cloudfront.net"

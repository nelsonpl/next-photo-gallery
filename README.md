node_modules
src
	lambda_functions
		deleteImage.ts
		uploadImage.ts
		viewImage.ts
.gitignore
package.json
samconfig.toml
template.yaml
tsconfig.json

yarn tsc

sam package --template-file template.yaml --output-template-file packaged.yaml

sam deploy --template-file packaged.yaml --stack-name nelson-functions --capabilities CAPABILITY_IAM


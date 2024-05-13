# Project Name: Photo Gallery Frontend

## Description
Front is a Next.js and React-based project for creating a dynamic photo gallery. It leverages Next.js for server-side rendering and React for building interactive user interfaces. The project uses Axios for making HTTP requests, enabling seamless communication with backend services. Additionally, it utilizes Tailwind CSS for efficient styling and responsive design.

## Installation
1. Clone the repository.
2. Navigate to the project directory.
3. Run `npm install` to install dependencies.

## Usage
- Run `npm run dev` to start the development server.
- Access the application at `http://localhost:3000`.
- Use `npm run build` to create a production build.
- Start the production server with `npm start`.

## Deployment
To deploy the project, ensure the following steps:
1. Set up environment variables: 
   - `S3_BUCKET_NAME`: The name of the S3 bucket where the built files will be deployed.
2. Ensure AWS CLI is configured with appropriate permissions.
3. Run `npm run deploy`.

## Configuration
- Environment variables are managed through a `.env` file:
  - `NEXT_PUBLIC_API_URL`: The URL for the API used to fetch photo data.
  - `NEXT_PUBLIC_API_UPLOAD_URL`: The URL for the API used to upload photos.

## Dependencies
- **Next.js**: 14.2.3
- **React**: 18
- **React DOM**: 18
- **Axios**: 1.6.8
- **Tailwind CSS**: 3.4.1

## Development Dependencies
- **TypeScript**: 5
- **ESLint**: 8
- **ESLint Config Next**: 14.2.3
- **PostCSS**: 8
- **@types/node**: 20
- **@types/react**: 18
- **@types/react-dom**: 18

## Contributing
Contributions are welcome! Feel free to open issues or submit pull requests to improve the project.

## License
This project is licensed under the [MIT License](LICENSE).

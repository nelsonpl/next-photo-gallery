# AWS Photo Gallery

## Overview

This project is a web application consisting of a backend and a frontend part. The backend is responsible for providing services and APIs, while the frontend is the user interface of the application.

### Backend

The `backend` folder contains the source code of the backend of the application. It is developed in TypeScript and uses some popular tools for development and deployment.

#### Technologies Used:

- **Node.js**: Server-side JavaScript runtime environment.
- **AWS Lambda**: Serverless cloud computing platform.
- **SAM (Serverless Application Model)**: Framework for building and managing serverless applications on AWS.
- **Jest**: JavaScript testing framework.

#### Required Packages:

- **DevDependencies**:
  - `@types/aws-lambda`: TypeScript types for AWS Lambda.
  - `@types/jest`, `@types/mocha`, `@types/node`: TypeScript types for testing.
  - `@types/uuid`: TypeScript types for UUID.
  - `jest`, `ts-jest`, `typescript`: Tools for testing and TypeScript compilation.

- **Dependencies**:
  - `aws-lambda`: AWS Lambda package.
  - `lambda-multipart-parser-v2`: Multipart parser for AWS Lambda.

#### Scripts:

- `deploy`: Compiles TypeScript code, packages, and deploys to AWS SAM.
- `test`: Runs tests using Jest.

### Frontend

The `frontend` folder contains the source code of the frontend of the application. It is developed using the Next.js framework, which is based on React.

#### Technologies Used:

- **Next.js**: React framework for server-side rendering.
- **React**: JavaScript library for building user interfaces.
- **Tailwind CSS**: Customizable CSS framework for responsive design.

#### Required Packages:

- **Dependencies**:
  - `axios`: HTTP client for making requests to the backend.
  - `next`, `react`, `react-dom`: Next.js and React packages.

- **DevDependencies**:
  - `@types/node`, `@types/react`, `@types/react-dom`: TypeScript types for Node.js and React.
  - `eslint`, `eslint-config-next`: Linting tools.
  - `postcss`, `tailwindcss`, `typescript`: Styling and TypeScript compilation tools.

#### Scripts:

- `dev`: Starts the Next.js development server.
- `build`: Compiles the Next.js project for production.
- `start`: Starts the Next.js server in production.
- `lint`: Runs linting check on the code.

## How to Run

To run this project locally, follow these steps:

1. **Backend**:
   - Navigate to the `backend` folder.
   - Run `yarn install` to install the dependencies.
   - Run `yarn deploy` to compile, package, and deploy to AWS SAM.

2. **Frontend**:
   - Navigate to the `frontend` folder.
   - Run `yarn install` to install the dependencies.
   - Run `yarn dev` to start the development server.


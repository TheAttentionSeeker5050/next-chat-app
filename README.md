# Next.js and Mongo Chat Application (Work in Progress)

A real-time chat application built with Next.js, MongoDB, and Firebase.

## Description

This chat application allows users to engage in real-time conversations in a single chat room. Users can create, read, update, and delete messages, which can include text, images, or files. Before entering the chat room, users are prompted to enter a username, which is saved to the application context. This step only occurs if the username is not already set. This web service also implements testing and CI/CD using GitHub Actions and Jest. This is to protect the main branch and to ensure app components and methods run and return responses as expected before any deployment to the cloud service provider. In this case, I will be making use of Vercel to host the Next.js, firebase and Mongo Atlas for the DB.

**Note: This project is a work in progress, many of the features are being added as it advances.**

## Table of Contents

- [Next.js and Mongo Chat Application (Work in Progress)](#nextjs-and-mongo-chat-application-work-in-progress)
  - [Description](#description)
  - [Table of Contents](#table-of-contents)
  - [Getting Started](#getting-started)
  - [Features](#features)
  - [Testing](#testing)
    - [API Routes](#api-routes)
    - [Database CRUD Operations](#database-crud-operations)
    - [Mongo Database Connection](#mongo-database-connection)
    - [Firebase Realtime Database](#firebase-realtime-database)
    - [Formatters and Input Validation methods](#formatters-and-input-validation-methods)
    - [Running Tests Job on GitHub Actions before Pull Requests](#running-tests-job-on-github-actions-before-pull-requests)
  - [Note](#note)

## Getting Started

1. **Clone the repository:**
```bash
git clone github.com/TheAttentionSeeker5050/next-chat-app
```

2. **Make an Env File**
```bash
# The mongo db environment variables, use the ip of your host computer
MONGODB_URI=mongodb://root:example@your-host-ip:27017/
MONGODB_DB=nextChatDb


# firebase
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_DATABASE_URL=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=


# for the local development
FIREBASE_DATABASE_EMULATOR_HOST=127.0.0.1:9000 # default, use loopback IP to connect to the emulator
```

3. **Install dependencies:**
```bash
npm install
# or sudo npm install
```

4. **Run Docker MongoDB Images**
```bash
docker compose up --build -d
```

5. **Install Firebase CLI and Emulator**
```bash
# Follow the steps in https://firebase.google.com/docs/web/setup#add-sdk-and-initialize 
# To run locally on a firebase database emulator, please follow the instructions in https://firebase.google.com/docs/emulator-suite/install_and_configure#startup
```

6. **Run the Emulator or Connect to the Live Firebase Service**
```bash
# To connect to a live Firebase service, you have to setup the environment variables first in a .env file

# Otherwise, run the emulator with the following command once the CLI is setup and login
firebase emulators:start --only database

# Also keep in mind that emulator is set to run automatically if the next.js environment type is set to development or test, otherwise, for production it will take the live connection
```

7. **Run the development server:**
```bash
# Once all is set, run the service locally with
npm run dev # or sudo npm run dev

# To build into a production solution, run the following commands
npm run build
npm run start
```

8. **Open [http://localhost:3000](http://localhost:3000) in your browser.**

## Features

- Real-time chat using Firebase database.
- CRUD operations for messages (text only for the moment, images and files share soon to be implemented).
- Single chat room for user interaction.
- User authentication with a context-based username.
- Night mode for a personalized chat experience.
- Tailwind CSS for styling.
- Linting validation for code quality.

## Testing

This project employs a robust testing strategy, ensuring the reliability and stability of the application. The testing suite covers the following areas:

Unit tests validate the behavior of React components. To run component tests, use:

```bash
npm run test
# or sudo npm run test
```

### API Routes 
Applied testing of API routes requests and responses using Postman

### Database CRUD Operations
Unit tests for database operations ensure seamless interaction with MongoDB. (Execute tests with the command above)

### Mongo Database Connection
Tests focus on establishing and validating connections to the database. (Execute tests with the command above)

### Firebase Realtime Database
Future plans include testing for real-time communication via firebase. Unit testing using jest was implemented to ensure this feature runs as expected before launching to production

###  Formatters and Input Validation methods
Unit tests ensure the correctness of text formatters and input validation methods.

### Running Tests Job on GitHub Actions before Pull Requests
All these tests are run when performing a pull request to the main branch 

## Note
This project is a tech migration of a project built with a team of 3 other developers. You can find the original project at [Project-Management-Chat-App/chat-application-pm-project](https://github.com/Project-Management-Chat-App/chat-application-pm-project). It was firstly built using webpack, babel, JavaScript, and jQuery.

Additionally, a live demo of this project will be added in the future.


**More details on deployment, local setup, and additional features will be provided later in the project.**

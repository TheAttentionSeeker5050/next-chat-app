# Next.js and Mongo Chat Application (Work in Progress)

A real-time chat application built with Next.js, MongoDB, and Socket.io.

## Description

This chat application allows users to engage in real-time conversations in a single chat room. Users can create, read, update, and delete messages, which can include text, images, or files. Before entering the chat room, users are prompted to enter a username, which is saved to the application context. This step only occurs if the username is not already set. This web service also implements testing and CI/CD using GitHub Actions and Jest. This is to protect the main branch and to ensure app components and methods run and return responses as expected before any deployment to the cloud service provider. In this case, I will be making use of Vercel to host the Next.js, and Mongo Atlas for the DB.

**Note: This project is a work in progress, many of the features are being added as it advances.**

## Table of Contents

- [Next.js and Mongo Chat Application (Work in Progress)](#nextjs-and-mongo-chat-application-work-in-progress)
  - [Description](#description)
  - [Table of Contents](#table-of-contents)
  - [Getting Started](#getting-started)
  - [Features](#features)
  - [Testing](#testing)
    - [Routes (TBD)](#routes-tbd)
    - [Database CRUD Operations](#database-crud-operations)
    - [Database Connection](#database-connection)
    - [Socket.io (TBD)](#socketio-tbd)
    - [Formatters and Input Validation methods](#formatters-and-input-validation-methods)
  - [Note](#note)

## Getting Started

1. **Clone the repository:**
```bash
git clone github.com/TheAttentionSeeker5050/next-chat-app
```

2. **Install dependencies:**
```bash
npm install
# or sudo npm install
```

3. **Run the development server:**
```bash
npm run dev
# or sudo npm run dev
```

4. **Open [http://localhost:3000](http://localhost:3000) in your browser.**

## Features

- Real-time chat using Socket.io.
- CRUD operations for messages (text, images, files).
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

### Routes (TBD)
Route tests ensure proper navigation within the application. (To be implemented)

### Database CRUD Operations
Integration tests for database operations ensure seamless interaction with MongoDB. (Execute tests with the command above)

### Database Connection
Tests focus on establishing and validating connections to the database.

### Socket.io (TBD)
Future plans include testing for real-time communication via Socket.io.

###  Formatters and Input Validation methods
Unit tests ensure the correctness of text formatters and input validation methods.

## Note
This project is a tech migration of a project built with a team of 3 other developers. You can find the original project at [Project-Management-Chat-App/chat-application-pm-project](https://github.com/Project-Management-Chat-App/chat-application-pm-project). It was firstly built using webpack, babel, JavaScript, and jQuery.

Additionally, a live demo of this project will be added in the future.


**More details on deployment, local setup, and additional features will be provided later in the project.**

# Chat Application (Work in Progress)

A real-time chat application built with Next.js, MongoDB, and Socket.io.

## Description

This chat application allows users to engage in real-time conversations in a single chat room. Users can create, read, update, and delete messages, which can include text, images, or files. Before entering the chat room, users are prompted to enter a username, which is saved to the application context. This step only occurs if the username is not already set.

**Note: This project is a work in progress, many of the features are being added as it advances.**


## Table of Contents

- [Chat Application (Work in Progress)](#chat-application-work-in-progress)
  - [Description](#description)
  - [Table of Contents](#table-of-contents)
  - [Getting Started](#getting-started)
  - [Features](#features)
  - [Testing Focus](#testing-focus)

## Getting Started

1. **Clone the repository:**
```bash
git clone https://github.com/your-username/your-chat-app.git
```

2. **Install dependencies:**
```bash
npm install
```

3. **Run the development server:**
```bash
npm run dev
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

## Testing Focus

This project follows a test-driven development approach, with a focus on creating a robust and reliable chat application. GitHub Actions are set up to run tests on the main branch, ensuring code quality before merging.

**More details on deployment, local setup, and additional features will be provided later in the project.**

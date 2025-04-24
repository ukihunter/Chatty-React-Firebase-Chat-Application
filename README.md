# 📱Chatty - React Firebase Chat Application

Chatty is a real-time chat application built with React, Firebase, and Zustand. It allows users to register, log in, and chat with other users in real time. The app also supports features like user blocking, image sharing, and emoji support.

---

## Features

- **User Authentication**: Users can register and log in using Firebase Authentication.
- **Real-Time Messaging**: Chat with other users in real time using Firebase Firestore.
- **User Blocking**: Block or unblock users to control who can message you.
- **Image Sharing**: Share images in chats using Cloudinary for image hosting.
- **Emoji Support**: Add emojis to your messages using the Emoji Picker.
- **Responsive Design**: Fully responsive UI for desktop and mobile devices.
- **Notifications**: Toast notifications for user feedback (e.g., login success, errors).

---

## Installation

Follow these steps to set up the project locally:

Clone the repository and navigate into the project folder:
```bash
git clone https://github.com/ukihunter/Chatty-React-Firebase-Chat-Application.git
cd chatty
```
Install dependencies:
```
npm install
```
Set up Firebase:

  - Create a Firebase project at Firebase Console.

  - Enable Authentication (Email/Password) and Firestore Database.

  - Replace the Firebase configuration in src/lib/firebase.js with your own Firebase project credentials.

Set up environment variables:

  - Create a .env file in the root directory and add your Firebase API key:

```VITE_API_KEY=your_firebase_api_key```

Start the development server:
```
npm run dev
```
Open the app in your browser at http://localhost:5173.
Scripts

  - ``` npm run dev```: Start the development server.

  - ``` npm run build ```: Build the project for production.

  - ``` npm run preview ```: Preview the production build.

  - ``` npm run lint ```: Run ESLint to check for code issues.

Firebase Configuration

The Firebase configuration is located in src/lib/firebase.js. Replace the firebaseConfig object with your own Firebase credentials.

**Key Components
**
Authentication

  - Login.jsx: Handles user login and registration using Firebase Authentication.

Chat Functionality

  - Chat.jsx: Displays chat messages and allows users to send both text and image messages using Firestore.

User Management

  - Userinfo.jsx: Shows the current user's info.

  - AddUser.jsx: Enables searching and adding users to chat list.
**
Blocking Users**

  - Detil.jsx: Lets users block or unblock other users.

**Notifications**

   - Notification.jsx: Implements toast notifications using react-toastify.

**Styling**

   - Global styles are managed in index.css.

   -  Each component has its own styles (e.g., chat.css, login.css).

Dependencies
Core

  - React: Frontend library for building the UI.

  - Firebase: Backend service for authentication and real-time database.

  - Zustand: State management for user and chat state handling.

Additional

  - React Toastify: For toast-based notifications.

  - Emoji Picker React: Adds emoji functionality to messages.

  - Cloudinary: Hosts and serves uploaded images.

**Environment Variables**

The following environment variable is required:

Variable	Description

```
VITE_API_KEY= "Your Firebase API key"
```

Known Issues

  - Blocked users might not always sync correctly in Firestore.

  - Cloudinary uploads may fail if credentials are not configured properly.

Future Enhancements

  - Group chat support.

  - Message read receipts.

  - Typing indicators.

  - Enhanced mobile responsiveness.

Contributing

We welcome contributions! Here’s how to get started:

  - Fork the repository.

  - Create a new branch:

git checkout -b your-branch-name

  - Commit your changes:

git commit -m "Your message"

  - Push your changes:

git push origin your-branch-name

  - Open a pull request on GitHub.

License

- This project is licensed under the MIT License. See the LICENSE file for full details.


## Acknowledgments

- [React](https://reactjs.org): A JavaScript library for building user interfaces.
- [Next.js](https://nextjs.org): A React framework with hybrid static & server rendering, and built-in routing.
- [Firebase](https://firebase.google.com): Backend platform for building web and mobile applications.
- [Zustand](https://github.com/pmndrs/zustand): A small, fast, and scalable bearbones state-management solution.
- [React Toastify](https://fkhadra.github.io/react-toastify): React notification library for displaying toast messages.
- [Cloudinary](https://cloudinary.com): Cloud-based image and video management service.



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

1. Clone the repository:
   ```bash
   git clone https://github.com/ukihunter/Chatty-React-Firebase-Chat-Application
   cd chatty

Install dependencies:
  
  ``` npm run dev```
  
Set up Firebase:

- Create a Firebase project at Firebase Console.
- Enable Authentication (Email/Password) and Firestore Database.
- Replace the Firebase configuration in src/lib/firebase.js with your own Firebase project credentials.

Set up environment variables:

 - Create a .env file in the root directory and add your Firebase API key

Start the development server:

  ```npm run dev```

Open the app in your browser at **http://localhost:5173**

Scripts

   - npm run dev: Start the development server.
   - npm run build: Build the project for production.
   - npm run preview: Preview the production build.
   - npm run lint: Run ESLint to check for code issues.

**Firebase Configuration**
   - The Firebase configuration is located in src/lib/firebase.js. Replace the firebaseConfig object with your Firebase project credentials.

**Key Components**
1. Authentication
   
   - ```Login.jsx```: Handles user login and registration.
   - Firebase Authentication is used for managing user accounts.
  
2. Chat Functionality
  
   - ```Chat.jsx```: Displays chat messages and allows users to send text and images.
   - Firebase Firestore is used for storing chat messages.
  
3. User Management
  
   - ```Userinfo.jsx```: Displays the current user's information.
   
   - ```AddUser.jsx```: Allows users to search for and add other users to their chat list.

4. Blocking Users

   - ```Detil.jsx```: Allows users to block or unblock other users.

6. Notifications

   - ```Notification.jsx```: Displays toast notifications using react-toastify.

**Styling**

   - Global styles are defined in index.css.
   
   - Component-specific styles are located in their respective directories (e.g., chat.css, login.css).

**Dependencies**

  **Core Dependencies**
  
   - React: Frontend library for building the user interface.
   - Firebase: Backend-as-a-service for authentication and real-time database.
   - Zustand: State management library for managing user and chat states.

**Additional Libraries**

   - React Toastify: For displaying toast notifications.
   - Emoji Picker React: For adding emoji support in messages.
   - Cloudinary: For image hosting and sharing.

**Environment Variables**

   - The project uses the following environment variables:

**Variable	Description**

| Variable       | Description                        |
|----------------|------------------------------------|
| `VITE_API_KEY` | Firebase API key for the project   |


**Known Issues**

   - Blocked User State: Ensure the blocked state is updated correctly in Firestore.
   - Image Upload: Ensure Cloudinary credentials are configured properly for image uploads.

**Future Enhancements**

   - Add support for group chats.
   - Implement message read receipts.
   - Add typing indicators.
   - Improve UI/UX for mobile devices.

**Contributing**

 - Contributions are welcome! Please follow these steps:

  - Fork the repository.
  - Create a new branch:
  - Commit your changes:
  - Push to your branch:
  - Open a pull request.

**License**

- This project is licensed under the MIT License. 


## Acknowledgments

- [React](https://reactjs.org/)
- [Firebase](https://firebase.google.com/)
- [Zustand](https://github.com/pmndrs/zustand)
- [React Toastify](https://fkhadra.github.io/react-toastify/)
- [Cloudinary](https://cloudinary.com/)


   

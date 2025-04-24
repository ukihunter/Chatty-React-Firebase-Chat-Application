// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "chatty-8314c.firebaseapp.com",
  projectId: "chatty-8314c",
  storageBucket: "chatty-8314c.firebasestorage.app",
  messagingSenderId: "140355902267",
  appId: "1:140355902267:web:a54b709517cd03a86cb51e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore();

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCJG3xosp3rPhvZN0edL25PyunJQXigQ0A",
  authDomain: "examattendance-5873e.firebaseapp.com",
  projectId: "examattendance-5873e",
  storageBucket: "examattendance-5873e.firebasestorage.app",
  messagingSenderId: "106196269221",
  appId: "1:106196269221:web:6a7511c9e8a3a2f27db54c",
  measurementId: "G-5EPTQQ7FZC"
};

// Initialize Firebase
export const Firebase_app = initializeApp(firebaseConfig);
export const Firebase_Auth = getAuth(Firebase_app);
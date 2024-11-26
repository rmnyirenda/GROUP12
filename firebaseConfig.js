// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCJG3xosp3rPhvZN0edL25PyunJQXigQ0A",
  authDomain: "examattendance-5873e.firebaseapp.com",
  projectId: "examattendance-5873e",
  storageBucket: "examattendance-5873e.firebasestorage.app",
  messagingSenderId: "106196269221",
  appId: "1:106196269221:web:6a7511c9e8a3a2f27db54c",
  measurementId: "G-5EPTQQ7FZC"
};

const Firebase_app = initializeApp(firebaseConfig);
const Firebase_Auth = getAuth(Firebase_app);
const Firestore_DB = getFirestore(Firebase_app);

export { Firebase_app, Firebase_Auth, Firestore_DB };

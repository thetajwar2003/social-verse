// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
import "firebase/auth";
import "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBDtAfrM6KyIKaohLuqbh-yX1NXPvAaYY4",
  authDomain: "social-verse-de380.firebaseapp.com",
  projectId: "social-verse-de380",
  storageBucket: "social-verse-de380.appspot.com",
  messagingSenderId: "257172684998",
  appId: "1:257172684998:web:b1c09f80a518943f95d7c7",
  measurementId: "G-2N31VQ018C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getFirestore(app);

export default {app, db, analytics};
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';



const firebaseConfig = {
  apiKey: "AIzaSyBDtAfrM6KyIKaohLuqbh-yX1NXPvAaYY4",
  authDomain: "social-verse-de380.firebaseapp.com",
  projectId: "social-verse-de380",
  storageBucket: "social-verse-de380.appspot.com",
  messagingSenderId: "257172684998",
  appId: "1:257172684998:web:b1c09f80a518943f95d7c7",
  measurementId: "G-2N31VQ018C"
};

const firebaseApp = initializeApp(firebaseConfig);
export const app = firebaseApp;
export const firestore = getFirestore(app);


{/*apiKey: "AIzaSyBDtAfrM6KyIKaohLuqbh-yX1NXPvAaYY4",
  authDomain: "social-verse-de380.firebaseapp.com",
  projectId: "social-verse-de380",
  storageBucket: "social-verse-de380.appspot.com",
  messagingSenderId: "257172684998",
  appId: "1:257172684998:web:b1c09f80a518943f95d7c7",
measurementId: "G-2N31VQ018C"*/}
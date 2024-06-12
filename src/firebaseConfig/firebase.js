import { initializeApp } from "firebase/app";

import { getFirestore } from '@firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBxNrDzTpes-4VLdtkwX7SGXHM3lpxIDWw",
  authDomain: "carritoej24pw-18de7.firebaseapp.com",
  projectId: "carritoej24pw-18de7",
  storageBucket: "carritoej24pw-18de7.appspot.com",
  messagingSenderId: "89555047096",
  appId: "1:89555047096:web:b227812b09f1a9e62fda4d",
  measurementId: "G-JNM3BNE2S8"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)
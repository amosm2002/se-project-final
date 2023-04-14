
import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyDC6VrIQeyh_kyKONdQnF_zmS1KpMNT90k",
  authDomain: "se-project-known.firebaseapp.com",
  projectId: "se-project-known",
  storageBucket: "se-project-known.appspot.com",
  messagingSenderId: "957709206438",
  appId: "1:957709206438:web:7db5338b6d8956fb2f4567",
  measurementId: "G-FG5MJW8ZWP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);


export default app;
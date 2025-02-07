import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB6yjQIm_ny-bHyeBC-O3EGyOGpiwWcOI4",
  authDomain: "e-commerce-fdfc9.firebaseapp.com",
  databaseURL: "https://e-commerce-fdfc9-default-rtdb.firebaseio.com",
  projectId: "e-commerce-fdfc9",
  storageBucket: "e-commerce-fdfc9.firebasestorage.app",
  messagingSenderId: "430636310650",
  appId: "1:430636310650:web:d1c1fcddaa2934d79fdbc3",
  measurementId: "G-6FMSESSH3H"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);  
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

export default app;

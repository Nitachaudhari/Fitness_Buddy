import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDATC2DPn3vkszCcowDhCQL6o0-j5n4XFI",
    authDomain: "fitnessbuddy-c754e.firebaseapp.com",
    projectId: "fitnessbuddy-c754e",
    storageBucket: "fitnessbuddy-c754e.firebasestorage.app",
    messagingSenderId: "959285213908",
    appId: "1:959285213908:web:c6fbfc039a7f88a2455941"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);  
export default app;

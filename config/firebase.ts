import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { Platform } from "react-native";

const firebaseConfig = {
  apiKey: "AIzaSyB5FGWnQD-rcmkdN1vY2d_0XhkwrUuDhQY",
  authDomain: "whatsapp-clone-1ea69.firebaseapp.com",
  projectId: "whatsapp-clone-1ea69",
  storageBucket: "whatsapp-clone-1ea69.firebasestorage.app",
  messagingSenderId: "152382588632",
  appId: "1:152382588632:web:9463a5d4e374d95ba639ad",
  measurementId: "G-EFVXJZ8G88"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth
export const auth = Platform.OS === 'web' 
  ? getAuth(app)
  : initializeAuth(app, {
      // Add any React Native specific auth config here if needed
    });

// Initialize Firestore
export const db = getFirestore(app);

export default app;
// Import the functions you need from the Firebase SDKs
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from '@react-native-async-storage/async-storage';


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDsbOJY-VWoisWLcSIKjo__jpGqmAdT6Uo",
  authDomain: "retrove1.firebaseapp.com",
  projectId: "retrove1",
  storageBucket: "retrove1.firebasestorage.app",
  messagingSenderId: "989925988613",
  appId: "1:989925988613:web:9e7d7b096a893dcd0d7f6c",
  measurementId: "G-QVELCNQQVV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Eksponer Firebase services
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export default auth;
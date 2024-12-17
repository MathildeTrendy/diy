// Import the functions you need from the Firebase SDKs
import { initializeApp } from "firebase/app";
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

export default app;
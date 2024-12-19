// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; 

const firebaseConfig = {
    apiKey: "AIzaSyAic5UAkD8TKgiXpAwZcMb7XZtxtYUHAT0",
    authDomain: "retrove-abd5d.firebaseapp.com",
    projectId: "retrove-abd5d",
    storageBucket: "retrove-abd5d.firebasestorage.app",
    messagingSenderId: "257825334667",
    appId: "1:257825334667:web:34a6e6916bc8a05f31bb8e"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app); // Initialiser Firestore

export { auth, db };
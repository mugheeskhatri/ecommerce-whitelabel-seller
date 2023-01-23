// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyB6V7A0WqYErwW6a1ivbDAtjbYa5akD7V8",
  authDomain: "ecommerce-d7d5c.firebaseapp.com",
  projectId: "ecommerce-d7d5c",
  storageBucket: "ecommerce-d7d5c.appspot.com",
  messagingSenderId: "562110261460",
  appId: "1:562110261460:web:fd24bdded32c644c093341"
};

const app = initializeApp(firebaseConfig);
const firestoredb = getFirestore()
const realtimedb = getDatabase()
const auth = getAuth();
export {app,firestoredb, auth, realtimedb}
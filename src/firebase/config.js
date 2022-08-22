// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage"
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDs-RfE-cTL8t1VS10ClJBwnWvEANNVoRI",
  authDomain: "coding-test-projects.firebaseapp.com",
  projectId: "coding-test-projects",
  storageBucket: "coding-test-projects.appspot.com",
  messagingSenderId: "821726697831",
  appId: "1:821726697831:web:66ea09329964ee9120f7c2",
  measurementId: "G-3LP12W6G27"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
export const storage = getStorage()
export const db = getFirestore()
export const auth = getAuth()
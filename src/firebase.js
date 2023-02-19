// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider, onAuthStateChanged} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCKF5ntB31NMcbmWjeXjoQcTeIzROpehGQ",
  authDomain: "askmeanything-9d3da.firebaseapp.com",
  projectId: "askmeanything-9d3da",
  storageBucket: "askmeanything-9d3da.appspot.com",
  messagingSenderId: "1069931499894",
  appId: "1:1069931499894:web:7f4ab75f1c15f45ae22a57",
  measurementId: "G-JPR3HRGQEX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();
export const onAuthStateChanged1 = onAuthStateChanged;
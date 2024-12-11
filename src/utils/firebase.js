// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDDaoXQlTF5qwj1iI6BQOuHa0S3BUOrbKA",
  authDomain: "netflixgpt-a9dc3.firebaseapp.com",
  projectId: "netflixgpt-a9dc3",
  storageBucket: "netflixgpt-a9dc3.firebasestorage.app",
  messagingSenderId: "692590183610",
  appId: "1:692590183610:web:7023d9a9c32607568bae83",
  measurementId: "G-0VEGTX3S76",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
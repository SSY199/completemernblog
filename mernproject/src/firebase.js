// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-7d2b4.firebaseapp.com",
  projectId: "mern-blog-7d2b4",
  storageBucket: "mern-blog-7d2b4.appspot.com",
  messagingSenderId: "440982397853",
  appId: "1:440982397853:web:2038ed9229f9cd2fb84574",
  measurementId: "G-1C9WCJ320S"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app); // Uncomment if you need analytics
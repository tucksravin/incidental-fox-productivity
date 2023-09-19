// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCoBBpuTvTst-S1teDIJHmRYYAVzXIA8wc",
  authDomain: "incidental-fox-productivity.firebaseapp.com",
  projectId: "incidental-fox-productivity",
  storageBucket: "incidental-fox-productivity.appspot.com",
  messagingSenderId: "745521875483",
  appId: "1:745521875483:web:cd1cbec740fec190bb06be",
  measurementId: "G-8KR7D214LT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore();
const auth = getAuth();
const storage = getStorage();

export { app, analytics, db, auth, storage };
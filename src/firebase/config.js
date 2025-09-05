// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA0dvGTW5wvXgEhHmzQ9R5B2-k1UiZ751I",
  authDomain: "authentification-opp.firebaseapp.com",
  projectId: "authentification-opp",
  storageBucket: "authentification-opp.appspot.com",
  messagingSenderId: "816353035436",
  appId: "1:816353035436:web:a4236c26e9721edf6e4b09"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const db = getFirestore(app);
// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider,  } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAu0tWc6hjSuoXjLS16KlW8BPgT59jh4rw",
  authDomain: "gadgets-haven.firebaseapp.com",
  projectId: "gadgets-haven",
  storageBucket: "gadgets-haven.firebasestorage.app",
  messagingSenderId: "273808947464",
  appId: "1:273808947464:web:bad91a7e1f904773a9d4bd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Initialize Auth and Providers
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();


export { auth, googleProvider, };

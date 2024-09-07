// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "famouzcoder-blog.firebaseapp.com",
  projectId: "famouzcoder-blog",
  storageBucket: "famouzcoder-blog.appspot.com",
  messagingSenderId: "454751077048",
  appId: "1:454751077048:web:56ae15250bd160a73fea4d"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

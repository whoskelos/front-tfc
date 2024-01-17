// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import { getFirestore } from "firebase/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDDaZ41AGgRqfR2ib6NtYoNSfPsImhfuVk",
  authDomain: "gamekeyzone-app.firebaseapp.com",
  projectId: "gamekeyzone-app",
  storageBucket: "gamekeyzone-app.appspot.com",
  messagingSenderId: "410241484839",
  appId: "1:410241484839:web:fcde98aef5cb01f1c46602"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const firestore = getFirestore(app)
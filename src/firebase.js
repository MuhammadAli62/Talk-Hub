// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getStorage } from "firebase/storage"
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAJ0-BNAuPhowL9tzyksax2mLdTzANfguM",
  authDomain: "private-chat-app-c479c.firebaseapp.com",
  projectId: "private-chat-app-c479c",
  storageBucket: "private-chat-app-c479c.appspot.com",
  messagingSenderId: "767448892364",
  appId: "1:767448892364:web:01752521955d52432e1369"
};
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore()
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDLET8u_ssER03Lw15xY57IOGkmBbWATaY",
  authDomain: "fbvia-ea566.firebaseapp.com",
  projectId: "fbvia-ea566",
  storageBucket: "fbvia-ea566.appspot.com",
  messagingSenderId: "173237075179",
  appId: "1:173237075179:web:7aeb4efe265bb3f46852ae",
  databaseURL:
    "https://fbvia-ea566-default-rtdb.asia-southeast1.firebasedatabase.app",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);
export { database };

export default app;

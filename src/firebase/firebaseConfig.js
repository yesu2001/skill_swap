import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD9hueHu4T6hh9DGK3nbLHmUuLVZQmU84A",
  authDomain: "skillswap-efc96.firebaseapp.com",
  projectId: "skillswap-efc96",
  storageBucket: "skillswap-efc96.appspot.com",
  messagingSenderId: "5095779236",
  appId: "1:5095779236:web:6f9cf0c944dfbdd10faf31",
  measurementId: "G-PFJBB7WLBR",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;

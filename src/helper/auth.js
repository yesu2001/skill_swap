import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import firebase, { auth } from "../firebase/firebaseConfig"; // Path to your firebaseConfig.js
import { setUser, clearUser } from "../reducer/authSlice"; // Path to your authSlice.js
import store from "../reducer/store"; // Path to your store.js

// User Registration
export const registerUser = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    store.dispatch(setUser(userCredential.user)); // Dispatch the setUser action
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

// User Login
export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    store.dispatch(setUser(userCredential.user)); // Dispatch the setUser action
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

// User Logout
export const logoutUser = async () => {
  try {
    await signOut(auth);
    store.dispatch(clearUser()); // Dispatch the clearUser action
  } catch (error) {
    throw error;
  }
};

// Check if a user is already logged in
export const checkLoggedInUser = () => {
  return new Promise((resolve, reject) => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        store.dispatch(setUser(user)); // Dispatch the setUser action
      } else {
        store.dispatch(clearUser()); // Dispatch the clearUser action
      }
      resolve(user);
    }, reject);
  });
};

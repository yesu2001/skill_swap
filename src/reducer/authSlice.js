// redux/authSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";

// Async thunk to register a new user
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async ({ email, password }) => {
    const auth = getAuth();
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  }
);

// Async thunk to log in a user
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }) => {
    const auth = getAuth();
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  }
);

// Async thunk to check if a user is already logged in
export const checkLoggedInUser = createAsyncThunk(
  "auth/checkLoggedInUser",
  async (_, { dispatch }) => {
    const auth = getAuth();
    return new Promise((resolve, reject) => {
      onAuthStateChanged(
        auth,
        (user) => {
          if (user) {
            dispatch(setUser(user)); // Dispatch the setUser action
          } else {
            dispatch(clearUser()); // Dispatch the clearUser action
          }
          resolve(user);
        },
        reject
      );
    });
  }
);

// Async thunk to logout a user
export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  const auth = getAuth();
  await signOut(auth);
});

const initialState = {
  user: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
    },
    clearUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(checkLoggedInUser.fulfilled, (state, action) => {
        // The state is already updated in the async thunk, so no need to modify it here.
      });
  },
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;

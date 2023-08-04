import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";

export const fetchCurrentUser = createAsyncThunk(
  "auth/getCurrentUser",
  async () => {
    const currentUser = auth.currentUser;
    const currentUserData = {
      name: currentUser.displayName,
      uid: currentUser.uid,
      email: currentUser.email,
      photoURL: currentUser.photoURL,
    };
    return currentUserData;
  }
);

const initialState = {
  user: null,
  isLoading: false,
  error: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
      state.error = null;
      state.isAuthenticated = !!action.payload;
    },
    setLoading: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    setError: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
      state.isLoading = false;
      state.error = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = !!action.payload;
        state.error = null;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const { setUser, setLoading, setError, clearUser } = authSlice.actions;
export default authSlice.reducer;

// Async thunk to register a new user
export const registerUser = (email, password) => async (dispatch) => {
  try {
    dispatch(setLoading());
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const { uid, displayName, email, photoURL, accessToken } =
      userCredential.user;
    const user = {
      uid,
      displayName,
      email,
      photoURL,
      accessToken,
    };
    dispatch(setUser(user));
  } catch (error) {
    dispatch(setError(error.message));
  }
};

// Async thunk to log in a user
export const loginUser = (useremail, password) => async (dispatch) => {
  try {
    dispatch(setLoading());
    const userCredential = await signInWithEmailAndPassword(
      auth,
      useremail,
      password
    );
    const { uid, displayName, email, photoURL, accessToken } =
      userCredential.user;
    const user = {
      uid,
      displayName,
      email,
      photoURL,
      accessToken,
    };
    dispatch(setUser(user));
  } catch (error) {
    dispatch(setError(error.message));
  }
};

// async thunk to log out the user
export const logoutUser = () => async (dispatch) => {
  try {
    dispatch(clearUser());
    await signOut(auth);
  } catch (error) {
    dispatch(setError(error.message));
  }
};

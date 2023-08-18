import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

// Async thunk to fetch all users
export const fetchAllUsers = createAsyncThunk(
  "userDetails/fetchAllUsers",
  async () => {
    const userDocsRef = getDocs(collection(db, "user_profiles"));
    const users = (await userDocsRef).docs.map((doc) => doc.data());
    return users;
  }
);

// Async thunk to fetch user details from Firestore
export const fetchUserDetails = createAsyncThunk(
  "userDetails/fetchUserDetails",
  async (userId) => {
    const userDetailsRef = doc(db, "user_profiles", userId);
    const userDetailsSnapshot = await getDoc(userDetailsRef);
    if (userDetailsSnapshot.exists()) {
      return userDetailsSnapshot.data();
    } else {
      return null;
    }
  }
);

// async thunk to add user details to the firebase
export const addUserDetails = createAsyncThunk(
  "userDetails/addUserDetails",
  async ({ userId, formData }) => {
    console.log(formData);
    await setDoc(doc(db, "user_profiles", userId), {
      ...formData,
      id: userId,
    });
  }
);

const userDetailsSlice = createSlice({
  name: "userDetails",
  initialState: {
    usersData: [],
    data: null,
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.usersData = action.payload;
      })
      .addCase(fetchUserDetails.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchUserDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(addUserDetails.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addUserDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(addUserDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default userDetailsSlice.reducer;

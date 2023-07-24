import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

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

const userDetailsSlice = createSlice({
  name: "userDetails",
  initialState: {
    data: null,
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
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
      });
  },
});

export default userDetailsSlice.reducer;

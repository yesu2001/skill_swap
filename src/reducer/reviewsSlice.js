// src/redux/slices/reviews.js
import { doc, setDoc, getDocs, collection } from "firebase/firestore";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db, auth } from "../firebase/firebaseConfig";

// Async thunk to fetch reviews
export const fetchReviews = createAsyncThunk(
  "reviews/fetchReviews",
  async () => {
    try {
      // Fetch reviews from Firestore
      const querySnapshot = await getDocs(collection(db, "user_app_reviews"));
      const reviews = querySnapshot.docs.map((doc) => doc.data());
      return reviews;
    } catch (error) {
      console.error("Error fetching reviews:", error);
      throw error;
    }
  }
);

// Async thunk to add a review
export const addReview = createAsyncThunk(
  "reviews/addReview",
  async ({ userId, reviewData }) => {
    try {
      const docref = doc(db, "user_app_reviews", userId);
      await setDoc(docref, reviewData, { merge: true });
      console.log("New Skill added successfully");
      return { ...reviewData };
    } catch (error) {
      console.log("Error adding review:", error);
      throw new Error();
    }
  }
);

const reviewsSlice = createSlice({
  name: "reviews",
  initialState: { data: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviews.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchReviews.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addReview.fulfilled, (state, action) => {
        const newReview = action.payload;
        const index = state.data.findIndex(
          (review) => review.userId === newReview.userId
        );

        if (index !== -1) {
          // Review already exists, update the existing review
          state.data[index] = newReview;
        } else {
          // Review doesn't exist, add the new review to the state
          state.data.push(newReview);
        }
      });
  },
});

export default reviewsSlice.reducer;

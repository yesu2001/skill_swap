// skillsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

// Async thunk to fetch skills from Firebase
export const fetchAllSkills = createAsyncThunk(
  "skills/fetchAllSkills",
  async () => {
    const skillsRef = collection(db, "user_skills");
    const skillsSnapshot = await getDocs(skillsRef);
    const skills = skillsSnapshot.docs.map((doc) => doc.data());
    return skills;
  }
);

const AllskillsSlice = createSlice({
  name: "skills",
  initialState: { data: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllSkills.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllSkills.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchAllSkills.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default AllskillsSlice.reducer;

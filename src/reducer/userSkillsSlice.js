import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  setDoc,
} from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

// async thunk to fetch user skills from firestore
export const fetchUserSkills = createAsyncThunk(
  "userSkills/fetchUserSkills",
  async (userId) => {
    const userSkillsRef = doc(db, "user_skills", userId);
    const userSkillsSnapshot = await getDoc(userSkillsRef);
    if (userSkillsSnapshot.exists()) {
      return userSkillsSnapshot.data().skill_listings;
    } else {
      return [];
    }
  }
);

// Async thunk to add a new skill to Firestore
export const addNewSkill = createAsyncThunk(
  "userSkills/addNewSkill",
  async ({ userId, newSkill }) => {
    const docref = doc(db, "user_skills", userId);
    const userSkillref = await getDoc(docref);
    if (userSkillref.exists()) {
      await updateDoc(docref, {
        skill_listings: [...userSkillref.data().skill_listings, newSkill],
      });
      console.log("Skill added to existing user document");
    } else {
      await setDoc(docref, {
        skill_listings: [newSkill],
      });
      console.log("New Skill added successfully");
    }
    // await updateDoc(userSkillsRef, {
    //   skill_listing: arrayUnion(newSkill),
    // });
  }
);

// Async thunk to update a skill in Firestore
export const updateSkill = createAsyncThunk(
  "userSkills/updateSkill",
  async ({ userId, updatedSkill }) => {
    const userSkillsRef = doc(db, "user_skills", userId);
    await updateDoc(userSkillsRef, {
      skill_listing: arrayUnion(updatedSkill),
    });
  }
);

// Async thunk to delete a skill from Firestore
export const deleteSkill = createAsyncThunk(
  "userSkills/deleteSkill",
  async ({ userId, skillId }) => {
    const userSkillsRef = doc(db, "user_skills", userId);
    await updateDoc(userSkillsRef, {
      skill_listing: arrayRemove(skillId),
    });
  }
);

const userSkillsSlice = createSlice({
  name: "userSkills",
  initialState: {
    data: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserSkills.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserSkills.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchUserSkills.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(addNewSkill.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addNewSkill.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(addNewSkill.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(updateSkill.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateSkill.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(updateSkill.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(deleteSkill.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteSkill.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(deleteSkill.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default userSkillsSlice.reducer;

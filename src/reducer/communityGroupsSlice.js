// src/redux/slices/groups.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  addDoc,
  getDocs,
  doc,
  setDoc,
  arrayUnion,
  collection,
} from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

// Async thunk to fetch all community groups
export const fetchGroups = createAsyncThunk("groups/fetchGroups", async () => {
  const querySnapshot = await getDocs(collection(db, "community_groups"));
  const groups = [];
  querySnapshot.docs.map((doc) => {
    groups.push({ id: doc.id, ...doc.data() });
  });
  return groups;
});

// Async thunk to create a new community group
export const createGroup = createAsyncThunk(
  "groups/createGroup",
  async (groupData) => {
    const docRef = await addDoc(collection(db, "community_groups"), groupData);
    console.log(docRef);
    return { id: docRef.id, ...groupData };
  }
);

// Async thunk to join a community group
export const joinGroup = createAsyncThunk(
  "groups/joinGroup",
  async ({ groupId, userId }) => {
    const groupRef = doc(db, "community_groups", groupId);
    await setDoc(groupRef, { members: arrayUnion(userId) }, { merge: true });
    return groupId;
  }
);

const communityGroupsSlice = createSlice({
  name: "groups",
  initialState: { data: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGroups.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchGroups.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchGroups.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createGroup.fulfilled, (state, action) => {
        state.data.push(action.payload);
      });
  },
});

export default communityGroupsSlice.reducer;

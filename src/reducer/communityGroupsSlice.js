// src/redux/slices/groups.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  addDoc,
  getDocs,
  doc,
  setDoc,
  arrayUnion,
  collection,
  where,
  query,
  updateDoc,
  deleteDoc,
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
    await addDoc(collection(db, "community_groups"), groupData);
    return groupData;
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

// Async thunk to fetch user groups from Firestore
export const fetchUserGroups = createAsyncThunk(
  "groups/fetchUserGroups",
  async (userId) => {
    const groupsRef = collection(db, "community_groups");
    const querySnapshot = await getDocs(groupsRef);
    const groups = querySnapshot.docs.map((doc) => doc.data());
    const userGroups = [];
    groups.map((group) => {
      if (group.members.includes(userId)) {
        userGroups.push({ ...group });
      }
    });
    return userGroups;
  }
);

// async thunk to update a group
export const updateGroup = createAsyncThunk(
  "groups/updateGroup",
  async ({ groupId, groupName, groupDescription }) => {
    const groupsQuery = query(
      collection(db, "community_groups"),
      where("group_id", "==", groupId)
    );
    const querySnapshot = await getDocs(groupsQuery);
    if (!querySnapshot.empty) {
      const groupDoc = querySnapshot.docs[0];
      const groupDocRef = doc(db, "community_groups", groupDoc.id);
      await updateDoc(groupDocRef, {
        name: groupName,
        description: groupDescription,
      });
      console.log("sucessfully updated");
    } else {
      throw new Error(`Document with groupId ${groupId} not found.`);
    }
  }
);

// Async thunk to delete a group from Firestore
export const deleteGroup = createAsyncThunk(
  "groups/deleteGroup",
  async (groupId) => {
    console.log(groupId);

    const groupsQuery = query(
      collection(db, "community_groups"),
      where("group_id", "==", groupId)
    );
    const querySnapshot = await getDocs(groupsQuery);
    if (!querySnapshot.empty) {
      const groupDoc = querySnapshot.docs[0];
      const groupDocRef = doc(db, "community_groups", groupDoc.id);
      await deleteDoc(groupDocRef);
      console.log("successfully deleted");
    } else {
      throw new Error(`Document with groupId ${groupId} not found.`);
    }
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
      })
      .addCase(fetchUserGroups.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = "fulfilled";
      })
      .addCase(updateGroup.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(deleteGroup.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      });
  },
});

export default communityGroupsSlice.reducer;

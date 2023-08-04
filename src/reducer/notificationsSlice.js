import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

export const createNotify = createAsyncThunk(
  "notifications/createNotify",
  async ({ notifyData }) => {
    console.log("createNotify is successfully called");
    const docref = doc(db, "user_notifications", notifyData.reciever_id);
    const userNotifications = await getDoc(docref);
    if (userNotifications.exists()) {
      await updateDoc(docref, {
        notifies: [...userNotifications.data().notifies, notifyData],
      });
      console.log("update to the notifications is successfully called");
    } else {
      await setDoc(docref, {
        notifies: [notifyData],
      });
      console.log("new Notifcation added successfully");
    }
  }
);

export const fetchNotifications = createAsyncThunk(
  "notifications/fetchNotifications",
  async (userId) => {
    const userNotifications = doc(db, "user_notifications", userId);
    const notificationsData = await getDoc(userNotifications);
    if (notificationsData.exists()) {
      return notificationsData.data().notifies;
    } else {
      return [];
    }
  }
);

export const acceptSkillsRequest = createAsyncThunk(
  "notifications/acceptSkillsRequest",
  async ({ senderId, requestId }) => {
    console.log(senderId, requestId);
    const docref = doc(db, "user_notifications", senderId);
    const docsnapshot = await getDoc(docref);
    const newnotifies = docsnapshot.data().notifies.map((item) =>
      item.id === requestId
        ? {
            ...item,
            status: "accepted",
          }
        : item
    );
    console.log(newnotifies);
    await updateDoc(docref, {
      notifies: newnotifies,
    });
  }
);

export const declineSkillsRequest = createAsyncThunk(
  "notifications/declineSkillsRequest",
  async ({ senderId, requestId }) => {
    console.log(senderId, requestId);
    const docref = doc(db, "user_notifications", senderId);
    const docsnapshot = await getDoc(docref);
    const newnotifies = docsnapshot.data().notifies.map((item) =>
      item.id === requestId
        ? {
            ...item,
            status: "declined",
          }
        : item
    );
    await updateDoc(docref, {
      notifies: newnotifies,
    });
  }
);

export const fetchAllNotifications = createAsyncThunk(
  "notifications/fetchAllNotifications",
  async () => {
    const docref = collection(db, "user_notifications");
    const notificationSanpshot = await getDocs(docref);
    const notifications = notificationSanpshot.docs.map((doc) => doc.data());
    return notifications;
  }
);

const notificationsSlice = createSlice({
  name: "notifications",
  initialState: {
    data: [],
    allData: [],
    error: null,
    isLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllNotifications.fulfilled, (state, action) => {
        state.isLoading = false;
        state.allData = action.payload;
      })
      .addCase(fetchNotifications.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.isLoading = false;
        state.data = action.error.message;
      })
      .addCase(createNotify.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createNotify.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(createNotify.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(acceptSkillsRequest.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(declineSkillsRequest.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      });
  },
});

export default notificationsSlice.reducer;

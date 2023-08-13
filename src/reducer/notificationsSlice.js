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
        ...userNotifications.data(),
        requests: [...userNotifications.data().requests, notifyData],
      });
      console.log("update to the notifications is successfully called");
    } else {
      await setDoc(docref, {
        requests: [notifyData],
        status: [],
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
      return notificationsData.data();
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
    const newnotifies = docsnapshot.data().requests.map((item) =>
      item.id === requestId
        ? {
            ...item,
            status: "accepted",
          }
        : item
    );
    await updateDoc(docref, {
      requests: newnotifies,
    });

    const filteredNotify = newnotifies.filter((item) => item.id === requestId);
    console.log(filteredNotify);
    console.log(filteredNotify[0].sender_id);
    const notifyAccepted = {
      nid: requestId,
      status: "accepted",
      skillId: filteredNotify[0].skill_id,
      reciever_id: senderId,
      reciever_name: filteredNotify[0].sender_name,
      sender_id: filteredNotify[0].reciever_id,
      sender_name: filteredNotify[0].reciever_name,
      skillOffered: filteredNotify[0].skillOffered,
      skill_name: filteredNotify[0].skill_name,
    };
    const reciever_id = filteredNotify[0].sender_id;
    const recieverDocRef = doc(db, "user_notifications", reciever_id);
    const recieverDocSnapshot = await getDoc(recieverDocRef);
    if (recieverDocSnapshot.exists()) {
      await updateDoc(recieverDocRef, {
        ...recieverDocSnapshot.data(),
        status: [...recieverDocSnapshot.data().status, notifyAccepted],
      });
      console.log("Recieved Notification Accepted updated");
    } else {
      await setDoc(recieverDocRef, {
        status: [notifyAccepted],
        requests: [],
      });
      console.log("Recieved notification Accepted newly");
    }

    console.log(senderId, reciever_id, requestId);
    const skilldocref = doc(db, "user_skills", senderId);
    const docSkill = await getDoc(skilldocref);
    const skillListings = docSkill.data().skill_listings.map((listing) => {
      if (listing.skill_id === notifyAccepted.skillId) {
        return {
          ...listing,
          members_requested: listing.members_requested.map((item) =>
            item.userId === reciever_id ? { ...item, status: "accepted" } : item
          ),
        };
      }
      return listing; // Return the listing unchanged if skill_id doesn't match
    });
    // Update the skill_listings array in Firestore with the modified skill data
    await updateDoc(skilldocref, { skill_listings: skillListings });
    console.log("accepted the request from skill");
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

    const filteredNotify = newnotifies.filter((item) => item.id === requestId);
    console.log(filteredNotify);
    console.log(filteredNotify[0].sender_id);
    const notifyAccepted = {
      status: "declined",
      skillId: requestId,
      reciever_id: senderId,
      reciever_name: filteredNotify[0].sender_name,
      sender_id: filteredNotify[0].reciever_id,
      sender_name: filteredNotify[0].reciever_name,
      skillOffered: filteredNotify[0].skillOffered,
      skill_name: filteredNotify[0].skill_name,
    };
    const reciever_id = filteredNotify[0].sender_id;
    const recieverDocRef = doc(db, "user_notifications", reciever_id);
    const recieverDocSnapshot = await getDoc(recieverDocRef);
    if (recieverDocSnapshot.exists()) {
      await updateDoc(recieverDocRef, {
        ...recieverDocSnapshot.data(),
        status: [...recieverDocSnapshot.data().status, notifyAccepted],
      });
      console.log("Recieved Notification Accepted updated");
    } else {
      await setDoc(recieverDocRef, {
        status: [notifyAccepted],
        requests: [],
      });
      console.log("Recieved notification Accepted newly");
    }
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

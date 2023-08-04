import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  get,
  limitToLast,
  onValue,
  orderByChild,
  push,
  query,
  ref,
  set,
} from "firebase/database";
import { realtimeDB } from "../firebase/firebaseConfig";

export const fetchMessages = createAsyncThunk(
  "groupMessages/fetchMessages",
  async (groupId) => {
    try {
      const messageRef = ref(realtimeDB, `groups/${groupId}/messages`);

      // Create a query to order messages by timestamp in descending order and limit to the last 50 messages
      const orderedQuery = query(
        messageRef,
        orderByChild("timestamp"),
        limitToLast(50)
      );

      const messagesSnapshot = await get(orderedQuery);

      if (messagesSnapshot.exists()) {
        const messages = [];
        messagesSnapshot.forEach((childSnapshot) => {
          const message = childSnapshot.val();
          messages.push(message);
        });
        // console.log("Fetched messages:", messages);
        return messages;
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
      throw error;
    }
  }
);

export const createMessage = createAsyncThunk(
  "groupMessages/createMessage",
  async ({ groupId, content, sender }) => {
    const timestamp = Date.now();
    const messageRef = ref(realtimeDB, `groups/${groupId}/messages`);

    // Use push to add a new message object with a unique key
    const newMessageRef = push(messageRef);
    const messageId = newMessageRef.key;

    // Set the data for the new message object
    await set(newMessageRef, {
      messageId,
      content,
      sender,
      timestamp,
    });

    console.log("Successfully created message:", messageId);
    return { messageId, content, sender, timestamp };
  }
);
const groupMessagesSlice = createSlice({
  name: "groupMessages",
  initialState: { data: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.status = "successfull";
        state.data = action.payload;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.status = "Failed";
        state.error = action.error.message;
      });
  },
});

export default groupMessagesSlice.reducer;

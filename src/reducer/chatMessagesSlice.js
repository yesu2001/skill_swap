import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { realtimeDB, db } from "../firebase/firebaseConfig";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import {
  get,
  limitToLast,
  orderByChild,
  push,
  query,
  ref,
  set,
} from "firebase/database";

export const fetchAllChats = createAsyncThunk(
  "chatMessages/fetchAllChats",
  async (userId) => {
    try {
      const chatsDoc = await getDocs(collection(db, "user_Chats"));
      const chatsDocSnapshot = chatsDoc.docs.map((doc) => doc.data());
      const docsData = chatsDocSnapshot?.map((chat) => chat.chats);
      const filteredDocs = docsData.map((data) =>
        data.filter((obj) =>
          Object.values(obj).some(
            (value) => typeof value === "string" && value.includes(userId)
          )
        )
      );
      //   console.log(filteredDocs);
      return filteredDocs;
    } catch (err) {
      console.error(err);
    }
  }
);

export const createChat = createAsyncThunk(
  "chatMessages/createChat",
  async ({ chatData }) => {
    try {
      const chatDocRef = doc(db, "user_Chats", chatData.chat_id);
      const chatDocSnapshot = await getDoc(chatDocRef);
      if (chatDocSnapshot.exists()) {
        await updateDoc(chatDocRef, {
          chats: [...chatDocSnapshot.data().chats, chatData],
        });
        console.log("chat connection added to existing user chats data");
      } else {
        await setDoc(chatDocRef, {
          chats: [chatData],
        });
        console.log("new chat connection successfully");
      }
      const userDetailsRef = doc(db, "user_profiles", chatData.user2_id);
      const userDetailsSnapshot = await getDoc(userDetailsRef);
      const userData = userDetailsSnapshot.data();
      const updatedData = {
        ...userData,
        users_connected: [...userData.users_connected, chatData.user1_id],
      };
      await updateDoc(userDetailsRef, updatedData);
      console.log("added user1 to the userdetails");
      // if(userDetailsSnapshot.exists()) {

      // }else {
      //   console.log("user does not exist");
      // }
    } catch (err) {
      console.log(err.message);
      return err;
    }
  }
);

export const createMessage = createAsyncThunk(
  "chatMessages/createMessage",
  async ({ chatId, message }) => {
    try {
      console.log(chatId, message);
      const messageRef = ref(realtimeDB, `chats/${chatId}/messages`);
      const newMessage = push(messageRef);
      const messageId = newMessage.key;
      await set(newMessage, {
        messageId,
        ...message,
      });
      console.log("message created");
      return { messageId, ...message };
    } catch (err) {
      console.log(err.message);
    }
  }
);

export const fetchChatMessages = createAsyncThunk(
  "chatMessages/fetchChatMessages",
  async (chatId) => {
    try {
      console.log(chatId);
      const messageRef = ref(realtimeDB, `chats/${chatId}/messages`);
      const orderedQuery = query(
        messageRef,
        orderByChild("timestamp"),
        limitToLast(50)
      );
      const messageSnapshot = await get(orderedQuery);
      if (messageSnapshot.exists()) {
        const messages = [];
        messageSnapshot.forEach((childSnapshot) => {
          const message = childSnapshot.val();
          messages.push(message);
        });
        console.log("Fetched messages:", messages);
        return messages;
      }
    } catch (err) {
      console.log(err.message);
    }
  }
);

const chatMessagesSlice = createSlice({
  name: "chatMessages",
  initialState: {
    chatMessages: [],
    data: [],
    isloading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createChat.fulfilled, (state, action) => {
        state.isloading = false;
        state.error = null;
      })
      .addCase(fetchAllChats.fulfilled, (state, action) => {
        state.isloading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchChatMessages.fulfilled, (state, action) => {
        state.isloading = false;
        state.chatMessages = action.payload;
        state.error = null;
      });
  },
});

export default chatMessagesSlice.reducer;

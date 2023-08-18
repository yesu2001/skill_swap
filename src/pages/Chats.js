import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllChats,
  createMessage,
  fetchChatMessages,
} from "../reducer/chatMessagesSlice";
import { auth } from "../firebase/firebaseConfig";
import { groupPage, messageBox } from "../components/groups/styles";

const ChatPage = () => {
  const dispatch = useDispatch();
  const { chatId } = useParams();
  const current_User = auth.currentUser;
  //   const [chatMessages, setChatMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [selectedChat, setSelectedChat] = useState(null);
  const currentUser = useSelector((state) => state.userDetails.data);
  const allChats = useSelector((state) => state.chatMessages.data);
  const chatMessages = useSelector((state) => state.chatMessages.chatMessages);
  const messageRef = useRef(null);

  useEffect(() => {
    dispatch(fetchAllChats(current_User?.uid));
  }, [dispatch, allChats]);

  useEffect(() => {
    dispatch(fetchChatMessages(selectedChat));
  }, [selectedChat, dispatch, chatMessages]);

  //   useEffect(() => {
  //     scrollToBottom();
  //   }, [chatMessages]);

  const scrollToBottom = () => {
    messageRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const handleSendMessage = () => {
    if (newMessage.trim() === "") {
      return;
    }
    const message = {
      sender: current_User?.uid,
      content: newMessage,
      timestamp: Date.now(),
    };
    setNewMessage("");
    dispatch(createMessage({ chatId: selectedChat, message }));
  };

  const handleSelectChat = (chatId) => {
    setSelectedChat(chatId);
    console.log(chatId);
  };

  return (
    <div style={groupPage} className="flex">
      <div className="w-1/4 bg-primary p-4">
        <h3 className="text-xl font-semibold mb-4">Chat Members</h3>
        <ul className="overflow-y-auto h-screen">
          {allChats?.map((chatItem) =>
            chatItem.map((chat) => (
              <li
                key={chat?.chat_id}
                className={`cursor-pointer p-2 rounded mb-2 ${
                  selectedChat === chat?.chat_id
                    ? "bg-gray-600"
                    : "hover:bg-gray-600"
                }`}
                onClick={() => handleSelectChat(chat?.chat_id)}
              >
                {current_User?.uid === chat?.user1_id
                  ? chat?.user1_name
                  : chat?.user2_name}
              </li>
            ))
          )}
        </ul>
      </div>
      <div className="flex-1 bg-background flex flex-col ">
        {/* Chat messages */}
        {selectedChat ? (
          <div className="overflow-y-auto max-h-[calc(100vh-4rem)] mb-4 p-8">
            {chatMessages?.map((message, index) => (
              <div
                key={index}
                className={`mb-2 ${
                  message?.sender === current_User?.uid
                    ? "text-right"
                    : "text-left"
                }`}
              >
                <div
                  className={`inline-block rounded-lg p-2 ${
                    message?.sender === current_User?.uid
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-black"
                  }`}
                  ref={messageRef}
                >
                  {message?.content}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center p-4">
            <h3 className="text-lg font-bold text-foreground">
              Select a chat to view messages.
            </h3>
          </div>
        )}
        {/* Message input box */}
        {selectedChat && (
          <div className={messageBox}>
            <div className="flex items-center m-2">
              <input
                type="text"
                className="text-black flex-1 p-2 rounded border border-gray-300 mr-2"
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <button
                className="bg-secondary text-white py-2 px-4 rounded"
                onClick={handleSendMessage}
              >
                Send
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatPage;

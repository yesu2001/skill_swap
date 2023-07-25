import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import Channel from "../components/groups/Channel";
import Message from "../components/groups/Message";
import { auth } from "../firebase/firebaseConfig";

// Dummy data for the groups and messages
const dummyGroups = [
  {
    id: "group1",
    name: "General",
    messages: [
      {
        id: "msg1",
        author: "John",
        content: "Hello everyone!",
      },
      {
        id: "msg2",
        author: "Alice",
        content: "Hi John!",
      },
      {
        id: "msg3",
        author: "Bob",
        content: "Hey there!",
      },
    ],
  },
  {
    id: "group2",
    name: "Announcements",
    messages: [
      {
        id: "msg4",
        author: "Admin",
        content: "Welcome to our server!",
      },
    ],
  },
  {
    id: "group3",
    name: "Off-topic",
    messages: [
      {
        id: "msg5",
        author: "Tom",
        content: "Anyone up for a game tonight?",
      },
      {
        id: "msg6",
        author: "Sarah",
        content: "Sure, count me in!",
      },
      {
        id: "msg5",
        author: "Tom",
        content: "Anyone up for a game tonight?",
      },
      {
        id: "msg6",
        author: "Sarah",
        content: "Sure, count me in!",
      },
      {
        id: "msg5",
        author: "Tom",
        content: "Anyone up for a game tonight?",
      },
      {
        id: "msg6",
        author: "Sarah",
        content: "Sure, count me in!",
      },
      {
        id: "msg5",
        author: "Tom",
        content: "Anyone up for a game tonight?",
      },
      {
        id: "msg6",
        author: "Sarah",
        content: "Sure, count me in!",
      },
      {
        id: "msg5",
        author: "Tom",
        content: "Anyone up for a game tonight?",
      },
      {
        id: "msg6",
        author: "Sarah",
        content: "Sure, count me in!",
      },
      {
        id: "msg5",
        author: "Tom",
        content: "Anyone up for a game tonight?",
      },
      {
        id: "msg6",
        author: "Sarah",
        content: "Sure, count me in!",
      },
    ],
  },
];

function Groups() {
  //   const user = useSelector((state) => state.auth.user);
  const user = auth.currentUser;
  const joinedGroups = dummyGroups; // Replace this with actual data from Redux store or backend

  // State to keep track of the selected channel and messages
  const [selectedChannel, setSelectedChannel] = useState(null);
  const [messageInput, setMessageInput] = useState("");
  const [channelMessages, setChannelMessages] = useState({});

  const messagesEndRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [channelMessages]);

  const handleChannelClick = (groupId) => {
    setSelectedChannel(groupId);
  };

  const handleMessageSend = (groupId, messageContent) => {
    const updatedMessages = {
      ...channelMessages,
      [groupId]: [
        ...(channelMessages[groupId] || []),
        {
          id: `msg${channelMessages[groupId]?.length + 1 || 1}`,
          author: user.displayName,
          content: messageContent,
        },
      ],
    };
    setChannelMessages(updatedMessages);
    setMessageInput("");
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="bg-gray-800 w-1/4">
        {/* Display user information, server details, etc. */}
        {/* <div className="text-white p-4">
          <h2 className="text-xl font-bold mb-4">
            Welcome, {user.displayName}
          </h2> */}
        {/* Display server details, members, etc. */}
        {/* ... */}
        {/* </div> */}
        {/* Display the list of channels */}
        <div className="p-4">
          <h3 className="text-lg font-bold mb-2">Channels</h3>
          {joinedGroups.map((group) => (
            <div
              key={group.id}
              className={`cursor-pointer p-2 rounded mb-2 ${
                selectedChannel === group.id
                  ? "bg-gray-600"
                  : "hover:bg-gray-600"
              }`}
              onClick={() => handleChannelClick(group.id)}
            >
              {group.name}
            </div>
          ))}
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 bg-gray-200 flex flex-col">
        {/* Display the messages in the selected channel */}
        {selectedChannel ? (
          <div id="messages-container" className="p-4 flex-1 overflow-y-auto">
            <h3 className="text-lg font-bold mb-2">
              #
              {joinedGroups.find((group) => group.id === selectedChannel)?.name}
            </h3>
            <div>
              {channelMessages[selectedChannel]?.map((message) => (
                <Message key={message.id} message={message} />
              ))}
              <div style={{ float: "left", clear: "both" }} />
            </div>
          </div>
        ) : (
          <div className="p-4">
            <h3 className="text-lg font-bold">
              Select a channel to view messages.
            </h3>
          </div>
        )}
        {/* Message input */}
        {selectedChannel && (
          <div className="p-4">
            <div className="mt-4">
              <input
                type="text"
                placeholder="Type your message..."
                className="w-full p-2 rounded border border-gray-300"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
              />
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded ml-2"
                onClick={() => handleMessageSend(selectedChannel, messageInput)}
              >
                Send
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Groups;

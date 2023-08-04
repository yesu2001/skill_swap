import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Channel from "../components/groups/Channel";
import { auth, realtimeDB } from "../firebase/firebaseConfig";
import { fetchUserGroups } from "../reducer/communityGroupsSlice";
import { createMessage, fetchMessages } from "../reducer/groupMessagesSlice";
import { onValue, ref } from "firebase/database";
import { useNavigate } from "react-router";
import { groupPage, messageBox } from "../components/groups/styles";
import { fetchCurrentUser } from "../reducer/userAuthSlice";

function Groups() {
  const dispatch = useDispatch();
  const user = auth.currentUser;
  const [selectedChannel, setSelectedChannel] = useState(null);
  const [messageInput, setMessageInput] = useState("");
  const [channelMessages, setChannelMessages] = useState([]);
  const currentUser = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  // console.log(currentUser);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    dispatch(fetchCurrentUser());
  }, []);

  const messagesEndRef = useRef(null);

  const userGroups = useSelector((state) => state.groups.data);
  const groupMessages = useSelector((state) => state.groupMessages.data);

  useEffect(() => {
    dispatch(fetchUserGroups(user?.uid));
  }, [dispatch, userGroups]);

  useEffect(() => {
    dispatch(fetchMessages(selectedChannel));
  }, [selectedChannel, dispatch, groupMessages]);

  useEffect(() => {
    scrollToBottom();
  }, [channelMessages]);

  const selectedGroup = userGroups.find(
    (group) => group?.group_id === selectedChannel
  );

  const handleChannelClick = (groupId) => {
    setSelectedChannel(groupId);
  };

  const handleMessageSend = () => {
    dispatch(
      createMessage({
        groupId: selectedChannel,
        content: messageInput,
        sender: user?.uid,
      })
    );
    setMessageInput("");
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div style={groupPage} className="flex">
      {/* Sidebar */}
      <div className="bg-primary w-1/4">
        <div className="p-4">
          <h3 className="text-lg font-bold mb-2">Channels</h3>
          <div className="overflow-y-auto h-screen">
            {userGroups.map((group) => (
              <div
                key={group?.group_id}
                className={`cursor-pointer p-2 rounded mb-2 ${
                  selectedChannel === group?.group_id
                    ? "bg-gray-600"
                    : "hover:bg-gray-600"
                }`}
                onClick={() => handleChannelClick(group?.group_id)}
              >
                {group.name}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 bg-background flex flex-col">
        {selectedChannel ? (
          <Channel group={selectedGroup} messages={groupMessages} />
        ) : (
          <div className="flex-1 flex items-center justify-center p-4">
            <h3 className="text-lg font-bold text-foreground">
              Select a channel to view messages.
            </h3>
          </div>
        )}
        {selectedChannel && (
          <div style={messageBox}>
            <div className="flex items-center">
              <input
                type="text"
                placeholder="Type your message..."
                className="text-black flex-1 p-2 rounded border border-gray-300 mr-2"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
              />
              <button
                className="bg-secondary text-white py-2 px-4 rounded"
                onClick={handleMessageSend}
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

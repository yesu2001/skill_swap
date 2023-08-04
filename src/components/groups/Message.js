import React from "react";

function Message({ message }) {
  return (
    <div className="flex items-center mb-2">
      <img
        src={message.senderAvatar || "https://via.placeholder.com/40"}
        alt={message.sender}
        className="w-8 h-8 rounded-full mr-2"
      />
      <div className="p-2 rounded-lg">
        <div className="text-gray-600 text-sm mb-1">{message.sender}</div>
        <div className="text-sm">{message.content}</div>
      </div>
    </div>
  );
}

export default Message;

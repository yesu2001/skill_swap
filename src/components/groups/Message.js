import React from "react";

function Message({ message }) {
  return (
    <div className="p-2 border border-gray-300 rounded mb-2">
      <div className="text-gray-600 mb-1">{message.author}</div>
      <div>{message.content}</div>
    </div>
  );
}

export default Message;

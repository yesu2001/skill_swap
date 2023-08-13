import React from "react";
import Message from "./Message";
import { chatMessages } from "./styles";

function Channel({ group, messages }) {
  return (
    <div className="flex flex-col" style={chatMessages}>
      {/* Header */}
      <h4 className="text-md font-bold mb-2 p-4">{group?.name}</h4>
      {/* Messages */}
      <div className="flex-1 p-4 w-full">
        {messages?.map((message, index) => (
          <Message message={message} key={index} />
        ))}
      </div>
    </div>
  );
}

export default Channel;

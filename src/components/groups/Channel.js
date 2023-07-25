import React from "react";
import Message from "./Message";

function Channel({ group }) {
  const messages = group.messages;

  return (
    <div className="mb-4">
      <h4 className="text-md font-bold mb-2">{group.name}</h4>
      {/* Display the list of messages in the channel */}
      <div>
        {messages.map((message) => (
          <Message key={message.id} message={message} />
        ))}
      </div>
    </div>
  );
}

export default Channel;

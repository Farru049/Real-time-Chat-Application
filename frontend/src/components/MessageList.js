import React from 'react';

const MessageList = ({ messages }) => {
  return (
    <div className="h-80 overflow-y-scroll border p-4 mb-4 bg-gray-100">
      {messages.map((msg, index) => (
        <div key={index} className="mb-2">
          <strong>{msg.senderId}:</strong> {msg.message}
        </div>
      ))}
    </div>
  );
};

export default MessageList;

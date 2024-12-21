import React from 'react';

const MessageInput = ({ message, setMessage, onSendMessage }) => {
  return (
    <div className="flex">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="w-full p-2 border rounded-l"
        placeholder="Type a message..."
      />
      <button
        onClick={onSendMessage}
        className="bg-blue-500 text-white p-2 rounded-r"
      >
        Send
      </button>
    </div>
  );
};

export default MessageInput;

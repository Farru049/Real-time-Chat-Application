import React from 'react';

const ChatSidebar = ({ chatrooms, onSelectChatroom }) => {
  return (
    <div className="w-1/4 bg-gray-800 text-white p-4">
      <h2 className="text-xl mb-4">Chatrooms</h2>
      <ul>
        {chatrooms.map((chatroom) => (
          <li
            key={chatroom._id}
            onClick={() => onSelectChatroom(chatroom._id)}
            className="cursor-pointer hover:bg-gray-700 p-2 rounded"
          >
            {chatroom.name || "Unnamed Chatroom"}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatSidebar;

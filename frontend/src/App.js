import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import ChatSidebar from './components/ChatSidebar';
import MessageList from './components/MessageList';
import MessageInput from './components/MessageInput';

// Initialize Socket.io
const socket = io('http://localhost:5000');  // Replace with your backend URL

const App = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [chatrooms, setChatrooms] = useState([]);
  const [activeChatId, setActiveChatId] = useState(null);

  // Fetch chatrooms
  useEffect(() => {
    fetch('/api/chatrooms/user')
      .then(res => res.json())
      .then(data => setChatrooms(data));
  }, []);

  // Listen for new messages from the server
  useEffect(() => {
    socket.on('newMessage', (messageData) => {
      if (messageData.chatId === activeChatId) {
        setMessages(prevMessages => [...prevMessages, messageData]);
      }
    });
  }, [activeChatId]);

  const handleSelectChatroom = (chatId) => {
    setActiveChatId(chatId);
    fetch(`/api/messages/${chatId}`)
      .then(res => res.json())
      .then(data => setMessages(data));
    socket.emit('joinChatroom', chatId);  // Join the chatroom
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      const messageData = {
        chatId: activeChatId,
        senderId: 'User1',  // Replace with actual user ID
        message,
      };
      socket.emit('sendMessage', messageData);
      setMessage('');
    }
  };

  return (
    <div className="flex h-screen">
      <ChatSidebar chatrooms={chatrooms} onSelectChatroom={handleSelectChatroom} />
      <div className="w-3/4 p-4">
        {activeChatId ? (
          <>
            <h2 className="text-2xl mb-4">Chatroom: {activeChatId}</h2>
            <MessageList messages={messages} />
            <MessageInput message={message} setMessage={setMessage} onSendMessage={handleSendMessage} />
          </>
        ) : (
          <h2 className="text-xl">Select a Chatroom</h2>
        )}
      </div>
    </div>
  );
};

export default App;

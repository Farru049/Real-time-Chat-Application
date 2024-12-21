# Chatroom App with Socket.io

A real-time chatroom application built with Node.js, Express, MongoDB, and Socket.io. Users can create chatrooms, send messages, and connect instantly with others.

## Features
- Live messaging powered by Socket.io
- Private and group chat support
- Message history storage
- User authentication with JWT
- Real-time updates and notifications

## Tech Stack
- Node.js & Express for backend
- MongoDB for database
- Socket.io for real-time communication
- JWT for authentication
- Vercel (frontend) and Heroku (backend) deployment

## Quick Start

1. Clone the repo:
   git clone https://github.com/farru049/Real-time-Chat-App.git

2. Install dependencies:
   cd your-repo-name
   npm install

3. Set up environment variables:
   Create .env file with:
   PORT=5000
   MONGO_URI=your_mongo_database_uri
   JWT_SECRET=your_jwt_secret

4. Start the server:
   npm start
   Server runs at http://localhost:5000

## API Routes

Create Chatroom:
POST /api/chatrooms
{
  "members": ["user1_id", "user2_id"],
  "isGroupChat": false,
  "name": "Chatroom Name"
}

Get User Chatrooms:
GET /api/chatrooms

Send Message:
POST /api/messages
{
  "chatId": "chatroom_id",
  "senderId": "user_id",
  "message": "Hello!"
}

## Socket.io Events
The server handles real-time communication through Socket.io events for instant messaging between users.

## Contributing
Feel free to fork and submit pull requests for improvements or new features.

## License
MIT License - See LICENSE file for details.
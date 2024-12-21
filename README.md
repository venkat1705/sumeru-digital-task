# Real-Time Chat Application

## Overview
This is a real-time chat application where users can log in using their Gmail account and engage in instant messaging with other users. The application leverages **Socket.IO** for real-time communication and ensures a seamless and interactive user experience.

---
## Deployed Application

You can access the deployed version of the application at the following link:

[Deployed Link](https://sumeru-digital-task.onrender.com/)

---

## Features

- **Gmail Authentication:**
  - Users can securely log in using their Gmail accounts.
  - Authentication is managed using OAuth 2.0.

- **Real-Time Messaging:**
  - Instant message exchange between users.
  - Built using **Socket.IO** for low-latency, bidirectional communication.

- **User Management:**
  - Display of active users.
  - Ability to select users for one-on-one chats.

- **Chat Functionalities:**
  - Persistent message history.
  - Real-time updates for sent/received messages.

---

## Technologies Used

- **Backend:**
  - Node.js
  - Express.js
  - Socket.IO

- **Frontend:**
  - React.js

- **Database:**
  - MongoDB

- **Authentication:**
  - Google OAuth 2.0

---

## Installation

### 1. Clone the Repository
```bash
git clone [https://github.com/your-repo/realtime-chat-app.git](https://github.com/venkat1705/sumeru-digital-task)
cd sumeru-digital-task
```

### 2. Install Dependencies
#### Backend
```bash
cd server
npm install
```
#### Frontend
```bash
cd client
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the `backend` folder with the following content i have already gave refence with file name as .env.example:
```env
PORT=
MONGO_URI=
JWT_SECRET=

#Google provider credentials
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

BASE_URL=
REDIRECT_URI = 

#cloudinary credentials

CLOUDINARY_API_KEY = 
CLOUDINARY_SECRET_KEY = 
CLOUDINARY_CLOUD_NAME = 

NODE_ENV = 
```

### 4. Run the Application
#### Backend
```bash
cd server
npm run dev
```
#### Frontend
```bash
cd client
npm run dev
```

### 5. Access the fontend Application
Open your browser and navigate to `http://localhost:5173`.

### 5. Access the Backend Application
Open your browser and navigate to `http://localhost:5000`.

### 5. Modify the BASE URL
#### Frontend
```bash
cd client/src/actions/BASE_URL
```
### 5. Modify or update the CORS configuration:
#### Backend
```bash
cd server/src/server.js
```

---

